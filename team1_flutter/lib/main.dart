import 'package:flutter/foundation.dart' show kIsWeb;
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';

import 'package:test2/core/app_routes.dart';
import 'theme/app_theme.dart';
import 'firebase_options.dart'; // 자동 생성된 옵션 파일

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Firebase 초기화 (웹은 options 필요)
  if (kIsWeb) {
    await Firebase.initializeApp(
      options: DefaultFirebaseOptions.web,
    );
  } else {
    await Firebase.initializeApp();
  }

  // FirebaseMessaging 인스턴스 생성
  FirebaseMessaging messaging = FirebaseMessaging.instance;

  // 알림 권한 요청 (웹에서는 별도로 권한 허용이 필요 없음)
  await messaging.requestPermission();

  // FCM 토큰 가져오기
  final token = await messaging.getToken();
  print("FCM Token: $token");

  // 백그라운드 메시지 처리
  FirebaseMessaging.onBackgroundMessage(_firebaseBackgroundHandler);

  // 포그라운드 메시지 처리
  FirebaseMessaging.onMessage.listen((RemoteMessage message) {
    print('Received a message: ${message.notification?.title}');
    // 메시지 수신 후 처리할 로직 추가
  });

  runApp(const InventoryApp());
}

// 백그라운드 메시지 처리 함수
Future<void> _firebaseBackgroundHandler(RemoteMessage message) async {
  print('Received background message: ${message.notification?.title}');
  // 백그라운드에서 처리할 로직 추가
}

class InventoryApp extends StatelessWidget {
  const InventoryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: AppTheme.lightTheme,
      debugShowCheckedModeBanner: false,
      initialRoute: '/login',
      routes: appRoutes,
    );
  }
}
