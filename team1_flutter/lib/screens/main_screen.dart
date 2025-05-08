import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:test2/screens/history_screen.dart';
import 'package:test2/screens/login_screen.dart';
import 'package:test2/screens/dash_board_screen.dart';
import '../models/user.dart';

class MainScreen extends StatefulWidget {
  const MainScreen({Key? key}) : super(key: key);

  @override
  _MainScreenState createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;
  User? _user;
  bool _isLoading = true;
  String? _error;
  bool _isLoggedIn = false; // 로그인 여부 상태 추가

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  // 사용자 정보 로딩
  Future<void> _loadUser() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final userJson = prefs.getString('user');
      if (userJson == null) throw Exception('저장된 사용자 정보가 없습니다.');

      final user = User.fromJson(json.decode(userJson));
      setState(() {
        _user = user;
        _isLoggedIn = true; // 사용자 정보가 있으면 로그인 상태로 설정
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
    }
  }

  // 로그아웃 처리
  Future<void> _logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user'); // 사용자 정보 삭제
    setState(() {
      _user = null;
      _isLoggedIn = false; // 로그아웃 상태로 변경
    });
    // 로그인 화면으로 이동
    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (context) => LoginScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (_error != null) {
      return Scaffold(
        body: Center(child: Text('오류: $_error')),
      );
    }

    final List<Widget> _screens = [
      DashBoardScreen(user: _user!), // 유저 정보 전달
      HistoryScreen(),
      LoginScreen(),
    ];

    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
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
            label: _isLoggedIn ? '로그아웃' : '로그인', // 로그인 상태에 따라 버튼 텍스트 변경
          ),
        ],
      ),
      // 로그아웃 시 버튼 눌렀을 때 로그아웃 처리
      floatingActionButton: _isLoggedIn
          ? FloatingActionButton(
        onPressed: _logout,
        child: Icon(Icons.exit_to_app),
        tooltip: '로그아웃',
      )
          : null,
    );
  }
}
