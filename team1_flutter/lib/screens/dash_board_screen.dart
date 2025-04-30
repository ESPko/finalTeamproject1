import 'dart:async';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // 날짜 포맷용 패키지

// 대시보드 메인 화면
class DashBoardScreen extends StatelessWidget {
  const DashBoardScreen({Key? key}) : super(key: key); // const 생성자 사용

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: InventoryMainPage(), // 상태를 관리하는 InventoryMainPage 호출
      bottomNavigationBar: BottomNavigationBar(
        items: [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: '홈',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.notifications),
            label: '알림',
          ),
        ],
      ),
    );
  }
}

// 실제 비품 재고 페이지 (StatefulWidget)
class InventoryMainPage extends StatefulWidget {
  @override
  _InventoryMainPageState createState() => _InventoryMainPageState();
}

class _InventoryMainPageState extends State<InventoryMainPage> {
  // 오늘 날짜를 포맷팅 (MM월 dd일 형태)
  final String today = DateFormat('MM월 dd일').format(DateTime.now());

  // 페이지 컨트롤러 (캐러셀 제어용)
  final PageController _carouselController = PageController();
  int _currentPage = 0; // 현재 캐러셀 페이지 인덱스

  // 배너 이미지 리스트
  final List<String> _images = [
    'assets/images/banner1.webp',
    'assets/images/banner2.webp',
    'assets/images/banner3.webp',
    'assets/images/banner4.webp',
    'assets/images/banner5.webp',
  ];

  Timer? _timer; // 캐러셀 자동 넘김 타이머

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
    _startAutoCarousel(); // 페이지 자동 전환 시작
  }

  @override
  void dispose() {
    _timer?.cancel(); // 위젯 dispose 시 타이머 해제
    super.dispose();
  }

  // 3초마다 자동으로 페이지 전환
  void _startAutoCarousel() {
    _timer = Timer.periodic(Duration(seconds: 3), (timer) {
      if (_currentPage < _images.length - 1) {
        _currentPage++;
      } else {
        _currentPage = 0; // 마지막 페이지면 첫 번째로
      }
      _carouselController.animateToPage(
        _currentPage,
        duration: Duration(milliseconds: 1000), // 부드럽게 1초간 애니메이션
        curve: Curves.easeInOut,
      );
    });
  }

  // 총 재고, 총 입고, 총 출고 계산
  int getTotalStock() {
    return _products.fold(0, (sum, product) {
      int currentStock = product['currentStock'] ?? 0;  // null 처리
      return sum + currentStock;
    });
  }

  int getTotalInStock() {
    return _products.fold(0, (sum, product) {
      int optimalStock = product['optimalStock'] ?? 0;  // null 처리
      return sum + optimalStock;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        // 실제 내용 화면
        SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildCarousel(), // 이미지 슬라이드 배너
                SizedBox(height: 16),
                _buildSummaryCard(), // 재고 요약 카드
                SizedBox(height: 16),
                _buildProductCard(), // 상품 카드
              ],
            ),
          ),
        ),
        // 플로팅 버튼들
        Positioned(
          bottom: 70, // 버튼 위치를 50px 위로 이동
          right: 16,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/scan'); // 네비게이션 처리
                  // 출고 내역 버튼 클릭 시 행동 추가
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.blue,
                  shape: CircleBorder(), // 원형 버튼
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
              SizedBox(width: 16), // 버튼 사이 간격
              ElevatedButton(
                onPressed: () {
                  Navigator.pushNamed(context, '/stockcheck'); // 네비게이션 처리
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.orange, // 다른 색상으로 구분 (파란색과 대비되게)
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

  // 1. 캐러셀 위젯
  Widget _buildCarousel() {
    return Container(
      height: 200, // 높이 고정
      child: PageView.builder(
        controller: _carouselController,
        itemCount: _images.length,
        itemBuilder: (context, index) {
          return ClipRRect(
            borderRadius: BorderRadius.circular(16), // 모서리 둥글게
            child: Image.asset(
              _images[index],
              fit: BoxFit.cover, // 이미지 꽉 채우기
            ),
          );
        },
        onPageChanged: (index) {
          setState(() {
            _currentPage = index; // 페이지 변경시 상태 업데이트
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
        color: Color(0xFF007BFF), // 파란색 배경
        borderRadius: BorderRadius.circular(20), // 모서리 둥글게
        boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.3),
            blurRadius: 10,
            offset: Offset(0, 5), // 그림자 효과
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 오늘 날짜 텍스트
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
          // 숫자 요약
          Row(
            children: [
              _buildSummaryText(getTotalStock().toString()), // 총재고
              _buildVerticalDivider(),
              _buildSummaryText(getTotalInStock().toString()), // 총입고
              _buildVerticalDivider(),
              _buildSummaryText('0'), // 총출고 (현재는 0으로 설정)
            ],
          ),
          SizedBox(height: 0),
          // 텍스트 라벨
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

  // 요약 숫자 텍스트
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

  // 요약 레이블 텍스트
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

  // 수직 구분선
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

  // 3. 상품 카드
  Widget _buildProductCard() {
    return Column(
      children: _products.map((product) => _buildProductItemCard(product)).toList(),
    );
  }

  Widget _buildProductItemCard(Map<String, dynamic> product) {
    final bool isStockLow = product['currentStock'] < product['optimalStock'];

    return Container(
      width: double.infinity,
      margin: EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white, // 흰색 배경
        borderRadius: BorderRadius.circular(20), // 모서리 둥글게
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
          // 제품 이미지 영역
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
          // 제품명, 매입회사
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
          // 재고 정보 (오른쪽 끝 정렬)
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              SizedBox(height: 8),
              Text('현재재고 ${product['currentStock']}', style: TextStyle(fontSize: 14, color: Colors.black87)),
              Text('적정재고 ${product['optimalStock']}', style: TextStyle(fontSize: 14, color: isStockLow ? Colors.red : Colors.black87)),
            ],
          ),
        ],
      ),
    );
  }

  // // 4. 출고 내역 & 재고 알림 버튼
  // Widget _buildProductActionsButton() {
  //   return Padding(
  //     padding: const EdgeInsets.only(top: 16),
  //     child: Row(
  //       mainAxisAlignment: MainAxisAlignment.end, // 오른쪽 정렬
  //       children: [
  //         ElevatedButton(
  //           onPressed: () {
  //             Navigator.pushNamed(context, '/scan'); // 네비게이션 처리
  //             // 출고 내역 버튼 클릭 시 행동 추가
  //           },
  //           style: ElevatedButton.styleFrom(
  //             backgroundColor: Colors.blue,
  //             shape: CircleBorder(), // 원형 버튼
  //             padding: EdgeInsets.all(24),
  //           ),
  //           child: Column(
  //             mainAxisSize: MainAxisSize.min,
  //             children: [
  //               Text('QR', style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold)),
  //               Text('스캔', style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold)),
  //             ],
  //           ),
  //         ),
  //         SizedBox(width: 16), // 버튼 사이 간격
  //         ElevatedButton(
  //           onPressed: () {
  //             // 재고 알림 버튼 클릭 시 행동 추가
  //             Navigator.pushNamed(context, '/stockcheck'); // 네비게이션 처리
  //           },
  //           style: ElevatedButton.styleFrom(
  //             backgroundColor: Colors.orange, // 다른 색상으로 구분 (파란색과 대비되게)
  //             shape: CircleBorder(),
  //             padding: EdgeInsets.all(24),
  //           ),
  //           child: Column(
  //             mainAxisSize: MainAxisSize.min,
  //             children: [
  //               Text('재고', style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold)),
  //               Text('알림', style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold)),
  //             ],
  //           ),
  //         ),
  //       ],
  //     ),
  //   );
  // }
}
