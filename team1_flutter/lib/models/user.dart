class User {
  final int idx;
  final String id;
  final String pass;
  final String nickName;
  final String department;
  final int position;

  // 생성자
  User({
    required this.idx,
    required this.id,
    required this.pass,
    required this.nickName,
    required this.department,
    required this.position,
  });

  // JSON을 User 객체로 변환
  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      idx: json['idx'],
      id: json['id'],
      pass: json['pass'],
      nickName: json['nickName'],
      department: json['department'],
      position: json['position'],
    );
  }

  // User 객체를 JSON으로 변환
  Map<String, dynamic> toJson() {
    return {
      'idx': idx,
      'id': id,
      'pass': pass,
      'nickName': nickName,
      'department': department,
      'position': position,
    };
  }
}
