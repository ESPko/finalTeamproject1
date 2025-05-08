import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/item.dart';
import '../models/user.dart'; // User 모델을 임포트합니다.

class ApiService {
  final String baseUrl = 'http://10.100.203.16:8080/';
  final Dio dio = Dio();

  // ✅ 로그인 기능
  Future<String?> login(String email, String password) async {
    try {
      final response = await dio.post(
        'http://10.100.203.16:8080/api/login',
        data: jsonEncode({
          'id': email,
          'pass': password,
        }),
        options: Options(headers: {'Content-Type': 'application/json'}),
      );

      if (response.statusCode == 200) {
        final data = response.data;
        String token = data['token'];
        // 로그인 성공 후 JWT 토큰을 저장하고 반환
        return token;
      } else {
        throw Exception('로그인 실패: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('로그인 실패: $e');
    }
  }

  // ✅ 전체 아이템 목록 조회
  Future<List<Item>> fetchItems() async {
    try {
      String? token = await getTokenFromSharedPreferences();
      if (token == null) {
        throw Exception('토큰이 없습니다. 로그인 후 시도해주세요.');
      }

      final response = await dio.get(
        'http://10.100.203.16:8080/api/items',
        options: Options(
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        ),
      );

      print('Response data: ${response.data}');
      if (response.statusCode == 200) {
        if (response.data == null) {
          throw Exception('아이템 목록이 비어 있습니다.');
        }

        if (response.data is String) {
          String decoded = response.data;
          List<dynamic> data = json.decode(decoded);
          return data.map((item) => Item.fromJson(item)).toList();
        } else {
          List<dynamic> data = response.data;
          return data.map((item) => Item.fromJson(item)).toList();
        }
      } else {
        throw Exception('아이템을 불러오는 데 실패했습니다: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('아이템을 불러오는 데 실패했습니다: $e');
    }
  }

  // ✅ 특정 아이템 ID로 조회
  Future<Item> fetchItemById(int itemId) async {
    try {
      String? token = await getTokenFromSharedPreferences();
      if (token == null) {
        throw Exception('토큰이 없습니다. 로그인 후 시도해주세요.');
      }

      final response = await dio.get(
        '$baseUrl/$itemId',
        options: Options(
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        ),
      );

      if (response.statusCode == 200) {
        return Item.fromJson(response.data);
      } else {
        throw Exception('아이템을 불러오는 데 실패했습니다: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('아이템을 불러오는 데 실패했습니다: $e');
    }
  }

  // ✅ 사용자 데이터 조회
  Future<User> fetchUser() async {
    try {
      String? token = await getTokenFromSharedPreferences();
      if (token == null) {
        throw Exception('토큰이 없습니다. 로그인 후 시도해주세요.');
      }

      final response = await dio.get(
        '$baseUrl/api/login',  // 실제로 사용자 데이터를 조회하는 API 주소로 수정해야 합니다.
        options: Options(
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        ),
      );

      if (response.statusCode == 200) {
        return User.fromJson(response.data);
      } else {
        throw Exception('사용자 데이터를 불러오는 데 실패했습니다: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('사용자 데이터를 불러오는 데 실패했습니다: $e');
    }
  }

  // 토큰 가져오기 함수
  Future<String?> getTokenFromSharedPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwt_token');
  }

  // ✅ 수량을 차감하는 PATCH 요청
  Future<Item> dispatchItem(String itemId, int quantityToSubtract, String token) async {
    try {
      final response = await dio.patch(
        '$baseUrl/$itemId/dispatch-quantity',
        data: {
          'quantityToSubtract': quantityToSubtract,
        },
        options: Options(headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $token', // 로그인 후 받은 토큰을 Authorization 헤더에 포함
        }),
      );

      if (response.statusCode == 200) {
        return Item.fromJson(response.data);
      } else {
        throw Exception('아이템 수량을 차감하는 데 실패했습니다: ${response.statusCode}');
      }
    } catch (e) {
      if (e is DioError) {
        print('DioError: ${e.response?.data}');
        print('DioError: ${e.message}');
      }
      throw Exception('아이템 수량을 차감하는 데 실패했습니다: $e');
    }
  }

  Future<User> getStoredUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');
    if (userJson == null) {
      throw Exception('저장된 사용자 정보가 없습니다.');
    }
    final userMap = json.decode(userJson);
    return User.fromJson(userMap);
  }
}
