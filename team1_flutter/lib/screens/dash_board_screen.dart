import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:test2/models/item.dart';
import '../widgets/custom_qr_icon.dart';

class DashBoardScreen extends StatelessWidget {
  const DashBoardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('아이템매니아'),
        elevation: 0,
      ),
      body: InventoryMainPage(),
    );
  }
}

class InventoryMainPage extends StatefulWidget {
  @override
  _InventoryMainPageState createState() => _InventoryMainPageState();
}

class _InventoryMainPageState extends State<InventoryMainPage> {
  final String today = DateFormat('MM월 dd일').format(DateTime.now()); // 오늘 날짜 표시용
  List<Item> _items = []; // 아이템 리스트
  List<Item> _filteredItems = []; // 필터링된 아이템 리스트
  bool _isLoading = true; // 데이터 로딩 상태
  TextEditingController _searchController = TextEditingController(); // 검색 입력 컨트롤러

  @override
  void initState() {
    super.initState();
    _fetchItems(); // 화면이 초기화 될 때 데이터를 받아옴
    _searchController.addListener(_filterItems); // 검색 바의 텍스트 변경에 리스너 추가
  }

  // API에서 아이템 데이터를 받아오는 함수
  Future<void> _fetchItems() async {
    final response = await http.get(Uri.parse('http://10.100.203.16:8080/api/items'));

    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(utf8.decode(response.bodyBytes)); // UTF-8로 디코딩
      setState(() {
        _items = data.map((item) => Item.fromJson(item)).toList(); // 받은 데이터를 Item 모델로 변환
        _filteredItems = _items; // 초기에는 필터링된 아이템도 전체 목록
        _isLoading = false;
      });
    } else {
      setState(() {
        _isLoading = false;
      });
      throw Exception('아이템 목록을 불러오는 데 실패했습니다.');
    }
  }

  // 검색 바의 텍스트를 기반으로 아이템 필터링
  void _filterItems() {
    String query = _searchController.text.toLowerCase();
    setState(() {
      _filteredItems = _items.where((item) {
        return item.name.toLowerCase().contains(query) || item.vendorName.toLowerCase().contains(query);
      }).toList();
    });
  }

  // 현재 모든 아이템의 총재고를 계산
  int getTotalStock() {
    return _filteredItems.fold(0, (sum, item) {
      int quantity = item.quantity ?? 0;
      return sum + quantity;
    });
  }

  // 아이템 목록을 카드로 출력
  Widget _buildProductCard() {
    return Column(
      children: _filteredItems.map((item) => _buildProductItemCard(item)).toList(),
    );
  }

  Widget _buildProductItemCard(Item item) {
    final bool isStockLow = item.quantity < item.standard;

    return Container(
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
            child: Icon(Icons.image, size: 40, color: Colors.white),
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
    );
  }

  @override
  Widget build(BuildContext context) {
    return _isLoading
        ? Center(child: CircularProgressIndicator()) // 데이터가 로딩 중이면 로딩 화면 표시
        : SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSummaryCard(),
            SizedBox(height: 16),
            CustomSearchBar(controller: _searchController), // 검색 바 추가
            SizedBox(height: 16),
            _buildProductCard(), // 필터링된 아이템 목록 표시
          ],
        ),
      ),
    );
  }

  // 상단 요약 카드
  Widget _buildSummaryCard() {
    return Container(
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
              _buildSummaryText('0'), // 총입고 예시
              _buildVerticalDivider(),
              _buildSummaryText('0'), // 총출고 예시
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
              // QR 코드 이미지 클릭 시 QR 스캐너 화면으로 이동
              Navigator.pushNamed(context, '/scan');
            },
            child: CustomQRIcon(
              size: 24,
              color: const Color(0xFF4F67FF),
            ),
          ),
        ],
      ),
    );
  }
}
