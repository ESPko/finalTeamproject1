import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import '../models/item.dart';
import '../services/api_service.dart';
import '../widgets/item_card_large.dart';
import 'item_detail_screen.dart';
import 'product_detail_page.dart';

class StockCheck extends StatefulWidget {
  const StockCheck({Key? key}) : super(key: key);

  @override
  State<StockCheck> createState() => _StockCheckState();
}

class _StockCheckState extends State<StockCheck> {
  late Future<List<Item>> _futureItems;
  final ApiService apiService = ApiService();
  final String today = DateFormat('MM월 dd일').format(DateTime.now());

  @override
  void initState() {
    super.initState();
    _futureItems = apiService.fetchItems();
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
            final lowStockItems = allItems.where((item) => item.quantity < item.standard).toList();

            return SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildSummaryCard(allItems.length, lowStockItems.length),
                  const SizedBox(height: 16),
                  ...lowStockItems.map(
                        (item) => ItemCardLarge(
                      item: item,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => ItemDetailScreen(itemId: item.idx),
                          ),
                        );
                      },
                    ),
                  ),
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
              _buildSummaryLabel('전체비품'),
              _buildVerticalDivider(),
              _buildSummaryLabel('재고부족비품'),
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
    return SizedBox(
      height: 50,
      child: const VerticalDivider(
        color: Colors.white,
        thickness: 1,
        width: 20,
      ),
    );
  }
}
