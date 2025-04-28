import 'package:flutter/material.dart';
import 'package:test2/core/app_routes.dart';
import 'theme/app_theme.dart';

void main() {
  runApp(const InventoryApp());
}

class InventoryApp extends StatelessWidget {
  const InventoryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: AppTheme.lightTheme,
      initialRoute: '/',
      routes: appRoutes, // 정의된 라우트 맵 사용
    );
  }
}