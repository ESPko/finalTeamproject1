import 'package:flutter/material.dart';

class SearchFilterScreen extends StatefulWidget {
  const SearchFilterScreen({super.key});
  @override
  _SearchFilterScreenState createState() => _SearchFilterScreenState();
}

class _SearchFilterScreenState extends State<SearchFilterScreen> {
  final _searchController = TextEditingController();
  String _selectedCategory = '전체';
  String _selectedStatus = '전체';
  final List<String> _categories = ['전체', '컴퓨터', '모니터', '가구', '기타'];
  final List<String> _statuses = ['전체', '사용 중', '수리 중', '보관 중', '폐기 예정'];

  // 예시 데이터
  List<Map<String, dynamic>> _items = [];
  List<Map<String, dynamic>> _filteredItems = [];

  @override
  void initState() {
    super.initState();
    _loadItems();
    _filteredItems = _items;
  }

  void _loadItems() {
    // 실제로는 API에서 데이터를 가져옴
    _items = [
      {'id': '001', 'name': '노트북', 'category': '컴퓨터', 'status': '사용 중', 'location': '개발팀'},
      {'id': '002', 'name': '모니터', 'category': '모니터', 'status': '사용 중', 'location': '디자인팀'},
      {'id': '003', 'name': '의자', 'category': '가구', 'status': '수리 중', 'location': '회의실'},
      // ... 더 많은 아이템들
    ];
    _filteredItems = _items;
  }

  void _filterItems() {
    setState(() {
      _filteredItems = _items.where((item) {
        // 검색어 필터
        bool matchesSearch = _searchController.text.isEmpty ||
            item['name'].toLowerCase().contains(_searchController.text.toLowerCase());

        // 카테고리 필터
        bool matchesCategory = _selectedCategory == '전체' ||
            item['category'] == _selectedCategory;

        // 상태 필터
        bool matchesStatus = _selectedStatus == '전체' ||
            item['status'] == _selectedStatus;

        return matchesSearch && matchesCategory && matchesStatus;
      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('비품 검색'),
        elevation: 0,
      ),
      body: Column(
        children: [
          // 검색바
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                hintText: '비품명 검색...',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                suffixIcon: IconButton(
                  icon: Icon(Icons.clear),
                  onPressed: () {
                    _searchController.clear();
                    _filterItems();
                  },
                ),
              ),
              onChanged: (value) {
                _filterItems();
              },
            ),
          ),

          // 필터 영역
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              children: [
                // 카테고리 필터
                Expanded(
                  child: DropdownButtonFormField<String>(
                    decoration: InputDecoration(
                      labelText: '카테고리',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      contentPadding: EdgeInsets.symmetric(horizontal: 12),
                    ),
                    value: _selectedCategory,
                    items: _categories.map((category) {
                      return DropdownMenuItem(
                        value: category,
                        child: Text(category),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setState(() {
                        _selectedCategory = value!;
                        _filterItems();
                      });
                    },
                  ),
                ),
                SizedBox(width: 12),

                // 상태 필터
                Expanded(
                  child: DropdownButtonFormField<String>(
                    decoration: InputDecoration(
                      labelText: '상태',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                      contentPadding: EdgeInsets.symmetric(horizontal: 12),
                    ),
                    value: _selectedStatus,
                    items: _statuses.map((status) {
                      return DropdownMenuItem(
                        value: status,
                        child: Text(status),
                      );
                    }).toList(),
                    onChanged: (value) {
                      setState(() {
                        _selectedStatus = value!;
                        _filterItems();
                      });
                    },
                  ),
                ),
              ],
            ),
          ),

          SizedBox(height: 16),

          // 결과 목록
          Expanded(
            child: _filteredItems.isEmpty
                ? Center(child: Text('검색 결과가 없습니다.'))
                : ListView.builder(
              itemCount: _filteredItems.length,
              itemBuilder: (context, index) {
                final item = _filteredItems[index];
                return Card(
                  margin: EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  elevation: 2,
                  child: ListTile(
                    leading: CircleAvatar(
                      child: Text(item['id']),
                    ),
                    title: Text(item['name']),
                    subtitle: Text('${item['category']} | ${item['status']}'),
                    trailing: Text(item['location']),
                    onTap: () {
                      // 상세 정보 화면으로 이동
                    },
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}