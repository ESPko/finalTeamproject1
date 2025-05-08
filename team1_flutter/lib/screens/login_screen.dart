import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('로그인'),
        elevation: 0,
      ),
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Form(
            key: _formKey,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // 로고 부분
                Image.asset(
                  'assets/logo.png',
                  height: 100,
                ),
                SizedBox(height: 40),

                // 이메일 필드
                TextFormField(
                  controller: _emailController,
                  decoration: InputDecoration(
                    labelText: '이메일',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    prefixIcon: Icon(Icons.email),
                  ),
                  keyboardType: TextInputType.emailAddress,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return '이메일을 입력해주세요';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 16),

                // 비밀번호 필드
                TextFormField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                    labelText: '비밀번호',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    prefixIcon: Icon(Icons.lock),
                  ),
                  obscureText: true,
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return '비밀번호를 입력해주세요';
                    }
                    return null;
                  },
                ),
                SizedBox(height: 24),

                // 로그인 버튼
                ElevatedButton(
                  onPressed: _isLoading ? null : _handleLogin,
                  child: _isLoading
                      ? CircularProgressIndicator(color: Colors.white)
                      : Text('로그인'),
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                ),

                SizedBox(height: 16),
                TextButton(
                  onPressed: () {
                    // 비밀번호 찾기 기능
                  },
                  child: Text('비밀번호를 잊으셨나요?'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  void _handleLogin() async {
    if (_formKey.currentState!.validate()) {
      setState(() {
        _isLoading = true;
      });

      try {
        final response = await http.post(
          Uri.parse('http://10.100.203.16:8080/api/login'), // 실제 디바이스 IP로 변경
          headers: {'Content-Type': 'application/json'},
          body: json.encode({
            'id': _emailController.text,
            'pass': _passwordController.text,
          }),
        );

        print('Status Code: ${response.statusCode}');
        print('Raw Response Body: ${response.body}');

        if (response.statusCode == 200) {
          final responseBody = json.decode(response.body);
          print('Decoded Response: $responseBody');

          final token = responseBody['token'];
          final user = responseBody['user'];

          print('Extracted token: $token');
          print('Extracted user: $user');

          if (token != null && user != null) {
            await saveToken(token);
            await saveUserInfo(user); // 여기에 유저 정보를 저장
            print('Navigating to dashboard...');
            Navigator.pushNamed(context, '/');  // 성공 시 홈 화면으로 이동
          } else {
            print('Token or user is null');
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('로그인 실패: 유효한 응답이 아닙니다.')),
            );
          }
        } else {
          final errorMessage = json.decode(response.body)['message'] ?? '로그인 실패';
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text(errorMessage)),
          );
        }
      } catch (e) {
        print('예외 발생: $e');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('로그인 중 오류 발생: $e')),
        );
      } finally {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  // 토큰 저장 함수
  Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('jwt_token', token);
    print('Token saved: $token'); // 저장된 토큰 확인
  }

  // 토큰 가져오기 함수
  Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('jwt_token');
  }

  // 유저 정보 저장 함수
  Future<void> saveUserInfo(Map<String, dynamic> userInfo) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user', json.encode(userInfo));
    print('✅ Full user info saved: $userInfo');
  }

}
