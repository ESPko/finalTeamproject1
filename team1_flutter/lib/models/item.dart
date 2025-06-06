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
  final String warehouseLocation;

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
    required this.warehouseLocation,
  });

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      idx: json['idx'] ?? 0, // null이면 0으로 처리
      code: json['code'] ?? '', // null이면 빈 문자열로 처리
      name: json['name'] ?? '', // null이면 빈 문자열로 처리
      category: json['category'] ?? '', // null이면 빈 문자열로 처리
      vendorName: json['vendorName'] ?? '', // null이면 빈 문자열로 처리
      warehouseName: json['warehouseName'] ?? '', // null이면 빈 문자열로 처리
      quantity: json['quantity'] ?? 0, // null이면 0으로 처리
      standard: json['standard'] ?? 0, // null이면 0으로 처리
      qr: json['qr'] ?? '', // null이면 빈 문자열로 처리
      approve: json['approve'] ?? 0, // null이면 0으로 처리
      price: json['price'] ?? 0, // null이면 0으로 처리
      image: json['image'] ?? '', // null이면 빈 문자열로 처리
      time: json['time'] != null ? DateTime.parse(json['time']) : DateTime.now(), // null이면 현재 시간으로 처리
      warehouseLocation: json['warehouseLocation'] ?? '', // null이면 빈 문자열로 처리
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
      'warehouseLocation': warehouseLocation,
    };
  }
}
