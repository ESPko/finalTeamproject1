import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:test2/screens/history_screen.dart';
import 'package:test2/screens/login_screen.dart';
import 'package:test2/screens/dash_board_screen.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    DashBoardScreen(),
    HistoryScreen(),
    LoginScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],  // 현재 선택된 화면을 표시
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
              label: '대시보드',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.history),
              label: '출고기록',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: '로그인',
            ),
          ],
        ),
      ),
    );
  }
}
