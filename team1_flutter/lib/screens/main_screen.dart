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
  bool _isLoggedIn = false;

  @override
  void initState() {
    super.initState();
    _loadUser();
  }

  // 사용자 정보 로딩
  Future<void> _loadUser() async {
    setState(() {
      _isLoading = true;
    });

    try {
      final prefs = await SharedPreferences.getInstance();
      final userJson = prefs.getString('user');
      if (userJson == null) {
        throw Exception('저장된 사용자 정보가 없습니다.');
      }

      final user = User.fromJson(json.decode(userJson));
      setState(() {
        _user = user;
        _isLoggedIn = true;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('로그인 정보 로딩 오류: $_error')),
      );
    }
  }

  // 로그아웃 처리
  Future<void> _logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user');

    setState(() {
      _user = null;
      _isLoggedIn = false;
    });

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
      DashBoardScreen(user: _user), // 안전하게 null 체크 후 전달
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
