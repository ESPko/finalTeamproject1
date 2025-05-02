import 'dart:async';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

// 대시보드 메인 화면
class StockCheck extends StatelessWidget {
  const StockCheck({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InventoryMainPage();
  }
}

// 실제 비품 재고 페이지 (StatefulWidget)
class InventoryMainPage extends StatefulWidget {
  @override
  _InventoryMainPageState createState() => _InventoryMainPageState();
}

class _InventoryMainPageState extends State<InventoryMainPage> {
  final String today = DateFormat('MM월 dd일').format(DateTime.now());

  final PageController _carouselController = PageController();
  int _currentPage = 0;

  final List<String> _images = [
    'assets/images/banner1.jpg',
    'assets/images/banner2.jpg',
    'assets/images/banner3.jpg',
    'assets/images/banner4.jpg',
    'assets/images/banner5.jpg',
  ];

  Timer? _timer;

  // 더미 상품 데이터
  final List<Map<String, dynamic>> _products = [
    {'name': '제품A', 'company': '회사1', 'currentStock': 30, 'optimalStock': 50},
    {'name': '제품B', 'company': '회사2', 'currentStock': 80, 'optimalStock': 80},
    {'name': '제품C', 'company': '회사3', 'currentStock': 20, 'optimalStock': 60},
    {'name': '제품D', 'company': '회사4', 'currentStock': 100, 'optimalStock': 100},
    {'name': '제품E', 'company': '회사5', 'currentStock': 5, 'optimalStock': 40},
  ];

  @override
  void initState() {
    super.initState();
    _startAutoCarousel();
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  void _startAutoCarousel() {
    _timer = Timer.periodic(Duration(seconds: 3), (timer) {
      if (_currentPage < _images.length - 1) {
        _currentPage++;
      } else {
        _currentPage = 0;
      }
      _carouselController.animateToPage(
        _currentPage,
        duration: Duration(milliseconds: 1000),
        curve: Curves.easeInOut,
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: Text('비품 재고관리 시스템'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildCarousel(),
              SizedBox(height: 16),
              _buildSummaryCard(),
              SizedBox(height: 16),
              _buildProductList(), // 리스트 형태로 변경
            ],
          ),
        ),
      ),
    );
  }

  // 1. 캐러셀 위젯
  Widget _buildCarousel() {
    return Container(
      height: 220,
      child: PageView.builder(
        controller: _carouselController,
        itemCount: _images.length,
        itemBuilder: (context, index) {
          return ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Image.asset(
              _images[index],
              fit: BoxFit.cover,
            ),
          );
        },
        onPageChanged: (index) {
          setState(() {
            _currentPage = index;
          });
        },
      ),
    );
  }

  // 2. 오늘 날짜 및 요약 카드
  Widget _buildSummaryCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Color(0xFFF75D59),
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            blurRadius: 10,
            offset: Offset(0, 5),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          RichText(
            text: TextSpan(
              children: [
                TextSpan(
                  text: '오늘  ',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                TextSpan(
                  text: '$today',
                  style: TextStyle(fontSize: 16, color: Colors.white),
                ),
              ],
            ),
          ),
          SizedBox(height: 20),
          Row(
            children: [
              _buildSummaryText('000'),
              _buildVerticalDivider(),
              _buildSummaryText('5'),
            ],
          ),
          SizedBox(height: 0),
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
          style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.white),
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
      child: VerticalDivider(
        color: Colors.white,
        thickness: 1,
        width: 20,
      ),
    );
  }

  // 3. 상품 리스트 (5개 쭉 나열)
  Widget _buildProductList() {
    return Column(
      children: _products.map((product) => _buildProductCard(product)).toList(),
    );
  }

  Widget _buildProductCard(Map<String, dynamic> product) {
    final bool isStockLow = product['currentStock'] < product['optimalStock'];

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => ProductDetailPage(product: product)),
        );
      },
      child: Container(
        width: double.infinity,
        margin: EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.3),
              blurRadius: 10,
              offset: Offset(0, 5),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(Icons.image, size: 40, color: Colors.white),
            ),
            SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(product['name'], style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 4),
                  Text(product['company'], style: TextStyle(fontSize: 16, color: Colors.black54)),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                SizedBox(height: 8),
                Text(
                  '현재재고 ${product['currentStock']}',
                  style: TextStyle(
                    fontSize: 14,
                    color: isStockLow ? Colors.red : Colors.black87, // 부족하면 빨간색
                  ),
                ),
                Text(
                  '적정재고 ${product['optimalStock']}',
                  style: TextStyle(fontSize: 14, color: Colors.black87),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// 상세 페이지
class ProductDetailPage extends StatelessWidget {
  final Map<String, dynamic> product;

  const ProductDetailPage({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${product['name']} 상세정보'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('제품명: ${product['name']}', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            SizedBox(height: 10),
            Text('매입회사: ${product['company']}', style: TextStyle(fontSize: 18)),
            SizedBox(height: 10),
            Text('현재재고: ${product['currentStock']}', style: TextStyle(fontSize: 18)),
            SizedBox(height: 10),
            Text('적정재고: ${product['optimalStock']}', style: TextStyle(fontSize: 18)),
          ],
        ),
      ),
    );
  }
}
