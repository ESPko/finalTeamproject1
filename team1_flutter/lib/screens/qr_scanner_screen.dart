import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'confirm_dispatch_screen.dart'; // 모달 다이얼로그 파일

class QRScannerScreen extends StatefulWidget {
  const QRScannerScreen({super.key});

  @override
  State<QRScannerScreen> createState() => _QRScannerScreenState();
}

class _QRScannerScreenState extends State<QRScannerScreen> {
  final MobileScannerController controller = MobileScannerController();
  bool isScanned = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('QR 코드 스캔')),
      body: Stack(
        fit: StackFit.expand,
        children: [
          MobileScanner(
            controller: controller,
            onDetect: (capture) async {
              if (isScanned) return;

              final barcode = capture.barcodes.first;
              final url = barcode.rawValue;

              if (url == null || !url.startsWith('http')) return;

              setState(() => isScanned = true);

              if (!mounted) return;

              // 출고 다이얼로그 모달로 호출
              await showDialog(
                context: context,
                barrierDismissible: false, // 밖 터치로 닫히지 않도록
                builder: (_) => ConfirmDispatchDialog(qrUrl: url),
              );

              // 다시 스캔 허용
              setState(() => isScanned = false);
            },
          ),

          // 처리 중 화면
          if (isScanned)
            Container(
              color: Colors.black.withOpacity(0.5),
              child: const Center(
                child: Text(
                  '처리 중...',
                  style: TextStyle(color: Colors.white, fontSize: 18),
                ),
              ),
            ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    controller.dispose();
    super.dispose();
  }
}
