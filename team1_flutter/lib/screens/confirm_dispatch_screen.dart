import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ConfirmDispatchDialog extends StatefulWidget {
  final String qrUrl;

  const ConfirmDispatchDialog({super.key, required this.qrUrl});

  @override
  State<ConfirmDispatchDialog> createState() => _ConfirmDispatchDialogState();
}

class _ConfirmDispatchDialogState extends State<ConfirmDispatchDialog> {
  late Future<Map<String, dynamic>> itemFuture;
  final TextEditingController _quantityController = TextEditingController();

  @override
  void initState() {
    super.initState();
    itemFuture = fetchItemInfo();
  }

  Future<Map<String, dynamic>> fetchItemInfo() async {
    final uri = Uri.parse(widget.qrUrl);
    final segments = uri.pathSegments;
    final id = segments.contains('items') ? segments[segments.indexOf('items') + 1] : null;

    if (id == null) throw Exception('올바르지 않은 URL입니다.');

    final itemUrl = '${uri.origin}/api/items/$id';

    final response = await http.get(Uri.parse(itemUrl));

    if (response.statusCode == 200) {
      final decoded = utf8.decode(response.bodyBytes);
      return json.decode(decoded);
    } else {
      throw Exception('상품 정보를 불러올 수 없습니다.');
    }
  }

  Future<void> dispatchQuantity(int quantityToSubtract) async {
    final response = await http.patch(
      Uri.parse(widget.qrUrl),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({'quantityToSubtract': quantityToSubtract}),
    );

    if (response.statusCode != 200) {
      throw Exception('출고 요청 실패: ${response.statusCode}');
    }
  }

  Future<void> showResultDialog(int parsed) async {
    // 다이얼로그를 띄운 후 QR 스캐닝 화면으로 이동
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text('출고 완료'),
        content: Text('$parsed개가 출고되었습니다.'),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop(); // 다이얼로그 닫기
              // QR 스캐닝 화면으로 돌아가기
              Navigator.of(context).popUntil((route) => route.settings.name == '/dashboard');
            },
            child: const Text('확인'),
          ),
        ],
      ),
    );
  }


  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text('출고 수량 입력'),
      content: FutureBuilder<Map<String, dynamic>>(
        future: itemFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const SizedBox(height: 80, child: Center(child: CircularProgressIndicator()));
          } else if (snapshot.hasError) {
            return Text('오류 발생: ${snapshot.error}');
          }

          final item = snapshot.data!;
          final name = item['name'];
          final quantity = item['quantity'];

          return Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('$name (재고: $quantity개)'),
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
              Navigator.of(context).pop(); // 다이얼로그 닫기
              showResultDialog(parsed); // 결과 다이얼로그 표시
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
