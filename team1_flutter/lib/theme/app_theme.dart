import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart'; // 구글 폰트 사용을 위한 패키지

// 앱 전반에서 사용할 라이트 테마 정의
class AppTheme {
  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true, // Material 3 디자인 시스템 사용
      brightness: Brightness.light, // 밝은 테마 설정

      scaffoldBackgroundColor: const Color(0xFFF9FAFB), // 전체 배경색 (연한 회색)

      textTheme: GoogleFonts.notoSansKrTextTheme().copyWith(
        bodyMedium: const TextStyle(color: Colors.black87), // 기본 본문 텍스트 색상 조정
      ),

      primaryColor: Colors.black, // 주요 색상 (버튼 등에서 사용)

      colorScheme: ColorScheme.light(
        primary: Colors.black, // 기본 색상
        secondary: Colors.grey[600]!, // 보조 색상
        background: const Color(0xFFF9FAFB), // 배경색
      ),

      // 앱바 테마
      appBarTheme: const AppBarTheme(
        backgroundColor: Colors.white, // 앱바 배경 흰색
        foregroundColor: Colors.black, // 앱바 텍스트 및 아이콘 색상
        centerTitle: true, // 제목을 중앙에 정렬
        elevation: 0, // 앱바 그림자 깊이 (0이면 그림자 없음)
        titleTextStyle: TextStyle(
          fontSize: 18, // 제목 글자 크기
          fontWeight: FontWeight.w600, // 제목 글자 두께
          color: Colors.black, // 제목 색상
        ),
      ),

      // ElevatedButton 테마
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: Colors.black, // 배경색
          foregroundColor: Colors.white, // 텍스트 색상
          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12), // 버튼 안 여백
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(8), // 버튼 모서리 둥글기
          ),
          textStyle: const TextStyle(fontWeight: FontWeight.w600), // 텍스트 굵기
        ),
      ),

      // OutlinedButton 테마
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          side: const BorderSide(color: Colors.black), // 테두리 색상
          foregroundColor: Colors.black, // 텍스트 색상
          padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
          textStyle: const TextStyle(fontWeight: FontWeight.w500),
        ),
      ),

      // TextField 입력창 스타일
      inputDecorationTheme: InputDecorationTheme(
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(6), // 입력창 테두리 둥글기
          borderSide: const BorderSide(color: Colors.black12), // 테두리 색상
        ),
        filled: true, // 배경 채움 여부
        fillColor: Colors.white, // 배경색
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 14), // 입력창 안 여백
        labelStyle: const TextStyle(color: Colors.black54), // 라벨 텍스트 스타일
      ),

      // 카드 위젯 스타일
      cardTheme: CardTheme(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)), // 모서리 둥글기
        margin: const EdgeInsets.symmetric(vertical: 10, horizontal: 12), // 카드 간 여백
        elevation: 1.5, // 그림자 깊이
        color: Colors.white, // 카드 배경색
      ),

      // 스낵바 (하단 메시지) 스타일
      snackBarTheme: const SnackBarThemeData(
        backgroundColor: Colors.black, // 배경색
        contentTextStyle: TextStyle(color: Colors.white), // 텍스트 색상
        behavior: SnackBarBehavior.floating, // 둥둥 뜨는 스타일
      ),
    );
  }
}
