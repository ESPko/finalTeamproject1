import 'dart:async';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart'; // 날짜 포맷용 패키지

class DashBoardScreen extends StatelessWidget {
  const DashBoardScreen({Key? key}) : super(key: key); // const 생성자 추가

  @override
  Widget build(BuildContext context) {
    return InventoryMainPage(); // DashBoardScreen에서 InventoryMainPage로 전달
  }
}

class InventoryMainPage extends StatefulWidget {
  @override
  _InventoryMainPageState createState() => _InventoryMainPageState();
}

class _InventoryMainPageState extends State<InventoryMainPage> {
  final String today = DateFormat('MM월 dd일').format(DateTime.now());

  // 페이지 컨트롤러
  final PageController _carouselController = PageController();
  int _currentPage = 0; // 현재 페이지 인덱스

  // 이미지 리스트
  final List<String> _images = [
    'https://via.placeholder.com/300x200/FF5733/FFFFFF?text=Image+1',
    'https://via.placeholder.com/300x200/33FF57/FFFFFF?text=Image+2',
    'https://via.placeholder.com/300x200/5733FF/FFFFFF?text=Image+3',
    'https://via.placeholder.com/300x200/FF33F6/FFFFFF?text=Image+4',
    'https://via.placeholder.com/300x200/F6FF33/FFFFFF?text=Image+5',
  ];

  // 타이머 설정
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _startAutoCarousel(); // 캐러셀 자동 넘기기 시작
  }

  @override
  void dispose() {
    _timer?.cancel(); // 타이머 종료
    super.dispose();
  }

  // 자동으로 3초마다 이미지 넘기기
  void _startAutoCarousel() {
    _timer = Timer.periodic(Duration(seconds: 3), (timer) {
      if (_currentPage < _images.length - 1) {
        _currentPage++;
      } else {
        _currentPage = 0; // 마지막 이미지에서 첫 번째 이미지로 돌아감
      }
      _carouselController.animateToPage(
        _currentPage,
        duration: Duration(milliseconds: 500), // 500ms 동안 천천히 넘기기
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
              // 캐러셀
              _buildCarousel(),
              SizedBox(height: 16),
              _buildSummaryCard(),
              SizedBox(height: 16),
              _buildProductCard(),
              _buildProductActionsButton(), // 출고내역 / 재고알림 버튼을 카드뷰 밖으로 꺼냄
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCarousel() {
    return Container(
      height: 200, // 캐러셀의 높이
      child: PageView.builder(
        controller: _carouselController,
        itemCount: _images.length,
        itemBuilder: (context, index) {
          return Image.network(_images[index], fit: BoxFit.cover);
        },
        onPageChanged: (index) {
          setState(() {
            _currentPage = index;
          });
        },
      ),
    );
  }

  Widget _buildSummaryCard() {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Color(0xFF007BFF), // Bootstrap primary 색상과 비슷한 파란색
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
                  text: '오늘  ', // "오늘" 부분
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                ),
                TextSpan(
                  text: '$today', // "투데이" 부분
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.normal, color: Colors.white),
                ),
              ],
            ),
          ),
          SizedBox(height: 20),
          Row(
            children: [
              _buildSummaryText('000'),
              _buildVerticalDivider(),
              _buildSummaryText('000'),
              _buildVerticalDivider(),
              _buildSummaryText('000'),
            ],
          ),
          SizedBox(height: 0), // 두 번째 줄과 세 번째 줄 사이의 공백을 줄임
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
      flex: 1,
      child: Center(
        child: Text(
          text, // 값은 데이터로 대체 가능
          style: TextStyle(fontSize: 30, fontWeight: FontWeight.bold, color: Colors.white),
        ),
      ),
    );
  }

  Widget _buildSummaryLabel(String text) {
    return Flexible(
      flex: 1,
      child: Center(
        child: Text(
          text, // 텍스트를 맞춤
          style: TextStyle(fontSize: 16, color: Colors.grey[300]),
        ),
      ),
    );
  }

  Widget _buildVerticalDivider() {
    return Container(
      height: 50, // 세로 구분선의 길이를 길게 설정하여 공백을 채움
      child: VerticalDivider(
        color: Colors.white,
        thickness: 1,
        width: 20,
      ),
    );
  }

  Widget _buildProductCard() {
    return Container(
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
                Text('제품명', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                SizedBox(height: 4),
                Text('매입회사', style: TextStyle(fontSize: 16, color: Colors.black54)),
              ],
            ),
          ),
          // 현재재고 | 적정재고가 오른쪽 끝에 위치하도록
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              SizedBox(height: 8),
              Text('현재재고 50', style: TextStyle(fontSize: 14, color: Colors.black87)),
              Text('적정재고 100', style: TextStyle(fontSize: 14, color: Colors.black87)),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildProductActionsButton() {
    return Padding(
      padding: const EdgeInsets.only(top: 16),
      child: Align(
        alignment: Alignment.centerRight,
        child: ElevatedButton(
          onPressed: () {
            // 버튼 클릭 시 행동을 추가
          },
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.blue, // 배경 색상
            shape: CircleBorder(), // 원형 버튼
            padding: EdgeInsets.all(24), // 원형 버튼의 크기 조정
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                '출고',
                style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold),
              ),
              Text(
                '내역',
                style: TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
