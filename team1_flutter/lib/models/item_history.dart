class ItemHistory {
  final int itemId;               // 아이템 ID
  final String itemName;          // 아이템 이름
  final String userId;            // 사용자 ID
  final int quantity;             // 출고 수량
  final int releasedQuantity;     // 출고된 수량
  final String warehouseName;     // 창고 이름
  final String vendorName;        // 공급업체 이름
  final DateTime releaseDate;     // 출고 날짜
  final String image;

  ItemHistory({
    required this.itemId,
    required this.itemName,
    required this.userId,
    required this.quantity,
    required this.releasedQuantity,
    required this.warehouseName,
    required this.vendorName,
    required this.releaseDate,
    required this.image,
  });

  // JSON에서 ItemHistory 객체로 변환하는 팩토리 메서드
  factory ItemHistory.fromJson(Map<String, dynamic> json) {
    return ItemHistory(
      itemId: json['itemId'],
      itemName: json['itemName'],
      userId: json['userId'],
      quantity: json['quantity'],
      releasedQuantity: json['releasedQuantity'],
      warehouseName: json['warehouseName'],
      vendorName: json['vendorName'],
      releaseDate: DateTime.parse(json['releaseDate']),  // 날짜를 DateTime으로 변환
      image: json['image'],
    );
  }
}
