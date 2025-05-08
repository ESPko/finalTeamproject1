// import 'package:http/http.dart' as http;
// import 'dart:convert';
//
// class AuthService {
//   static const String baseUrl = 'http://10.100.203.16:8080/api/login';  // API 서버 주소
//
//   Future<String?> login(String email, String password) async {
//     final response = await http.post(
//       Uri.parse(baseUrl),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: jsonEncode({
//         'username': email,
//         'password': password,
//       }),
//     );
//
//     if (response.statusCode == 200) {
//       // 로그인 성공 시 JWT 토큰을 받아옴
//       var data = jsonDecode(response.body);
//       return data['token'];  // 'token'은 로그인 API 응답에서 JWT를 받는 키값
//     } else {
//       throw Exception('로그인 실패: ${response.statusCode}');
//     }
//   }
// }
