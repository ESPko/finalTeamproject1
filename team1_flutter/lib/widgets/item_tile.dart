import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart'; // QR 코드 생성 패키지
import 'package:test2/screens/ItemDetailScreen.dart'; // 아이템 상세 화면
import '../models/item.dart'; // Item 모델 클래스 import

// 아이템 하나를 나타내는 위젯
class ItemTile extends StatelessWidget {
  final Item item; // 전달받은 Item 객체

  // 생성자 - 필수 파라미터 item을 받음
  const ItemTile({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    return Container(
      // 외부 마진: 위아래 6, 좌우 10
      margin: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      // 내부 패딩: 전체 12
      padding: const EdgeInsets.all(12),
      // 박스 스타일 정의 (모서리, 배경색, 그림자)
      decoration: BoxDecoration(
        color: Colors.white, // 배경색 흰색
        borderRadius: BorderRadius.circular(8), // 둥근 모서리 (8)
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.05), // 약한 그림자 색
            blurRadius: 5, // 흐림 정도 → 더 크면 그림자가 더 퍼짐
            offset: const Offset(0, 2), // 그림자 위치 (x:0, y:2)
          ),
        ],
      ),
      // 내부 내용 구성
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start, // 왼쪽 정렬
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.center, // 수직 중앙 정렬
            children: [
              Expanded(
                // ListTile로 이름과 수량 표시
                child: ListTile(
                  title: Text(
                    item.name, // 아이템 이름 표시
                    style: const TextStyle(
                      fontSize: 18, // 글자 크기
                      fontWeight: FontWeight.bold, // 굵게
                    ),
                  ),
                  subtitle: Text('수량: ${item.quantity}'), // 수량 표시
                  onTap: () {
                    // 탭 시 상세 페이지로 이동
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => ItemDetailScreen(itemId: item.idx.toString()), // 아이템 ID 전달
                      ),
                    );
                  },
                ),
              ),
              const SizedBox(width: 10), // 아이콘과 QR 사이 여백
              // QR 코드 생성기
    QrImageView(
    data: 'http://10.100.203.16:8080/api/items/${item.idx}/dispatch-quantity', // <- 수정된 경로
    version: QrVersions.auto,
    size: 80.0,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
