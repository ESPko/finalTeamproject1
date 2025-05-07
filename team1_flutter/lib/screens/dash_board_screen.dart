import 'dart:async';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:test2/screens/qr_scanner_screen.dart';
import 'package:test2/screens/stock_check.dart';

import '../widgets/custom_qr_icon.dart';

// 메인 대시보드 화면 위젯 (AppBar 포함)
class DashBoardScreen extends StatelessWidget {
  const DashBoardScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('아이템매니아'), // 상단 제목
        elevation: 0,
      ),
      body: InventoryMainPage(), // 재고관리 페이지 본체를 호출
    );
  }
}

// StatefulWidget: 검색 기능과 재고 동적 계산을 위해 상태 관리
class InventoryMainPage extends StatefulWidget {
  @override
  _InventoryMainPageState createState() => _InventoryMainPageState();
}

class _InventoryMainPageState extends State<InventoryMainPage> {
  final String today = DateFormat('MM월 dd일').format(DateTime.now()); // 오늘 날짜 표시용

  // 샘플 제품 목록 (제품명, 회사명, 현재재고, 적정재고)
  final List<Map<String, dynamic>> _products = [
    {'name': '제품A', 'company': '회사1', 'currentStock': 30, 'optimalStock': 50},
    {'name': '제품B', 'company': '회사2', 'currentStock': 80, 'optimalStock': 80},
    {'name': '제품C', 'company': '회사3', 'currentStock': 20, 'optimalStock': 60},
    {'name': '제품D', 'company': '회사4', 'currentStock': 100, 'optimalStock': 100},
    {'name': '제품E', 'company': '회사5', 'currentStock': 5, 'optimalStock': 40},
  ];

  // 검색어 입력을 저장하는 컨트롤러
  final TextEditingController _searchController = TextEditingController();
  // 이 컨트롤러에 사용자가 검색어를 입력하면 해당 값으로 리스트를 필터링할 수 있음

  // 현재 모든 제품의 총재고를 계산
  int getTotalStock() {
    return _products.fold(0, (sum, product) {
      int currentStock = product['currentStock'] ?? 0;
      return sum + currentStock;
    });
  }

  // 모든 제품의 적정재고 총합
  int getTotalInStock() {
    return _products.fold(0, (sum, product) {
      int optimalStock = product['optimalStock'] ?? 0;
      return sum + optimalStock;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // 전체 스크롤 가능한 본문
        SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildSummaryCard(), // 날짜 및 재고 요약 카드
                SizedBox(height: 16),
                CustomSearchBar(controller: _searchController), // 검색 입력창
                SizedBox(height: 16),
                _buildProductCard(), // 제품 목록 카드들
              ],
            ),
          ),
        ),

        // 우측 하단에 QR 스캔/재고 알림 버튼 배치
        Positioned(
          bottom: 70,
          right: 16,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              // QR 스캐너 화면으로 이동하는 버튼
              ElevatedButton(
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => QRScannerScreen()));
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  shape: CircleBorder(),
                  padding: EdgeInsets.all(24),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text('QR', style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold)),
                    Text('Scan', style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
              SizedBox(width: 16),

              // 재고 알림 화면으로 이동하는 버튼
              ElevatedButton(
                onPressed: () {
                  Navigator.push(context,
                      MaterialPageRoute(builder: (context) => StockCheck()));
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.orange,
                  shape: CircleBorder(),
                  padding: EdgeInsets.all(24),
                ),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text('재고', style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold)),
                    Text('알림', style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // 상단 날짜 및 요약정보 카드
  Widget _buildSummaryCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Color(0xFF4F67FF), // 파란 배경
        borderRadius: BorderRadius.circular(20),
        boxShadow: [BoxShadow(color: Colors.grey.withOpacity(0.3), blurRadius: 10, offset: Offset(0, 5))],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 날짜 텍스트 표시
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
              _buildSummaryText(getTotalStock().toString()), // 총재고
              _buildVerticalDivider(),
              _buildSummaryText(getTotalInStock().toString()), // 총입고
              _buildVerticalDivider(),
              _buildSummaryText('0'), // 총출고 (기능 구현 필요)
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

  // 숫자 요약 텍스트 위젯
  Widget _buildSummaryText(String text) {
    return Flexible(
      child: Center(
        child: Text(text, style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.white)),
      ),
    );
  }

  // 라벨용 텍스트
  Widget _buildSummaryLabel(String text) {
    return Flexible(
      child: Center(
        child: Text(text, style: TextStyle(fontSize: 16, color: Colors.grey[300])),
      ),
    );
  }

  // 세로 구분선
  Widget _buildVerticalDivider() {
    return Container(
      height: 50,
      child: VerticalDivider(color: Colors.white, thickness: 1, width: 20),
    );
  }

  // 모든 제품 목록을 카드로 출력
  Widget _buildProductCard() {
    return Column(
      children: _products.map((product) => _buildProductItemCard(product)).toList(),
    );
  }

  // 개별 제품 정보 카드 위젯
  Widget _buildProductItemCard(Map<String, dynamic> product) {
    final bool isStockLow = product['currentStock'] < product['optimalStock']; // 적정재고 미만 여부

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
          // 제품 이미지 영역
          Container(
            width: 80,
            height: 80,
            decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(10)),
            child: Icon(Icons.image, size: 40, color: Colors.white),
          ),
          SizedBox(width: 16),

          // 제품명 + 회사명
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

          // 현재 재고 및 적정 재고 (색상으로 경고)
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              SizedBox(height: 8),
              Text('현재재고 ${product['currentStock']}', style: TextStyle(fontSize: 14, color: Colors.black87)),
              Text(
                '적정재고 ${product['optimalStock']}',
                style: TextStyle(fontSize: 14, color: isStockLow ? Colors.red : Colors.black87),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ✅ 커스텀 검색바 위젯
// 사용자가 제품명을 직접 입력할 수 있으며, 오른쪽에는 QR 기능 버튼도 함께 배치
class CustomSearchBar extends StatelessWidget {
  final TextEditingController controller;

  const CustomSearchBar({super.key, required this.controller});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 80,
      padding: const EdgeInsets.symmetric(horizontal: 20),
      decoration: BoxDecoration(
        color: Colors.white, // 🔲 검색 바 배경색: 흰색
        borderRadius: BorderRadius.circular(12), // 모서리 둥글게
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3), // 그림자 색상
            blurRadius: 8,
            offset: const Offset(0, 3),
          ),
        ],
      ),
      child: Row(
        children: [
          const Icon(Icons.search, color: Colors.grey), // 🔍 왼쪽 돋보기 아이콘
          const SizedBox(width: 8),

          // 🔠 텍스트 입력 필드 (검색어 입력)
          Expanded(
            child: TextField(
              controller: controller, // 사용자가 입력한 검색어를 받아오는 컨트롤러
              style: const TextStyle(fontSize: 20), // ✅ 입력 글씨 크기
              decoration: const InputDecoration(
                hintText: '제품 검색', // 입력 전 보여지는 힌트 텍스트
                hintStyle: TextStyle(
                  color: Colors.grey,
                  fontSize: 20, // ✅ 힌트 글씨 크기
                ),
                border: InputBorder.none,
                isDense: true,
              ),
              // 입력값 변화 시 setState 등으로 상품 목록 필터링 가능
            ),
          ),

          // 🔳 세로 구분선 (QR 버튼과 입력창 구분)
          Container(
            width: 1, // 세로선 너비
            height: 45,
            color: Colors.grey.shade300,
          ),

          const SizedBox(width: 15),

          // 📷 QR 아이콘 영역
          // → CustomQRIcon은 사용자가 만든 위젯이며,
          //    가운데가 뚫려있고 - 모양 선이 있는 사각형으로 구현됨
          CustomQRIcon(
            size: 24, // 아이콘 크기 조정 가능
            color: const Color(0xFF4F67FF), // ✅ 색상: #4F67FF (파란톤)
          ),
        ],
      ),
    );
  }
}
