import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:test2/screens/history_screen.dart';
import 'package:test2/screens/login_screen.dart';
import 'package:test2/screens/dash_board_screen.dart';
import 'package:test2/screens/my_page_screen.dart';
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
        throw Exception('로그인 정보가 없습니다. 로그인 후 이용해주세요.');
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

      // WidgetsBinding 사용하여 안전한 스낵바 출력
      // WidgetsBinding.instance.addPostFrameCallback((_) {
      //   ScaffoldMessenger.of(context).showSnackBar(
      //     SnackBar(content: Text('로그인 정보 로딩 오류: $_error')),
      //   );
      // });
    }
  }

  // 로그아웃 처리
  Future<void> _logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('user');

    setState(() {
      _user = null;
      _isLoggedIn = false;
      _selectedIndex = 2;
    });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('로그아웃되었습니다.')),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (_error != null) {
      return Scaffold(
        body: Center(child: Text('오류: $_error')),
      );
    }

    final screens = [
      DashBoardScreen(user: _user), // null 체크는 DashBoardScreen 내부에서도 수행됨
      const HistoryScreen(),
      _isLoggedIn
          ? MypageScreen(user: _user!)
          : const LoginScreen(),
    ];

    return Scaffold(
      body: screens[_selectedIndex],
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
        selectedIconTheme: const IconThemeData(size: 28),
        unselectedIconTheme: const IconThemeData(size: 24),
        items: const [
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
            label: '마이페이지',
          ),
        ],
      ),
      floatingActionButton: _isLoggedIn
          ? FloatingActionButton(
        onPressed: _logout,
        child: const Icon(Icons.exit_to_app),
        tooltip: '로그아웃',
      )
          : null,
    );
  }
}
