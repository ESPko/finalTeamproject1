class Item {
  final int id; // 아이템의 고유 ID
  final String name; // 아이템의 이름
  final int quantity; // 아이템의 수량

  // 생성자: 아이템 객체를 생성할 때 필요한 값들을 받아서 초기화합니다.
  Item({required this.id, required this.name, required this.quantity});

  // JSON을 Item 객체로 변환하는 팩토리 생성자
  // 예를 들어, 서버에서 JSON 형태로 받은 데이터를 Item 객체로 변환할 때 사용됩니다.
  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      id: json['id'], // JSON에서 'id' 값을 가져와서 아이템의 id에 할당
      name: json['name'], // JSON에서 'name' 값을 가져와서 아이템의 name에 할당
      quantity: json['quantity'], // JSON에서 'quantity' 값을 가져와서 아이템의 quantity에 할당
    );
  }

  // Item 객체를 JSON으로 변환하는 메서드
  // 서버에 데이터를 전송할 때 또는 로컬 저장소에 저장할 때 사용됩니다.
  Map<String, dynamic> toJson() {
    return {
      'id': id, // 아이템의 id 값을 'id' 키로 JSON에 포함
      'name': name, // 아이템의 name 값을 'name' 키로 JSON에 포함
      'quantity': quantity, // 아이템의 quantity 값을 'quantity' 키로 JSON에 포함
    };
  }
}
