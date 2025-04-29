import 'package:flutter/material.dart';
import 'package:test2/screens/qr_scanner_screen.dart';
import '../screens/dash_board_screen.dart';
import '../screens/item_list_screen.dart';
import '../screens/login_screen.dart'; // 추가
import '../screens/main_screen.dart'; // 추가
import '../screens/search_filter_screen.dart'; // 추가
import '../screens/history_screen.dart'; // 추가

// 앱의 라우트를 관리하는 Map
final Map<String, WidgetBuilder> appRoutes = {
  // 로그인 화면 경로 (최초 앱 실행 시 표시될 화면)
  '/login': (context) => const LoginScreen(), // 로그인 화면 추가

  // 홈 화면 경로
  '/': (context) => const MainScreen(), // 기존 홈 화면 (필요시 유지)

  // 아이템 목록 화면 경로
  '/items': (context) => const ItemListScreen(),

  // QR 스캐너 화면 경로
  '/scan': (context) => const QRScannerScreen(),

  // 검색 및 필터링 화면
  '/search': (context) => const SearchFilterScreen(), // 추가

  // 이력 조회 화면
  '/history': (context) => const HistoryScreen(), // 추가

  '/dashboard': (context) => const DashBoardScreen(), // 추가,
};