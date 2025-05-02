import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test2/screens/history_screen.dart';
import 'package:test2/screens/item_list_screen.dart';
import 'package:test2/screens/login_screen.dart';
import 'package:test2/screens/search_filter_screen.dart';
import 'package:test2/screens/dash_board_screen.dart';
import 'package:test2/screens/stock_check.dart'; // StockCheck 페이지 임포트

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);


  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  // 네비게이션 바에 표시될 화면들
  final List<Widget> _screens = [
    DashBoardScreen(),  // DashBoard 화면 추가
    SearchFilterScreen(),  // 검색/필터
    HistoryScreen(),    // 이력
    LoginScreen(),      // 프로필/설정
    // StockCheck는 네비게이션 바에서 숨김
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _selectedIndex == 4
          ? StockCheck()  // StockCheck 화면은 별도로 렌더링
          : _screens[_selectedIndex],  // 다른 화면은 _screens 배열에서 선택된 인덱스에 맞게 표시
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.1),
              blurRadius: 10,
              offset: Offset(0, -5),
            ),
          ],
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: (index) {
            // StockCheck는 네비게이션 바에서 보이지 않도록 설정
            if (index == 4) {
              // StockCheck 화면을 네비게이션 바에서 비활성화 처리
              return;
            }
            setState(() {
              _selectedIndex = index;
            });
          },
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.white,
          selectedItemColor: Theme.of(context).primaryColor,
          unselectedItemColor: Colors.grey,
          selectedIconTheme: IconThemeData(size: 28),
          unselectedIconTheme: IconThemeData(size: 24),
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.dashboard),
              label: '대시보드',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.search),
              label: '비품검색',
            ),
            // BottomNavigationBarItem(
            //   icon: Icon(Icons.list),
            //   label: '비품목록',
            // ),
            BottomNavigationBarItem(
              icon: Icon(Icons.history),
              label: '출고기록',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: '로그인',
            ),
            // StockCheck 항목을 추가하지 않음
          ],
        ),
      ),
    );
  }
}