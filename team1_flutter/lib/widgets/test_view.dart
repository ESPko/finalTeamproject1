import 'package:flutter/material.dart';

// TestView 라는 StatefulWidget 클래스 선언
class TestView extends StatefulWidget {
  const TestView({super.key});

  @override
  State<TestView> createState() => _TestViewState();
}

// TestView의 상태 클래스 (_TestViewState)
class _TestViewState extends State<TestView> with SingleTickerProviderStateMixin {
  TabController? _tabController; // 탭 전환을 제어하는 컨트롤러 (nullable로 선언)
  int _selectedIndex = 0; // 현재 선택된 탭 인덱스를 저장

  @override
  void initState() {
    super.initState();
    // TabController를 생성하여 3개의 탭을 관리함
    _tabController = TabController(length: 3, vsync: this);

    // 탭 전환 시 _selectedIndex를 현재 탭 인덱스로 갱신
    _tabController!.addListener(() => setState(() => _selectedIndex = _tabController!.index));
  }

  @override
  void dispose() {
    // 위젯이 dispose될 때, 컨트롤러도 메모리에서 해제
    _tabController?.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // 앱 상단의 앱바
      appBar: AppBar(
        title: Text("Test Title"), // 앱바 제목
      ),

      // 하단 네비게이션 바 역할을 하는 TabBar
      bottomNavigationBar: SizedBox(
        height: 80, // 탭바 높이 설정 → 수치 변경 예: 60으로 바꾸면 탭바가 더 얇아짐
        child: TabBar(
          indicatorColor: Colors.transparent, // 탭 선택 시 표시되는 선 제거
          labelColor: Colors.black, // 선택된 탭 텍스트/아이콘 색상

          controller: _tabController, // 위에서 정의한 TabController 사용
          tabs: <Widget>[
            // 첫 번째 탭: Friends
            Tab(
              icon: Icon(
                // 선택된 인덱스가 0이면 꽉 찬 아이콘, 아니면 테두리 아이콘
                _selectedIndex == 0 ? Icons.person : Icons.person_2_outlined,
              ),
              text: "Friends", // 탭 텍스트
            ),

            // 두 번째 탭: Chats
            Tab(
              icon: Icon(
                _selectedIndex == 1 ? Icons.chat : Icons.chat_outlined,
              ),
              text: "Chats",
            ),

            // 세 번째 탭: Settings
            Tab(
              icon: Icon(
                _selectedIndex == 2 ? Icons.settings : Icons.settings_outlined,
              ),
              text: "Settings",
            ),
          ],
        ),
      ),

      // 탭에 따라 다른 내용을 보여주는 body 부분
      body: _selectedIndex == 0
          ? tabContainer(context, Colors.indigo, "Friends Tab") // 첫 번째 탭: 보라색 배경
          : _selectedIndex == 1
          ? tabContainer(context, Colors.amber[600] ?? Colors.amber, "Chats Tab") // 두 번째 탭: 노란 배경
          : tabContainer(context, Colors.blueGrey, "Settings Tab"), // 세 번째 탭: 회색 배경
    );
  }

  // 각 탭에서 보여줄 컨테이너 위젯 생성 함수
  Container tabContainer(BuildContext context, Color tabColor, String tabText) {
    return Container(
      width: MediaQuery.of(context).size.width, // 현재 화면의 너비
      height: MediaQuery.of(context).size.height, // 현재 화면의 높이
      color: tabColor, // 배경 색 설정
      child: Center(
        child: Text(
          tabText, // 텍스트 출력
          style: TextStyle(
            color: Colors.white, // 텍스트 색상
          ),
        ),
      ),
    );
  }
}
