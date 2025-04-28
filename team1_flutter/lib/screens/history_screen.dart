import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class HistoryScreen extends StatefulWidget {
  final String? itemId; // 특정 아이템의 이력을 볼 때 ID 전달

  const HistoryScreen({Key? key, this.itemId}) : super(key: key);

  @override
  _HistoryScreenState createState() => _HistoryScreenState();
}

class _HistoryScreenState extends State<HistoryScreen> {
  bool _isLoading = true;
  List<Map<String, dynamic>> _histories = [];

  @override
  void initState() {
    super.initState();
    _loadHistories();
  }

  Future<void> _loadHistories() async {
    // 실제로는 API에서 데이터를 가져옴
    await Future.delayed(Duration(seconds: 1)); // API 호출 시뮬레이션

    setState(() {
      _histories = [
        {
          'id': '1',
          'itemId': '001',
          'itemName': '노트북',
          'action': '위치 변경',
          'fromLocation': '개발팀',
          'toLocation': '마케팅팀',
          'user': '김철수',
          'timestamp': DateTime.now().subtract(Duration(days: 2)),
          'note': '마케팅팀으로 임시 대여'
        },
        {
          'id': '2',
          'itemId': '001',
          'itemName': '노트북',
          'action': '점검',
          'fromLocation': '개발팀',
          'toLocation': '개발팀',
          'user': '이영희',
          'timestamp': DateTime.now().subtract(Duration(days: 10)),
          'note': '정기 소프트웨어 업데이트'
        },
        {
          'id': '3',
          'itemId': '002',
          'itemName': '모니터',
          'action': '상태 변경',
          'fromLocation': '디자인팀',
          'toLocation': '디자인팀',
          'user': '박지민',
          'timestamp': DateTime.now().subtract(Duration(days: 5)),
          'note': '화면 깜빡임 증상으로 수리 요청'
        },
        // ... 더 많은 이력
      ];

      // 특정 아이템 ID가 있으면 필터링
      if (widget.itemId != null) {
        _histories = _histories.where((h) => h['itemId'] == widget.itemId).toList();
      }

      // 날짜 기준 정렬
      _histories.sort((a, b) => b['timestamp'].compareTo(a['timestamp']));

      _isLoading = false;
    });
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
              !_isSameDay(_histories[index]['timestamp'], _histories[index - 1]['timestamp']);

          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (showDateHeader)
                Padding(
                  padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
                  child: Text(
                    _formatDate(history['timestamp']),
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
                      // 아이템 정보 및 액션
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          // 액션 아이콘
                          Container(
                            padding: EdgeInsets.all(8),
                            decoration: BoxDecoration(
                              color: _getActionColor(history['action']),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(
                              _getActionIcon(history['action']),
                              color: Colors.white,
                              size: 16,
                            ),
                          ),
                          SizedBox(width: 12),

                          // 이력 정보
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                // 액션 제목
                                Text(
                                  '${history['action']} - ${history['itemName']}',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 16,
                                  ),
                                ),
                                SizedBox(height: 4),

                                // 위치 정보
                                Text(
                                  history['fromLocation'] == history['toLocation']
                                      ? '위치: ${history['fromLocation']}'
                                      : '${history['fromLocation']} → ${history['toLocation']}',
                                  style: TextStyle(
                                    color: Colors.grey[700],
                                    fontSize: 14,
                                  ),
                                ),

                                // 메모가 있으면 표시
                                if (history['note'] != null)
                                  Padding(
                                    padding: const EdgeInsets.only(top: 8.0),
                                    child: Text(
                                      '메모: ${history['note']}',
                                      style: TextStyle(
                                        fontStyle: FontStyle.italic,
                                        fontSize: 14,
                                      ),
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
                            '처리자: ${history['user']}',
                            style: TextStyle(
                              fontSize: 12,
                              color: Colors.grey[600],
                            ),
                          ),
                          Text(
                            _formatTime(history['timestamp']),
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

  Color _getActionColor(String action) {
    switch (action) {
      case '위치 변경':
        return Colors.blue;
      case '상태 변경':
        return Colors.orange;
      case '점검':
        return Colors.green;
      default:
        return Colors.grey;
    }
  }

  IconData _getActionIcon(String action) {
    switch (action) {
      case '위치 변경':
        return Icons.swap_horiz;
      case '상태 변경':
        return Icons.update;
      case '점검':
        return Icons.check_circle;
      default:
        return Icons.history;
    }
  }
}