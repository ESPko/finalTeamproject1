import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';  // Firebase Core 추가
import 'package:firebase_messaging/firebase_messaging.dart';  // Firebase Messaging 추가
import 'package:test2/core/app_routes.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();  // Flutter 바인딩 초기화
  await Firebase.initializeApp();  // Firebase 초기화

  // FirebaseMessaging 인스턴스 생성
  FirebaseMessaging messaging = FirebaseMessaging.instance;

  // 알림 권한 요청
  messaging.requestPermission();  // 알림 권한 요청

  // FCM 토큰 가져오기
  messaging.getToken().then((token) {
    print("FCM Token: $token"); // FCM 토큰을 콘솔에 출력 (서버와 연동할 때 사용)
  });

  // 백그라운드 메시지 처리
  FirebaseMessaging.onBackgroundMessage(_firebaseBackgroundHandler);

  // 포그라운드에서 메시지 수신 처리
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
      theme: AppTheme.lightTheme,  // 라이트 테마 설정
      debugShowCheckedModeBanner: false,  // 디버그 배너 숨기기
      initialRoute: '/login',  // 초기 라우트 설정
      routes: appRoutes,  // 정의된 라우트 맵 사용
    );
  }
}
