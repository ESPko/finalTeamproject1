// import 'package:flutter/material.dart';
// import 'package:test2/screens/qr_scanner_screen.dart';
// import 'package:test2/screens/home_screen.dart';
// import 'package:test2/screens/item_list_screen.dart';
//
// // 앱의 메인 페이지로, 하단 네비게이션을 통해 여러 화면을 전환할 수 있음
// class MainPage extends StatefulWidget {
//   const MainPage({Key? key}) : super(key: key);
//
//   @override
//   State<MainPage> createState() => _MainPageState();
// }
//
// class _MainPageState extends State<MainPage> {
//   int _selectedIndex = 0; // 현재 선택된 탭의 인덱스 (기본값: 첫 번째 탭)
//
//   // 보여줄 화면 리스트 (홈, 리스트, 스캐너)
//   final List<Widget> _pages = [
//     const HomeScreen(),         // 인덱스 0
//     const ItemListScreen(),     // 인덱스 1
//     const QRScannerScreen(),    // 인덱스 2
//   ];
//
//   // 탭을 클릭했을 때 인덱스를 업데이트하는 함수
//   void _onItemTapped(int index) {
//     setState(() {
//       _selectedIndex = index; // 현재 선택된 페이지 인덱스를 변경
//     });
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       // 앱 상단에 표시되는 앱바
//       appBar: AppBar(
//         title: const Text('재고관리 앱'), // 타이틀 텍스트
//       ),
//
//       // 현재 선택된 인덱스에 해당하는 페이지를 화면에 보여줌
//       body: _pages[_selectedIndex],
//
//       // 하단 네비게이션 바 정의
//       bottomNavigationBar: BottomNavigationBar(
//         currentIndex: _selectedIndex, // 현재 활성화된 탭 인덱스
//         onTap: _onItemTapped, // 탭 클릭 시 실행할 함수
//
//         items: const <BottomNavigationBarItem>[
//           BottomNavigationBarItem(
//             icon: Icon(Icons.home), // 홈 아이콘
//             label: '홈', // 텍스트 라벨
//           ),
//           BottomNavigationBarItem(
//             icon: Icon(Icons.list), // 리스트 아이콘
//             label: '아이템 리스트',
//           ),
//           BottomNavigationBarItem(
//             icon: Icon(Icons.qr_code_scanner), // QR 스캐너 아이콘
//             label: 'QR 스캐너',
//           ),
//         ],
//       ),
//     );
//   }
// }
