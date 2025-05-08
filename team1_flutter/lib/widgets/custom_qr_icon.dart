import 'package:flutter/material.dart';

class CustomQRIcon extends StatelessWidget {
  final double size;
  final Color color;

  const CustomQRIcon({super.key, this.size = 40, this.color = Colors.grey});

  @override
  Widget build(BuildContext context) {
    final double lineLength = size * 0.3;
    final double thickness = 2;

    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        children: [
          // 모서리 4개 선
          Positioned(top: 0, left: 0, child: Container(width: lineLength, height: thickness, color: color)),
          Positioned(top: 0, left: 0, child: Container(width: thickness, height: lineLength, color: color)),

          Positioned(top: 0, right: 0, child: Container(width: lineLength, height: thickness, color: color)),
          Positioned(top: 0, right: 0, child: Container(width: thickness, height: lineLength, color: color)),

          Positioned(bottom: 0, left: 0, child: Container(width: lineLength, height: thickness, color: color)),
          Positioned(bottom: 0, left: 0, child: Container(width: thickness, height: lineLength, color: color)),

          Positioned(bottom: 0, right: 0, child: Container(width: lineLength, height: thickness, color: color)),
          Positioned(bottom: 0, right: 0, child: Container(width: thickness, height: lineLength, color: color)),

          // 중앙의 가로선
          Align(
            alignment: Alignment.center,
            child: Container(
              width: size * 0.5,
              height: thickness,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}
