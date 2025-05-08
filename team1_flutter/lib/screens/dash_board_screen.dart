import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:test2/models/item.dart';
import 'package:test2/models/user.dart';
import '../services/api_service.dart';
import '../widgets/custom_qr_icon.dart';
import 'item_detail_screen.dart';

class DashBoardScreen extends StatelessWidget {
  final User user;
  const DashBoardScreen({Key? key, required this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('아이템매니아'),
        elevation: 0,
      ),
      body: InventoryMainPage(user: user),
    );
  }
}

class InventoryMainPage extends StatefulWidget {
  final User user;
  const InventoryMainPage({super.key, required this.user});

  @override
  _InventoryMainPageState createState() => _InventoryMainPageState();
}

class _InventoryMainPageState extends State<InventoryMainPage> {
  final String today = DateFormat('MM월 dd일').format(DateTime.now());
  List<Item> _items = [];
  List<Item> _filteredItems = [];
  bool _isLoading = true;
  TextEditingController _searchController = TextEditingController();

  final ApiService apiService = ApiService();

  @override
  void initState() {
    super.initState();
    _fetchItems();
    _searchController.addListener(_filterItems);
  }

  Future<void> _fetchItems() async {
    try {
      List<Item> items = await apiService.fetchItems();
      setState(() {
        _items = items;
        _filteredItems = _items;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      print('아이템 로딩 실패: $e');
    }
  }

  void _filterItems() {
    String query = _searchController.text.toLowerCase();
    setState(() {
      _filteredItems = _items.where((item) {
        return item.name.toLowerCase().contains(query) ||
            item.vendorName.toLowerCase().contains(query);
      }).toList();
    });
  }

  int getTotalStock() {
    return _filteredItems.fold(0, (sum, item) => sum + (item.quantity ?? 0));
  }

  Widget _buildProductCard() {
    return Column(
      children: _filteredItems.map((item) => _buildProductItemCard(item)).toList(),
    );
  }

  Widget _buildProductItemCard(Item item) {
    final bool isStockLow = item.quantity < item.standard;

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => ItemDetailScreen(itemId: item.idx),
          ),
        );
      },
      child: Container(
        width: double.infinity,
        margin: EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [BoxShadow(color: Colors.grey.withOpacity(0.3), blurRadius: 10, offset: Offset(0, 5))],
        ),
        child: Row(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(10)),
              child: item.image.isNotEmpty
                  ? Image.network(item.image, fit: BoxFit.cover)
                  : Icon(Icons.image, size: 40, color: Colors.white),
            ),
            SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.name, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 4),
                  Text(item.vendorName, style: TextStyle(fontSize: 16, color: Colors.black54)),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                SizedBox(height: 8),
                Text('현재재고 ${item.quantity}', style: TextStyle(fontSize: 14, color: Colors.black87)),
                Text(
                  '적정재고 ${item.standard}',
                  style: TextStyle(fontSize: 14, color: isStockLow ? Colors.red : Colors.black87),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? Center(child: CircularProgressIndicator())
        : SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSummaryCard(),
            SizedBox(height: 16),
            CustomSearchBar(controller: _searchController),
            SizedBox(height: 16),
            _buildProductCard(),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryCard() {
    return GestureDetector(
      onTap: () {
        if (widget.user.position == 1 || widget.user.position == 2) {
          Navigator.pushNamed(context, '/stockcheck');
        } else {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('접근 권한이 없습니다')));
        }
      },
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Color(0xFF4F67FF),
          borderRadius: BorderRadius.circular(20),
          boxShadow: [BoxShadow(color: Colors.grey.withOpacity(0.3), blurRadius: 10, offset: Offset(0, 5))],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            RichText(
              text: TextSpan(
                children: [
                  TextSpan(text: '오늘  ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  TextSpan(text: '$today', style: TextStyle(fontSize: 16, color: Colors.white)),
                ],
              ),
            ),
            SizedBox(height: 20),
            Row(
              children: [
                _buildSummaryText(getTotalStock().toString()),
                _buildVerticalDivider(),
                _buildSummaryText('0'),
                _buildVerticalDivider(),
                _buildSummaryText('0'),
              ],
            ),
            Row(
              children: [
                _buildSummaryLabel('총재고'),
                _buildVerticalDivider(),
                _buildSummaryLabel('총입고'),
                _buildVerticalDivider(),
                _buildSummaryLabel('총출고'),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSummaryText(String text) {
    return Flexible(
      child: Center(
        child: Text(text, style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.white)),
      ),
    );
  }

  Widget _buildSummaryLabel(String text) {
    return Flexible(
      child: Center(
        child: Text(text, style: TextStyle(fontSize: 16, color: Colors.grey[300])),
      ),
    );
  }

  Widget _buildVerticalDivider() {
    return Container(
      height: 50,
      child: VerticalDivider(color: Colors.white, thickness: 1, width: 20),
    );
  }
}

class CustomSearchBar extends StatelessWidget {
  final TextEditingController controller;

  const CustomSearchBar({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Row(
        children: [
          const Icon(Icons.search, color: Colors.grey),
          const SizedBox(width: 8),
          Expanded(
            child: TextField(
              controller: controller,
              style: const TextStyle(fontSize: 20),
              decoration: const InputDecoration(
                hintText: '제품 검색',
                hintStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 20,
                ),
                border: InputBorder.none,
                isDense: true,
              ),
            ),
          ),
          Container(
            width: 1,
            height: 45,
            color: Colors.grey.shade300,
          ),
          const SizedBox(width: 15),
          GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/scan');
            },
            behavior: HitTestBehavior.translucent,
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.transparent,
              ),
              child: CustomQRIcon(
                size: 24,
                color: const Color(0xFF4F67FF),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
