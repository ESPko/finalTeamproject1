// import 'user.dart';  // User 클래스를 정의한 파일을 import 해야 합니다.
//
//
// class LoginResponse {
//   final String token;
//   final User user;
//
//   // 생성자
//   LoginResponse({
//     required this.token,
//     required this.user,
//   });
//
//   // JSON을 LoginResponse 객체로 변환
//   factory LoginResponse.fromJson(Map<String, dynamic> json) {
//     return LoginResponse(
//       token: json['token'],
//       user: User.fromJson(json['user']),
//     );
//   }
//
//   // LoginResponse 객체를 JSON으로 변환
//   Map<String, dynamic> toJson() {
//     return {
//       'token': token,
//       'user': user.toJson(),
//     };
//   }
// }
