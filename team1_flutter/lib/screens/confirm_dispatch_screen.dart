import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:test2/screens/dash_board_screen.dart';
import 'dart:convert';

import '../models/item.dart';
import '../services/api_service.dart';
import '../widgets/item_card_large.dart';

class ConfirmDispatchDialog extends StatefulWidget {
  final String qrUrl;

  const ConfirmDispatchDialog({super.key, required this.qrUrl});

  @override
  State<ConfirmDispatchDialog> createState() => _ConfirmDispatchDialogState();
}

class _ConfirmDispatchDialogState extends State<ConfirmDispatchDialog> {
  late Future<Item> itemFuture;
  final TextEditingController _quantityController = TextEditingController();

  @override
  void initState() {
    super.initState();
    itemFuture = fetchItemInfo();
  }

  Future<Item> fetchItemInfo() async {
    try {
      final uri = Uri.parse(widget.qrUrl);
      final segments = uri.pathSegments;

      String? id;
      final itemsIndex = segments.indexOf('items');
      if (itemsIndex != -1 && itemsIndex + 1 < segments.length) {
        id = segments[itemsIndex + 1];
      }

      if (id == null || int.tryParse(id) == null) {
        throw Exception('올바르지 않은 URL입니다. (item ID가 누락되었거나 유효하지 않음)');
      }

      final itemUrl = '${uri.origin}/api/items/$id';

      // 🔐 토큰 추가
      final token = await ApiService().getTokenFromSharedPreferences();
      if (token == null) throw Exception('토큰이 없습니다. 다시 로그인해주세요.');

      final response = await http.get(
        Uri.parse(itemUrl),
        headers: {
          'Authorization': 'Bearer $token',
          'Content-Type': 'application/json',
        },
      );

      if (response.statusCode == 200) {
        final decoded = utf8.decode(response.bodyBytes);
        final jsonData = json.decode(decoded);
        return Item.fromJson(jsonData);
      } else {
        throw Exception('상품 정보를 불러올 수 없습니다. (상태 코드: ${response.statusCode})');
      }
    } catch (e) {
      throw Exception('QR URL 처리 중 오류 발생: $e');
    }
  }


  Future<void> dispatchQuantity(int quantityToSubtract) async {
    final apiService = ApiService();

    // itemId 추출
    final uri = Uri.parse(widget.qrUrl);
    final segments = uri.pathSegments;
    String? itemId;
    final itemsIndex = segments.indexOf('items');
    if (itemsIndex != -1 && itemsIndex + 1 < segments.length) {
      itemId = segments[itemsIndex + 1];
    }

    if (itemId == null) {
      throw Exception('itemId를 URL에서 추출할 수 없습니다.');
    }

    // 토큰 불러오기
    final token = await apiService.getTokenFromSharedPreferences();
    if (token == null) {
      throw Exception('로그인 토큰이 없습니다. 다시 로그인해주세요.');
    }

    // ApiService의 dispatchItem 사용
    await apiService.dispatchItem(itemId, quantityToSubtract, token);
  }

  Future<void> showResultDialog(BuildContext context, int parsed) async {
    await showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext dialogContext) {
        return AlertDialog(
          title: const Text('출고 완료'),
          content: Text('$parsed개가 출고되었습니다.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(dialogContext).pop(); // 결과 다이얼로그 닫기
              },
              child: const Text('확인'),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('출고 수량 입력'),
      content: FutureBuilder<Item>(
        future: itemFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const SizedBox(height: 80, child: Center(child: CircularProgressIndicator()));
          } else if (snapshot.hasError) {
            return Text('오류 발생: ${snapshot.error}');
          }

          final item = snapshot.data!;

          return SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                ItemCardLarge(item: item),
                const SizedBox(height: 16),
                TextField(
                  controller: _quantityController,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: '차감할 수량',
                    border: OutlineInputBorder(),
                  ),
                ),
              ],
            ),
          );
        },
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('취소'),
        ),
        ElevatedButton(
          onPressed: () async {
            final input = _quantityController.text;
            final parsed = int.tryParse(input);

            if (parsed == null || parsed <= 0) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('1 이상의 수량을 입력해주세요.')),
              );
              return;
            }

            try {
              await dispatchQuantity(parsed);
              if (!mounted) return;

              await showResultDialog(context, parsed); // 결과 다이얼로그 표시
              if (!mounted) return;

              Navigator.of(context).pop(true); // 출고 성공 상태 반환
            } catch (e) {
              if (!mounted) return;
              showDialog(
                context: context,
                builder: (_) => AlertDialog(
                  title: const Text('오류'),
                  content: Text('출고 실패'),
                  actions: [
                    TextButton(
                      onPressed: () => Navigator.of(context).pop(),
                      child: const Text('닫기'),
                    ),
                  ],
                ),
              );
            }
          },
          child: const Text('출고'),
        ),
      ],
    );
  }

  @override
  void dispose() {
    _quantityController.dispose();
    super.dispose();
  }
}
