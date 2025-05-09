import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:test2/models/item.dart';
import 'package:test2/models/user.dart';
import '../services/api_service.dart';
import '../widgets/custom_qr_icon.dart';
import 'item_detail_screen.dart';

// 대시보드 화면으로, 로그인한 사용자의 정보를 받아서 전달
class DashBoardScreen extends StatelessWidget {
  final User? user;
  const DashBoardScreen({Key? key, this.user}) : super(key: key); // User?로 변경

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('아이템매니아'),
        elevation: 0,
      ),
      body: InventoryMainPage(
        user: user ?? User(
          idx: 0, // 기본값으로 0을 사용
          id: 'default_id', // 기본값으로 'default_id' 사용
          pass: 'default_pass', // 기본값으로 'default_pass' 사용
          nickName: 'default_nickName', // 기본값으로 'default_nickName' 사용
          department: 'default_department', // 기본값으로 'default_department' 사용
          position: 0, // 기본값으로 0을 사용
        ), // user가 null이면 기본 User 객체 전달
      ),
    );
  }
}

// 실제 인벤토리 페이지의 StatefulWidget
class InventoryMainPage extends StatefulWidget {
  final User user; // User 객체를 non-nullable로 처리
  const InventoryMainPage({super.key, required this.user});

  @override
  _InventoryMainPageState createState() => _InventoryMainPageState();
}

class _InventoryMainPageState extends State<InventoryMainPage> {
  final String today = DateFormat('MM월 dd일').format(DateTime.now()); // 오늘 날짜
  List<Item> _items = []; // 전체 아이템 리스트
  List<Item> _filteredItems = []; // 검색 필터링된 아이템 리스트
  bool _isLoading = true; // 로딩 여부
  TextEditingController _searchController = TextEditingController(); // 검색 필드 컨트롤러

  final ApiService apiService = ApiService(); // API 서비스 인스턴스

  @override
  void initState() {
    super.initState();
    _fetchItems(); // 아이템 데이터를 서버에서 받아오기
    _searchController.addListener(_filterItems); // 검색어 변경 시 필터링 실행
  }

  // 서버에서 아이템 데이터를 비동기로 가져오는 함수
  Future<void> _fetchItems() async {
    try {
      List<Item> items = await apiService.fetchItems(); // API 호출
      setState(() {
        _items = items;
        _filteredItems = _items; // 초기에는 전체 리스트 표시
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      print('아이템 로딩 실패: $e');
    }
  }

  // 검색어에 따라 아이템 필터링
  void _filterItems() {
    String query = _searchController.text.toLowerCase(); // 검색어 소문자 처리
    setState(() {
      _filteredItems = _items.where((item) {
        return item.name.toLowerCase().contains(query) || // 이름 검색
            item.vendorName.toLowerCase().contains(query); // 공급처명 검색
      }).toList();
    });
  }

  // 총 재고 계산 (filteredItems 기준)
  int getTotalStock() {
    return _filteredItems.fold(0, (sum, item) => sum + (item.quantity ?? 0));
  }

  // 전체 제품 카드를 리스트로 생성
  Widget _buildProductCard() {
    return Column(
      children: _filteredItems.map((item) => _buildProductItemCard(item)).toList(),
    );
  }

  // 개별 제품 카드 UI
  Widget _buildProductItemCard(Item item) {
    final bool isStockLow = item.quantity < item.standard; // 현재 수량이 기준보다 낮은지 여부

    return GestureDetector(
      onTap: () {
        // 상세 페이지로 이동
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
            // 이미지 영역
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(10)),
              child: item.image.isNotEmpty
                  ? Image.network(item.image, fit: BoxFit.cover) // 이미지 있을 경우
                  : Icon(Icons.image, size: 40, color: Colors.white), // 없을 경우 기본 아이콘
            ),
            SizedBox(width: 16),
            // 제품명 및 공급처
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
            // 수량 정보
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                SizedBox(height: 8),
                Text('현재재고 ${item.quantity}', style: TextStyle(fontSize: 14, color: Colors.black87)),
                Text(
                  '적정재고 ${item.standard}',
                  style: TextStyle(fontSize: 14, color: isStockLow ? Colors.red : Colors.black87), // 재고 부족 시 빨간색
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
        ? Center(child: CircularProgressIndicator()) // 로딩 중이면 로딩 스피너 표시
        : SingleChildScrollView(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSummaryCard(), // 요약 카드 (총재고 등)
            SizedBox(height: 16),
            CustomSearchBar(controller: _searchController), // 검색바
            SizedBox(height: 16),
            _buildProductCard(), // 아이템 리스트
          ],
        ),
      ),
    );
  }

  // 상단 요약 카드 (총재고, 총입고, 총출고)
  Widget _buildSummaryCard() {
    return GestureDetector(
      onTap: () {
        // 관리자나 매니저만 재고조사 페이지로 이동
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
            // 날짜 표시
            RichText(
              text: TextSpan(
                children: [
                  TextSpan(text: '오늘  ', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                  TextSpan(text: '$today', style: TextStyle(fontSize: 16, color: Colors.white)),
                ],
              ),
            ),
            SizedBox(height: 20),
            // 숫자 요약
            Row(
              children: [
                _buildSummaryText(getTotalStock().toString()), // 총재고
                _buildVerticalDivider(),
                _buildSummaryText('0'), // 총입고 (임시값)
                _buildVerticalDivider(),
                _buildSummaryText('0'), // 총출고 (임시값)
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

// 검색 바 위젯
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
              Navigator.pushNamed(context, '/scan'); // QR 스캔 페이지로 이동
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
