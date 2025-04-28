import 'package:flutter/material.dart';

void main() {
  runApp(MyApp()); // 앱 실행 시 MyApp 위젯이 가장 먼저 실행됨
}

// 앱의 루트 위젯
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: CardViewScreen(), // 첫 화면을 CardViewScreen으로 지정
    );
  }
}

// 카드 UI가 있는 화면
class CardViewScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('직사각형 카드 구현'), // 앱바에 표시될 제목
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0), // 바깥쪽 여백 (전체 16픽셀)
          child: Container(
            width: 350, // 카드의 가로 길이 (화면 크기에 따라 조정 가능)
            height: 180, // 카드의 세로 길이
            decoration: BoxDecoration(
              color: Colors.white, // 카드 배경색 흰색
              borderRadius: BorderRadius.circular(20), // 모서리를 둥글게 만듦 (반지름 20)
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withOpacity(0.2), // 그림자 색상 및 투명도 설정
                  blurRadius: 10, // 그림자의 퍼짐 정도
                  offset: Offset(0, 5), // 그림자의 위치 (x: 0, y: 5 아래로)
                ),
              ],
            ),
            child: Padding(
              padding: const EdgeInsets.all(16.0), // 카드 내부 여백
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center, // 세로 방향 가운데 정렬
                crossAxisAlignment: CrossAxisAlignment.start, // 가로 방향 왼쪽 정렬
                children: [
                  Text(
                    '카드 제목', // 카드 제목 텍스트
                    style: TextStyle(
                      fontSize: 20, // 글자 크기
                      fontWeight: FontWeight.bold, // 글자 굵기
                    ),
                  ),
                  SizedBox(height: 8), // 제목과 내용 사이 여백
                  Text(
                    '이것은 흰색 배경의 가로가 긴 직사각형 카드입니다. 귀퉁이가 둥글게 처리되었습니다.',
                    style: TextStyle(fontSize: 16, color: Colors.black54), // 본문 스타일
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
