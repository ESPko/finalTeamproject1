class Item {
  final int idx; // 고유 식별자
  final String code; // 품목 코드
  final String name; // 품목 이름
  final String category; // 카테고리
  final String vendorName; // 공급처 이름
  final String warehouseName; // 창고 이름
  final int quantity; // 수량
  final int standard; // 규격
  final String qr; // QR 코드 문자열
  final int approve; // 승인 여부 (0 또는 1)
  final int price; // 가격
  final String image; // 이미지 URL
  final DateTime time; // 등록 시간

  Item({
    required this.idx,
    required this.code,
    required this.name,
    required this.category,
    required this.vendorName,
    required this.warehouseName,
    required this.quantity,
    required this.standard,
    required this.qr,
    required this.approve,
    required this.price,
    required this.image,
    required this.time,
  });

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      idx: json['idx'],
      code: json['code'],
      name: json['name'],
      category: json['category'],
      vendorName: json['vendorName'],
      warehouseName: json['warehouseName'],
      quantity: json['quantity'],
      standard: json['standard'],
      qr: json['qr'],
      approve: json['approve'],
      price: json['price'],
      image: json['image'],
      time: DateTime.parse(json['time']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'idx': idx,
      'code': code,
      'name': name,
      'category': category,
      'vendorName': vendorName,
      'warehouseName': warehouseName,
      'quantity': quantity,
      'standard': standard,
      'qr': qr,
      'approve': approve,
      'price': price,
      'image': image,
      'time': time.toIso8601String(),
    };
  }
}
