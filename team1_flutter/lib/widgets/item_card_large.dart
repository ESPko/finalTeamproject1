// widgets/item_card_large.dart

import 'package:flutter/material.dart';
import '../models/item.dart';
import '../screens/item_detail_screen.dart';

class ItemCardLarge extends StatelessWidget {
  final Item item;

  const ItemCardLarge({super.key, required this.item});

  @override
  Widget build(BuildContext context) {
    final bool isStockLow = item.quantity < item.standard;

    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => ItemDetailScreen(itemId: item.idx)),
        );
      },
      child: Container(
        width: double.infinity,
        margin: const EdgeInsets.only(bottom: 16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [BoxShadow(color: Colors.grey.withOpacity(0.3), blurRadius: 10, offset: Offset(0, 5))],
        ),
        child: Row(
          children: [
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(color: Colors.grey[300], borderRadius: BorderRadius.circular(10)),
              child: item.image.isNotEmpty
                  ? Image.network(item.image, fit: BoxFit.cover)
                  : const Icon(Icons.image, size: 40, color: Colors.white),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(item.name, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  const SizedBox(height: 4),
                  Text(item.vendorName, style: const TextStyle(fontSize: 16, color: Colors.black54)),
                ],
              ),
            ),
            Column(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                const SizedBox(height: 8),
                Text('현재재고 ${item.quantity}', style: const TextStyle(fontSize: 14, color: Colors.black87)),
                Text(
                  '적정재고 ${item.standard}',
                  style: TextStyle(fontSize: 14, color: isStockLow ? Colors.red : Colors.black87),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
