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
    print(widget.itemId);
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
                    // 이미지 추가 (이미지 URL을 실제로 화면에 표시하는 부분)
                    if (item.image.isNotEmpty)
                      Center(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Image.network(item.image, height: 250, fit: BoxFit.cover),
                        ),
                      ),
                    const SizedBox(height: 30),

                    _buildInfoBox(context, '아이템 정보', [
                      _buildInfoRow('아이템 이름', item.name),
                      _buildInfoRow('카테고리', item.category),
                      _buildInfoRow('공급처', item.vendorName),
                      _buildInfoRow('창고 이름', item.warehouseName),
                    ]),

                    _buildInfoBox(context, '재고 및 규격', [
                      _buildInfoRow('수량', '${item.quantity}'),
                      _buildInfoRow('규격', '${item.standard}'),
                      _buildInfoRow('가격', '${item.price}'),
                    ]),
                  ],
                ),
              );
            }
          },
        ),
      ),
    );
  }

  Widget _buildInfoBox(BuildContext context, String title, List<Widget> rows) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            ...rows,
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String title, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
          Text(value, style: const TextStyle(fontSize: 16)),
        ],
      ),
    );
  }
}
