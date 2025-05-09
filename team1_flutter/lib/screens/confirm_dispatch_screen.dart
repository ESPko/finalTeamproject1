import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:test2/screens/dash_board_screen.dart';
import 'dart:convert';

import '../models/item.dart';
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
      final response = await http.get(Uri.parse(itemUrl));

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
    final response = await http.patch(
      Uri.parse(widget.qrUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'quantityToSubtract': quantityToSubtract}),
    );

    if (response.statusCode != 200) {
      throw Exception('출고 요청 실패 (상태 코드: ${response.statusCode})');
    }
  }

  Future<bool?> showResultDialog(BuildContext context, int parsed) {
    return showDialog<bool>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext dialogContext) {
        return AlertDialog(
          title: const Text('출고 완료'),
          content: Text('$parsed개가 출고되었습니다.'),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(dialogContext).pop(true);
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

              final confirmed = await showResultDialog(context, parsed);
              if (confirmed == true && mounted) {
                Navigator.pushReplacement(
                  context,
                  MaterialPageRoute(builder: (context) => DashBoardScreen()),
                );
              }
            } catch (e) {
              if (!mounted) return;
              showDialog(
                context: context,
                builder: (_) => AlertDialog(
                  title: const Text('오류'),
                  content: Text('출고 실패: $e'),
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
