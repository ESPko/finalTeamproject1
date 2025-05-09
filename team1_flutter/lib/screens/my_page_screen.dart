import 'package:flutter/material.dart';
import '../models/user.dart';

class MypageScreen extends StatelessWidget {
  final User user;

  const MypageScreen({super.key, required this.user});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('마이페이지'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildInfoBox(context, '기본 정보', [
              _buildInfoRow('닉네임', user.nickName),
              _buildInfoRow('아이디', user.id),
            ]),
            _buildInfoBox(context, '소속 및 직급', [
              _buildInfoRow('부서', user.department),
              _buildInfoRow('직급', _getPositionName(user.position)),
            ]),
            _buildInfoBox(context, '기타 정보', [
              _buildInfoRow('회원 번호 (idx)', user.idx.toString()),
              // _buildInfoRow('비밀번호', user.pass),  // ❗ 보안상 보통은 표시하지 않음
            ]),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoBox(BuildContext context, String title, List<Widget> rows) {
    return Card(
      elevation: 4,
      margin: const EdgeInsets.only(bottom: 16),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(title, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 12),
            ...rows,
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(String title, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w500)),
          Flexible(child: Text(value, style: const TextStyle(fontSize: 16), overflow: TextOverflow.ellipsis)),
        ],
      ),
    );
  }

  String _getPositionName(int code) {
    switch (code) {
      case 1:
        return '사원';
      case 2:
        return '대리';
      case 3:
        return '과장';
      case 4:
        return '차장';
      case 5:
        return '부장';
      case 6:
        return '이사';
      default:
        return '직급 없음';
    }
  }
}
