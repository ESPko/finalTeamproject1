import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test2/screens/history_screen.dart';
import 'package:test2/screens/item_list_screen.dart';
import 'package:test2/screens/login_screen.dart';
import 'package:test2/screens/search_filter_screen.dart';
import 'package:test2/screens/dash_board_screen.dart'; // DashBoardScreen 임포트 추가

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
    ItemListScreen(),   // 아이템 리스트(),  // QR 스캔
    HistoryScreen(),    // 이력
    LoginScreen(),      // 프로필/설정
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
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
              label: 'DashBoard',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.search),
              label: 'Search',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.list),
              label: 'ItemList',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.history),
              label: 'History',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'Login',
            ),
          ],
        ),
      ),
    );
  }
}