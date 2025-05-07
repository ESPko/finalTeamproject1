// import 'package:flutter/material.dart';
// import '../models/item.dart';
// import '../services/api_service.dart';
// import '../widgets/item_tile.dart';
//
// // 아이템 리스트 화면 (StatefulWidget)
// class ItemListScreen extends StatefulWidget {
//   const ItemListScreen({super.key});
//
//   @override
//   _ItemListScreenState createState() => _ItemListScreenState();
// }
//
// class _ItemListScreenState extends State<ItemListScreen> {
//   late Future<List<Item>> futureItems; // API로부터 받아올 아이템 리스트
//
//   @override
//   void initState() {
//     super.initState();
//     futureItems = ApiService().fetchItems(); // 초기 데이터 로딩
//   }
//
//   // 아이템 리스트를 새로 고침하는 함수
//   void refreshItems() {
//     setState(() {
//       futureItems = ApiService().fetchItems(); // API를 다시 호출하여 새로 고침
//     });
//   }
//
//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: const Text('아이템 목록'), // 상단 타이틀
//       ),
//       body: Padding(
//         padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16), // 화면 여백 설정
//         child: FutureBuilder<List<Item>>(
//           future: futureItems, // Future 데이터 지정
//           builder: (context, snapshot) {
//             // 데이터 로딩 중
//             if (snapshot.connectionState == ConnectionState.waiting) {
//               return const Center(child: CircularProgressIndicator());
//             }
//             // 에러 발생 시
//             else if (snapshot.hasError) {
//               return Center(
//                 child: Text(
//                   '에러 발생: ${snapshot.error}', // 에러 메시지 출력
//                   style: TextStyle(color: Colors.red.shade700),
//                   textAlign: TextAlign.center,
//                 ),
//               );
//             }
//             // 데이터가 비어있을 경우
//             else if (!snapshot.hasData || snapshot.data!.isEmpty) {
//               return const Center(
//                 child: Text(
//                   '아이템이 없습니다.',
//                   style: TextStyle(fontSize: 16, color: Colors.black54),
//                 ),
//               );
//             }
//             // 데이터가 존재하는 경우
//             else {
//               final items = snapshot.data!;
//
//               return ListView.separated(
//                 itemCount: items.length, // 아이템 개수만큼 반복
//                 separatorBuilder: (context, index) => const SizedBox(height: 12), // 아이템 간 간격 설정
//                 itemBuilder: (context, index) {
//                   final item = items[index];
//
//                   return GestureDetector(
//                     onTap: () async {
//                       // 상세 화면으로 이동 후 결과 받아오기
//                       final updatedItem = await Navigator.pushNamed(
//                         context,
//                         '/item_detail',
//                         arguments: item.idx, // 상세화면으로 ID 전달
//                       );
//
//                       if (updatedItem != null) {
//                         refreshItems(); // 돌아오면 새로고침
//                       }
//                     },
//                     child: Card(
//                       shape: RoundedRectangleBorder(
//                         borderRadius: BorderRadius.circular(12), // 모서리를 둥글게
//                       ),
//                       elevation: 4, // 그림자 효과
//                       margin: const EdgeInsets.symmetric(vertical: 8), // 카드 간격 설정
//                       child: Padding(
//                         padding: const EdgeInsets.all(16), // 카드 안쪽 여백
//                         child: ItemTile(item: item), // 실제 표시되는 아이템 타일
//                       ),
//                     ),
//                   );
//                 },
//               );
//             }
//           },
//         ),
//       ),
//     );
//   }
// }
