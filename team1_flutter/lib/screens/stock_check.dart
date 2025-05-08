import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:test2/models/item.dart';
import 'package:test2/screens/product_detail_page.dart';
import 'package:test2/services/api_service.dart';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../widgets/custom_qr_icon.dart';
import 'item_detail_screen.dart'; // 상세 페이지 import


class StockCheck extends StatefulWidget {
  const StockCheck({Key? key}) : super(key: key);

  @override
  State<StockCheck> createState() => _StockCheckState();
}

class _StockCheckState extends State<StockCheck> {
  late Future<List<Item>> _futureItems;
  final ApiService apiService = ApiService(); // ✅ 인스턴스 생성
  final String today = DateFormat('MM월 dd일').format(DateTime.now());

  @override
  void initState() {
    super.initState();
    _futureItems = apiService.fetchItems(); // ✅ 인스턴스를 통해 접근
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: const Text('부족 재고 확인'),
        centerTitle: true,
      ),
      body: FutureBuilder<List<Item>>(
        future: _futureItems,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('에러 발생: ${snapshot.error}'));
          } else {
            final allItems = snapshot.data!;
            final lowStockItems =
            allItems.where((item) => item.quantity < item.standard).toList();

            return SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSummaryCard(allItems.length, lowStockItems.length),
                  const SizedBox(height: 16),
                  ...lowStockItems.map((item) => _buildProductCard(item)).toList(),
                ],
              ),
            );
          }
        },
      ),
    );
  }

  Widget _buildSummaryCard(int total, int lowStockCount) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: const Color(0xFFF75D59),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          RichText(
            text: TextSpan(
              children: [
                const TextSpan(
                  text: '오늘  ',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                TextSpan(
                  text: today,
                  style: const TextStyle(fontSize: 16, color: Colors.white),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              _buildSummaryText('$total'),
              _buildVerticalDivider(),
              _buildSummaryText('$lowStockCount'),
            ],
          ),
          Row(
            children: [
              _buildSummaryLabel('총재고'),
              _buildVerticalDivider(),
              _buildSummaryLabel('총부족재고'),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSummaryText(String text) {
    return Flexible(
      child: Center(
        child: Text(
          text,
          style: const TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.white),
        ),
      ),
    );
  }

  Widget _buildSummaryLabel(String text) {
    return Flexible(
      child: Center(
        child: Text(
          text,
          style: TextStyle(fontSize: 16, color: Colors.grey[300]),
        ),
      ),
    );
  }

  Widget _buildVerticalDivider() {
    return Container(
      height: 50,
      child: const VerticalDivider(
        color: Colors.white,
        thickness: 1,
        width: 20,
      ),
    );
  }

  Widget _buildProductCard(Item item) {
    final isStockLow = item.quantity < item.standard;

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ProductDetailPage(product: {
              'name': item.name,
              'company': item.vendorName,
              'currentStock': item.quantity,
              'optimalStock': item.standard,
            }),
          ),
        );
      },
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              blurRadius: 10,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: Row(
          children: [
            // 이미지 로딩 부분
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(10),
              ),
              child: item.image.isNotEmpty
                  ? ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: Image.network(
                  item.image,
                  fit: BoxFit.cover,
                  width: 80,
                  height: 80,
                  loadingBuilder: (context, child, loadingProgress) {
                    if (loadingProgress == null) {
                      return child;
                    } else {
                      return const Center(child: CircularProgressIndicator());
                    }
                  },
                  errorBuilder: (context, error, stackTrace) {
                    return const Icon(Icons.image, size: 40, color: Colors.white);
                  },
                ),
              )
                  : const Icon(Icons.image, size: 40, color: Colors.white),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text(item.vendorName, style: const TextStyle(fontSize: 16, color: Colors.black54)),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const SizedBox(height: 8),
                Text(
                  '현재재고 ${item.quantity}',
                  style: TextStyle(
                    fontSize: 14,
                    color: isStockLow ? Colors.red : Colors.black87,
                  ),
                ),
                Text(
                  '적정재고 ${item.standard}',
                  style: const TextStyle(fontSize: 14, color: Colors.black87),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
