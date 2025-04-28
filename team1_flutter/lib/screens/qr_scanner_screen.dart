import 'package:flutter/material.dart';
import 'package:http/http.dart' as http; // HTTP 통신을 위한 패키지
import 'dart:convert'; // JSON 디코딩용
import 'package:mobile_scanner/mobile_scanner.dart'; // QR 코드 스캐너 패키지

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  final MobileScannerController controller = MobileScannerController(); // 스캐너 컨트롤러
  bool isScanned = false; // 중복 스캔 방지를 위한 상태

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('QR 코드 스캔'), // 상단 제목
      ),
      body: Stack(
        fit: StackFit.expand, // 전체 화면에 맞춤
        children: [
          MobileScanner(
            controller: controller, // 스캐너 컨트롤러 연결
            onDetect: (capture) async {
              if (isScanned) return; // 이미 스캔했다면 중단

              final barcode = capture.barcodes.first; // 첫 번째 바코드 데이터
              final url = barcode.rawValue; // QR 코드 데이터 (URL 형태)

              if (url == null || !url.startsWith('http')) return; // 유효한 URL이 아니면 종료

              setState(() => isScanned = true); // 스캔 플래그 true 설정

              try {
                final response = await http.patch(Uri.parse(url)); // PATCH 요청

                if (response.statusCode == 200) {
                  // 응답 성공 시
                  final responseBody = utf8.decode(response.bodyBytes); // 한글 깨짐 방지
                  final item = json.decode(responseBody); // JSON 파싱
                  final itemName = item['name']; // 아이템 이름
                  final quantity = item['quantity']; // 남은 수량

                  if (!mounted) return;

                  await showDialog(
                    context: context,
                    builder: (_) => AlertDialog(
                      title: const Text('출고 완료'),
                      content: Text(
                        '$itemName 을(를) 출고했습니다.\n남은 수량: $quantity',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                      actions: [
                        TextButton(
                          onPressed: () => Navigator.of(context).popUntil((route) => route.isFirst),
                          child: const Text('확인'),
                        ),
                      ],
                    ),
                  );
                } else {
                  throw Exception('서버 오류 (${response.statusCode})');
                }
              } catch (e) {
                // 오류 발생 시
                if (!mounted) return;

                await showDialog(
                  context: context,
                  builder: (_) => AlertDialog(
                    title: const Text('오류 발생'),
                    content: Text(
                      '출고에 실패했습니다.\n\n$e',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    actions: [
                      TextButton(
                        onPressed: () {
                          Navigator.of(context).pop(); // 다이얼로그 닫기
                          setState(() => isScanned = false); // 다시 스캔 허용
                        },
                        child: const Text('닫기'),
                      ),
                    ],
                  ),
                );
              }
            },
          ),

          // 처리 중 메시지 표시
          if (isScanned)
            Container(
              color: Colors.black.withOpacity(0.5), // 반투명 배경
              child: const Center(
                child: Text(
                  '처리 중...',
                  style: TextStyle(color: Colors.white, fontSize: 18), // 메시지 스타일
                ),
              ),
            ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    controller.dispose(); // 스캐너 종료
    super.dispose();
  }
}
