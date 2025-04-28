// import 'package:flutter/material.dart';
// import 'package:http/http.dart' as http;
// import 'package:velocity_x/velocity_x.dart'; // velocity_x는 텍스트 꾸미기나 박스 레이아웃을 쉽게 도와줌
//
// class HomeScreen extends StatelessWidget {
//   const HomeScreen({super.key});
//
//   // QR 코드 스캔 결과를 처리하는 함수
//   Future<void> _handleScannedResult(BuildContext context, String result) async {
//     // 스캔 결과가 URL 형식일 경우 PATCH 요청
//     if (result.startsWith('http')) {
//       try {
//         final response = await http.patch(Uri.parse(result));
//         if (response.statusCode == 200) {
//           // 성공 시 스낵바로 알림
//           ScaffoldMessenger.of(context).showSnackBar(
//             const SnackBar(content: Text('아이템이 출고되었습니다.')),
//           );
//         } else {
//           ScaffoldMessenger.of(context).showSnackBar(
//             SnackBar(content: Text('출고 실패 (코드: ${response.statusCode})')),
//           );
//         }
//       } catch (e) {
//         ScaffoldMessenger.of(context).showSnackBar(
//           SnackBar(content: Text('요청 실패: $e')),
//         );
//       }
//     } else {
//       // URL이 아닐 경우 단순히 스캔된 문자열 출력
//       ScaffoldMessenger.of(context).showSnackBar(
//         SnackBar(content: Text('스캔된 ID: $result')),
//       );
//     }
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(), // 타이틀 없는 빈 AppBar
//       body: Padding(
//         padding: const EdgeInsets.all(24), // 전체 패딩
//         child: Column(
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//
//             // 아이템 목록 보기 카드 버튼
//             _buildCardButton(
//               context,
//               icon: Icons.list_alt,
//               label: '아이템 목록 보기',
//               subLabel: '전체 재고',
//               onTap: () => Navigator.pushNamed(context, '/items'),
//             ),
//
//             const SizedBox(height: 16), // 카드 간 간격
//
//             // QR 출고 카드 버튼
//             _buildCardButton(
//               context,
//               icon: Icons.qr_code_scanner,
//               label: 'QR 코드로 출고하기',
//               subLabel: 'QR 출고',
//               onTap: () async {
//                 final result = await Navigator.pushNamed(context, '/scan');
//                 if (result != null && result is String) {
//                   debugPrint('스캔된 결과: $result');
//                   _handleScannedResult(context, result); // 처리
//                 }
//               },
//             ),
//           ],
//         ),
//       ),
//     );
//   }
//
//   // 카드 버튼 위젯 생성 함수
//   Widget _buildCardButton(
//       BuildContext context, {
//         required IconData icon,
//         required String label,
//         required String subLabel,
//         required VoidCallback onTap,
//       }) {
//     return InkWell(
//       onTap: onTap, // 탭 시 onTap 실행
//       borderRadius: BorderRadius.circular(10), // 터치 영역 모서리 둥글게
//       child: Container(
//         height: 130, // 카드 높이 설정 (예: 100으로 줄이면 더 작아짐)
//         child: Card(
//           elevation: 5, // 카드 그림자 깊이 (0으로 하면 그림자 없음)
//           shape: RoundedRectangleBorder(
//             borderRadius: BorderRadius.circular(10), // 카드 둥근 모서리
//           ),
//           child: Stack(
//             children: [
//               // 카드 본문 내용
//               Padding(
//                 padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 14),
//                 child: Column(
//                   mainAxisAlignment: MainAxisAlignment.center, // 수직 정렬
//                   crossAxisAlignment: CrossAxisAlignment.start, // 좌측 정렬
//                   children: [
//                     // 상단 서브 라벨 (velocity_x 사용)
//                     subLabel.text
//                         .size(20) // 글자 크기
//                         .bold // 굵은 글씨
//                         .make()
//                         .pOnly(left: 16) // 왼쪽 패딩
//                         .pOnly(bottom: 8), // 하단 패딩
//
//                     // 메인 라벨 + 아이콘
//                     Row(
//                       children: [
//                         Icon(icon, color: Colors.black54, size: 24), // 아이콘 크기 조절 가능
//                         const SizedBox(width: 12), // 간격 조절
//                         label.text.fontWeight(FontWeight.w500).make(), // 레이블 텍스트 스타일링
//                       ],
//                     ).pOnly(left: 16),
//                   ],
//                 ),
//               ),
//
//               // 우측 화살표 아이콘
//               Align(
//                 alignment: Alignment.centerRight, // 오른쪽 정렬
//                 child: Padding(
//                   padding: const EdgeInsets.only(right: 16),
//                   child: Icon(Icons.arrow_forward_ios, size: 16, color: Colors.black38),
//                 ),
//               ),
//             ],
//           ),
//         ),
//       ),
//     );
//   }
//
// }
