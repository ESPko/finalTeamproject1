import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:http/http.dart' as http;
import 'package:cloud_firestore/cloud_firestore.dart'; // Firestore 패키지 추가
import 'firebase_options.dart';
import 'package:test2/core/app_routes.dart';
import 'theme/app_theme.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Firebase 초기화
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  FirebaseMessaging messaging = FirebaseMessaging.instance;

  // 알림 권한 요청 (iOS 전용)
  await messaging.requestPermission(
    alert: true,
    badge: true,
    sound: true,
  );

  // FCM 토큰 가져오기
  final token = await messaging.getToken();
  print('📲 FCM Token: $token');
  // Firebase Firestore로 토큰 전송
  sendTokenToFirestore(token);

  // 토큰 갱신 감지
  FirebaseMessaging.instance.onTokenRefresh.listen((newToken) {
    print('🔄 New FCM Token: $newToken');
    sendTokenToFirestore(newToken);
  });

  runApp(const InventoryApp());
}

/// Firebase Firestore에 FCM 토큰 저장
Future<void> sendTokenToFirestore(String? token) async {
  if (token == null) return;

  try {
    // Firebase Firestore에 토큰 저장
    await FirebaseFirestore.instance.collection('fcm_tokens').doc(token).set({
      'token': token,
      'timestamp': FieldValue.serverTimestamp(), // 저장된 시간 기록
    });

    print('토큰 Firestore에 성공적으로 저장됨');
  } catch (e) {
    print('Firestore에 토큰 저장 중 에러 발생: $e');
  }
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
