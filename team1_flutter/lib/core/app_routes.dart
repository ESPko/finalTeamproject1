import 'package:flutter/material.dart';
import 'package:test2/screens/dash_board_screen.dart';
import 'package:test2/screens/qr_scanner_screen.dart';
import 'package:test2/screens/stock_check.dart';
import '../models/user.dart';
import '../screens/login_screen.dart'; // 추가
import '../screens/main_screen.dart'; // 추가
import '../screens/history_screen.dart';
import '../screens/my_page_screen.dart'; // 추가

// 앱의 라우트를 관리하는 Map
final Map<String, WidgetBuilder> appRoutes = {
  // 로그인 화면 경로 (최초 앱 실행 시 표시될 화면)
  '/login': (context) => const LoginScreen(), // 로그인 화면 추가

  // 홈 화면 경로
  '/': (context) => const MainScreen(), // 기존 홈 화면 (필요시 유지)

  // QR 스캐너 화면 경로
  '/scan': (context) => const QRScannerScreen(),

  // 이력 조회 화면
  '/history': (context) => const HistoryScreen(),

  // 대시보드 화면
  '/dashboard': (context) {
    final user = ModalRoute.of(context)!.settings.arguments as User;
    return DashBoardScreen(user: user);
  },

  // 재고 확인 화면
  '/stockcheck': (context) => const StockCheck(), // 세미콜론 → 쉼표

  '/mypage' : (context) {
    final user = ModalRoute.of(context)!.settings.arguments as User;
    return MypageScreen(user: user);
  },
};
