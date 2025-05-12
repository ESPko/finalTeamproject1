import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../models/item_history.dart'; // ItemHistory 모델 임포트
import '../services/api_service.dart'; // ApiService 임포트

class HistoryScreen extends StatefulWidget {
  final String? itemId; // 특정 아이템의 이력을 볼 때 ID 전달

  const HistoryScreen({Key? key, this.itemId}) : super(key: key);

  @override
  _HistoryScreenState createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  bool _isLoading = true;
  List<ItemHistory> _histories = []; // ItemHistory 객체 리스트로 변경

  @override
  void initState() {
    super.initState();
    _loadHistories();
  }

  Future<void> _loadHistories() async {
    try {
      String? token = await ApiService().getTokenFromSharedPreferences(); // 토큰 가져오기

      if (token == null) {
        throw Exception('로그인 상태가 아닙니다.');
      }

      // 출고 내역을 API에서 가져옵니다.
      List<ItemHistory> histories = await ApiService().fetchItemHistory(token);
      print('가져온 출고 이력 개수: ${histories.length}');
      histories.forEach((h) => print(h.itemName));

      setState(() {
        // 아이템 ID가 있으면 필터링
        if (widget.itemId != null) {
          histories = histories.where((h) => h.itemName == widget.itemId).toList();
        }

        // 날짜 기준으로 정렬
        histories.sort((a, b) => b.releaseDate.compareTo(a.releaseDate));

        _histories = histories;
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _isLoading = false;
        print('❌ 에러 발생: $e');
      });
      // 에러 처리 (예: 에러 메시지 출력)
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('데이터를 불러오는 데 실패했습니다.')));
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.itemId != null ? '아이템 이력' : '전체 이력'),
        elevation: 0,
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : _histories.isEmpty
          ? Center(child: Text('이력이 없습니다.'))
          : ListView.builder(
        itemCount: _histories.length,
        itemBuilder: (context, index) {
          final history = _histories[index];

          // 이전 이력과 날짜가 다르면 날짜 구분선 표시
          bool showDateHeader = index == 0 ||
              !_isSameDay(_histories[index].releaseDate, _histories[index - 1].releaseDate);

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (showDateHeader)
                Padding(
                  padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
                  child: Text(
                    _formatDate(history.releaseDate),
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      color: Colors.grey[700],
                    ),
                  ),
                ),
              Card(
                margin: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // 비품 이미지 표시 (history.image: 비품 이미지 URL 또는 로컬 이미지)
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // 비품 이미지 (아이템에 이미지가 있을 경우)
                          if (history.image != null)
                            ClipRRect(
                              borderRadius: BorderRadius.circular(8),
                              child: Image.network(
                                history.image!, // history.image URL로 이미지 로드
                                width: 40,
                                height: 40,
                                fit: BoxFit.cover,
                              ),
                            )
                          else
                            Container(
                              padding: EdgeInsets.all(8),
                              decoration: BoxDecoration(
                                color: Colors.grey, // 기본 색상으로 설정
                                shape: BoxShape.circle,
                              ),
                              child: Icon(
                                Icons.history, // 기본 아이콘
                                color: Colors.white,
                                size: 16,
                              ),
                            ),
                          SizedBox(width: 12),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                // 아이템 이름
                                Text(
                                  history.itemName,
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                                SizedBox(height: 4),
                                // 수량 정보
                                Text(
                                  '현재 재고: ${history.quantity} / 출고 수량: ${history.releasedQuantity}',
                                  style: TextStyle(
                                    color: Colors.grey[700],
                                    fontSize: 14,
                                  ),
                                ),
                                // 창고 및 공급업체 정보
                                Text(
                                  '출고장소: ${history.warehouseName}, 공급업체: ${history.vendorName}',
                                  style: TextStyle(
                                    color: Colors.grey[700],
                                    fontSize: 14,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      Divider(height: 24),
                      // 사용자 및 시간 정보
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            '사용자: ${history.userId}',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey[600],
                            ),
                          ),
                          Text(
                            '출고시간: ${_formatTime(history.releaseDate)}',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey[600],
                            ),
                          ),
                          Text(
                            _formatDate(history.releaseDate),
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey[600],
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  bool _isSameDay(DateTime date1, DateTime date2) {
    return date1.year == date2.year &&
        date1.month == date2.month &&
        date1.day == date2.day;
  }

  String _formatDate(DateTime date) {
    return '${date.year}년 ${date.month}월 ${date.day}일';
  }

  String _formatTime(DateTime date) {
    return '${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
  }
}
