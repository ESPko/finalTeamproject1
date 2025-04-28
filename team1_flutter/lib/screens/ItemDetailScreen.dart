import 'dart:developer';

import 'package:flutter/material.dart';
import '../models/item.dart';
import '../services/api_service.dart';
import 'package:flutter/services.dart';

// 아이템 상세정보를 보여주는 화면
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
      // 뒤로 가기 시 커스텀 동작 정의
      onWillPop: () async {
        Navigator.pop(context); // 현재 화면 닫고 이전 화면으로 이동
        return false; // 기본 동작 무시
      },
      child: Scaffold(
        appBar: AppBar(
          title: const Text('아이템 상세'),
        ),
        body: FutureBuilder<Item>(
          future: futureItem, // 서버로부터 아이템 정보를 기다림
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator()); // 로딩 중
            } else if (snapshot.hasError) {
              debugPrint('에러 발생: ${snapshot.error}');
              return Center(child: Text('에러 발생: ${snapshot.error}'));
            } else if (!snapshot.hasData) {
              return const Center(child: Text('아이템을 찾을 수 없습니다.'));
            } else {
              final item = snapshot.data!;
              _quantityController.text = item.quantity.toString(); // 현재 수량 표시

              return SingleChildScrollView(
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _infoBlock(context, '아이템 이름', item.name), // 아이템 이름
                    const SizedBox(height: 20),
                    _infoBlock(context, '현재 수량', '${item.quantity}'), // 현재 수량
                    const SizedBox(height: 20),

                    Text('수량 수정', style: Theme.of(context).textTheme.labelLarge),
                    const SizedBox(height: 8),
                    TextField(
                      controller: _quantityController,
                      keyboardType: TextInputType.number, // 숫자 전용 키패드
                      decoration: const InputDecoration(
                        labelText: '새 수량',
                      ),
                      inputFormatters: [
                        FilteringTextInputFormatter.digitsOnly, // 숫자만 입력 가능
                      ],
                    ),

                    const SizedBox(height: 30),
                    SizedBox(
                      width: double.infinity,
                      child: ElevatedButton(
                        onPressed: () => _handleUpdateQuantity(item),
                        child: const Text('수량 수정'),
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

  // 아이템 정보를 화면에 블록 형태로 표시하는 위젯
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

  // 수량 수정 버튼을 눌렀을 때 실행되는 함수
  void _handleUpdateQuantity(Item item) async {
    final newQuantity = int.tryParse(_quantityController.text);
    if (newQuantity != null && newQuantity >= 0) {
      try {
        // API 호출로 수량 업데이트
        final updatedItem = await ApiService().updateItemQuantity(item.id.toString(), newQuantity);

        Navigator.pop(context, updatedItem); // 수정된 아이템 정보를 전달하며 뒤로 이동

        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('수량이 변경되었습니다.')),
        );
      } catch (e) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('수량 수정 실패: $e')),
        );
      }
    } else {
      // 유효하지 않은 값 입력 시
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('유효한 수량을 입력해주세요.')),
      );
    }
  }
}
