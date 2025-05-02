// 상세 페이지
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ProductDetailPage extends StatelessWidget {
  final Map<String, dynamic> product;

  const ProductDetailPage({Key? key, required this.product}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('${product['name']} 상세정보'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('제품명: ${product['name']}', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            SizedBox(height: 10),
            Text('매입회사: ${product['company']}', style: TextStyle(fontSize: 18)),
            SizedBox(height: 10),
            Text('현재재고: ${product['currentStock']}', style: TextStyle(fontSize: 18)),
            SizedBox(height: 10),
            Text('적정재고: ${product['optimalStock']}', style: TextStyle(fontSize: 18)),
          ],
        ),
      ),
    );
  }
}
