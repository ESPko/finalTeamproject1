import 'package:dio/dio.dart';
import '../models/item.dart';

class ApiService {
  final String baseUrl = 'http://10.100.203.16:8080/api/items'; // 백엔드 API 기본 주소
  final Dio dio = Dio(); // Dio 인스턴스를 통해 HTTP 요청 수행

  // ✅ 전체 아이템 목록 조회
  Future<List<Item>> fetchItems() async {
    try {
      final response = await dio.get(baseUrl); // GET 요청으로 전체 아이템 요청

      if (response.statusCode == 200) {
        List<dynamic> data = response.data; // 응답 받은 JSON 데이터
        return data
            .map((item) => Item.fromJson(item))
            .toList(); // JSON → Item 변환
      } else {
        throw Exception('아이템을 불러오는 데 실패했습니다');
      }
    } catch (e) {
      throw Exception('아이템을 불러오는 데 실패했습니다: $e');
    }
  }

  // ✅ ID로 특정 아이템 조회
  Future<Item> fetchItemById(String itemId) async {
    try {
      final response = await dio.get('$baseUrl/$itemId'); // `/items/아이디` 요청

      if (response.statusCode == 200) {
        return Item.fromJson(response.data);
      } else {
        throw Exception('아이템을 불러오는 데 실패했습니다');
      }
    } catch (e) {
      throw Exception('아이템을 불러오는 데 실패했습니다: $e');
    }
  }

  // ✅ 새로운 아이템 추가 (POST 요청)
  Future<Item> createItem(Item item) async {
    try {
      final response = await dio.post(
        baseUrl,
        data: item.toJson(), // Item → JSON 형태로 전송
        options: Options(
          headers: {'Content-Type': 'application/json'},
        ),
      );

      if (response.statusCode == 201) {
        return Item.fromJson(response.data); // 생성된 아이템 반환
      } else {
        throw Exception('아이템을 생성하는 데 실패했습니다');
      }
    } catch (e) {
      throw Exception('아이템을 생성하는 데 실패했습니다: $e');
    }
  }

// ✅ 수량을 입력받아 그만큼 차감하는 PATCH 요청
  Future<Item> dispatchItem(String itemId, int quantityToSubtract) async {
    try {
      final response = await dio.patch(
        '$baseUrl/$itemId/dispatch-quantity', // ✅ 백엔드 URL과 일치
        data: {
          'quantityToSubtract': quantityToSubtract, // ✅ 입력받은 수량만큼 차감
        },
        options: Options(
          headers: {'Content-Type': 'application/json'},
        ),
      );

      if (response.statusCode == 200) {
        return Item.fromJson(response.data); // 수정된 아이템 반환
      } else {
        throw Exception('아이템 수량을 차감하는 데 실패했습니다');
      }
    } catch (e) {
      if (e is DioError) {
        print('DioError: ${e.response?.data}');
        print('DioError: ${e.message}');
      }
      throw Exception('아이템 수량을 차감하는 데 실패했습니다: $e');
    }
  }
}
