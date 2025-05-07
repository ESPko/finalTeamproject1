import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/item.dart';
import '../services/api_service.dart'; // 데이터베이스 연동용 서비스

class ItemDetailScreen extends StatefulWidget {
  final String itemId; // 전달받은 아이템 ID

  const ItemDetailScreen({super.key, required this.itemId});

  @override
  _ItemDetailScreenState createState() => _ItemDetailScreenState();
}

class _ItemDetailScreenState extends State<ItemDetailScreen> {
  late Future<Item> futureItem; // 서버에서 받아올 아이템 정보
  late TextEditingController _quantityController; // 수량 입력 컨트롤러

  @override
  void initState() {
    super.initState();
    futureItem = ApiService().fetchItemById(widget.itemId); // 아이템 정보 불러오기
    _quantityController = TextEditingController(); // 수량 입력 초기화
  }

  @override
  void dispose() {
    _quantityController.dispose(); // 메모리 해제
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: () async {
        Navigator.pop(context);
        return false;
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text('아이템 상세'),
        ),
        body: FutureBuilder<Item>(
          future: futureItem,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              debugPrint('에러 발생: ${snapshot.error}');
              return Center(child: Text('에러 발생: ${snapshot.error}'));
            } else if (!snapshot.hasData) {
              return const Center(child: Text('아이템을 찾을 수 없습니다.'));
            } else {
              final item = snapshot.data!;

              return SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _infoBlock(context, '아이템 이름', item.name),
                    const SizedBox(height: 20),
                    _infoBlock(context, '현재 수량', '${item.quantity}'),
                    const SizedBox(height: 20),

                    Text('차감할 수량', style: Theme.of(context).textTheme.labelLarge),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _quantityController,
                      keyboardType: TextInputType.number,
                      decoration: const InputDecoration(
                        labelText: '차감할 수량 입력',
                      ),
                      inputFormatters: [
                        FilteringTextInputFormatter.digitsOnly,
                      ],
                    ),

                    const SizedBox(height: 30),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () => _handleUpdateQuantity(item),
                        child: const Text('수량 차감'),
                      ),
                    )
                  ],
                ),
              );
            }
          },
        ),
      ),
    );
  }

  Widget _infoBlock(BuildContext context, String title, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(title, style: Theme.of(context).textTheme.labelLarge),
        const SizedBox(height: 6),
        Text(value, style: Theme.of(context).textTheme.titleMedium),
      ],
    );
  }

  void _handleUpdateQuantity(Item item) async {
    final input = int.tryParse(_quantityController.text);

    if (input != null && input > 0) {
      if (input > item.quantity) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('차감 수량이 현재 수량보다 많습니다.')),
        );
        return;
      }

      try {
        final updatedItem = await ApiService().dispatchItem(
          item.idx.toString(),
          input,
        );

        Navigator.pop(context, updatedItem);

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('수량이 차감되었습니다.')),
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('수량 수정 실패: $e')),
        );
      }
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('1 이상의 유효한 수량을 입력해주세요.')),
      );
    }
  }
}
