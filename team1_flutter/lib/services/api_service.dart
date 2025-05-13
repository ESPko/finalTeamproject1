import 'dart:convert';
import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/item.dart';
import '../models/item_history.dart';
import '../models/user.dart'; // User 모델을 임포트합니다.

class ApiService {
  final String baseUrl = 'http://10.100.203.16:8080';
  final Dio dio = Dio();

  // ✅ 로그인 기능
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await dio.post(
        '$baseUrl/api/login',
        data: jsonEncode({
          'id': email,
          'pass': password,
        }),
        options: Options(headers: {'Content-Type': 'application/json'}),
      );

      if (response.statusCode == 200) {
        final data = response.data;
        String token = data['token'];
        Map<String, dynamic> user = data['user'];
        return {
          'token': token,
          'user': user,
        };
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

      // print('Response data: ${response.data}');
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
        '$baseUrl/api/items/$itemId',
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

  // ✅ 사용자 정보 가져오기
  Future<User> getStoredUser() async {
    final prefs = await SharedPreferences.getInstance();
    final userJson = prefs.getString('user');
    if (userJson == null) {
      throw Exception('저장된 사용자 정보가 없습니다.');
    }
    final userMap = json.decode(userJson);
    final user = User.fromJson(userMap);

    print("저장된 사용자 userId: ${user.id}"); // 저장된 사용자 userId 로그 출력
    return user;
  }


  // 토큰 가져오기 함수
  Future<String?> getTokenFromSharedPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwt_token');
  }

  // ✅ 아이템 수량 차감
  Future<Item> dispatchItem(String itemId, int quantityToSubtract, String token) async {
    try {
      // 로그인된 사용자 정보 가져오기
      User user = await getStoredUser();
      print("로그인된 사용자 userId: ${user.id}"); // userId 로그 출력

      // API 요청
      final response = await dio.patch(
        '$baseUrl/api/items/$itemId/dispatch-quantity',
        data: {
          'quantityToSubtract': quantityToSubtract,
          'userId': user.id, // 로그인된 사용자의 userId 포함
        },
        options: Options(
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer $token', // 로그인 후 받은 토큰을 Authorization 헤더에 포함
          },
        ),
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

  // ✅ 출고 내역 조회
  Future<List<ItemHistory>> fetchItemHistory(String token) async {
    try {
      final response = await dio.get(
        '$baseUrl/api/items/getShipmentDetails',  // 출고 내역을 조회하는 엔드포인트
        options: Options(
          headers: {
            'Authorization': 'Bearer $token', // JWT 토큰을 Authorization 헤더에 포함
            'Content-Type': 'application/json',
          },
        ),
      );

      print('📡 응답 코드: ${response.statusCode}');
      print('📦 응답 내용: ${response.data}');

      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data.map((history) => ItemHistory.fromJson(history)).toList(); // ItemHistory로 변환
      } else {
        throw Exception('출고 내역을 불러오는 데 실패했습니다: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('출고 내역을 불러오는 데 실패했습니다: $e');
    }
  }

  Future<Map<String, dynamic>> fetchTransactionSummary() async {
    try {
      String? token = await getTokenFromSharedPreferences();
      if (token == null) {
        throw Exception('토큰이 없습니다. 로그인 후 시도해주세요.');
      }

      final response = await dio.get(
        '$baseUrl/api/items/summary',
        options: Options(
          headers: {
            'Authorization': 'Bearer $token',
            'Content-Type': 'application/json',
          },
        ),
      );

      if (response.statusCode == 200) {
        if (response.data is String) {
          // 혹시 JSON이 문자열로 올 경우 파싱
          return jsonDecode(response.data);
        } else if (response.data is Map<String, dynamic>) {
          return response.data;
        } else {
          throw Exception('알 수 없는 응답 형식입니다.');
        }
      } else {
        throw Exception('입출고 요약 정보를 불러오지 못했습니다: ${response.statusCode}');
      }
    } catch (e) {
      throw Exception('입출고 요약 정보 요청 실패: $e');
    }
  }


}