import 'dart:developer';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/item.dart';
import '../services/api_service.dart'; // 데이터베이스 연동용 서비스

class ItemDetailScreen extends StatefulWidget {
  final int itemId; // 아이템 ID를 int로 수정

  const ItemDetailScreen({super.key, required this.itemId});

  @override
  _ItemDetailScreenState createState() => _ItemDetailScreenState();
}

class _ItemDetailScreenState extends State<ItemDetailScreen> {
  late Future<Item> futureItem; // 서버에서 받아올 아이템 정보

  @override
  void initState() {
    super.initState();
    futureItem = ApiService().fetchItemById(widget.itemId); // 아이템 정보 불러오기
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
                    _infoBlock(context, '카테고리', item.category),
                    const SizedBox(height: 20),
                    _infoBlock(context, '공급처', item.vendorName),
                    const SizedBox(height: 20),
                    _infoBlock(context, '창고 이름', item.warehouseName),
                    const SizedBox(height: 20),
                    _infoBlock(context, '수량', '${item.quantity}'),
                    const SizedBox(height: 20),
                    _infoBlock(context, '규격', '${item.standard}'),
                    const SizedBox(height: 20),
                    _infoBlock(context, '가격', '${item.price}'),
                    const SizedBox(height: 20),
                    _infoBlock(context, '등록 시간', item.time.toLocal().toString()), // 시간 포맷 조정

                    const SizedBox(height: 30),
                    // 이미지 추가 (이미지 URL을 실제로 화면에 표시하는 부분)
                    if (item.image.isNotEmpty)
                      Image.network(item.image, height: 200, fit: BoxFit.cover),
                    const SizedBox(height: 20),
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
}
