import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import Header from '../layout/Header.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); // ✅ 추가
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post('/api/login', {
        id: username,
        pass: password,
      });

      const { token, user } = response.data;

      login(user, token, rememberMe); // ✅ 수정
      console.log('Login success:', user);

      navigate(`/`);
    } catch (error) {
      console.error('Login failed:', error);
      setError("아이디 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0ecf7] to-[#f9fcff]">
        <div className="relative bg-white shadow-lg rounded-lg p-8 w-96">
          {/* Title */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-900/70 text-white text-sm font-bold px-8 py-2 rounded-sm shadow-md">
            MEMBER LOGIN
          </div>

          {/* Username */}
          <div className="flex items-center rounded px-3 py-2 mb-4 bg-gray-100">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
            </svg>
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent w-full outline-none text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="flex items-center rounded px-3 py-2 mb-4 bg-gray-100 relative">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 1110 0v2h1a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2h1zm2-2a3 3 0 116 0v2H7V7z" clipRule="evenodd" />
            </svg>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="bg-transparent w-full outline-none text-sm pr-8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember Me */}
          <label className="flex items-center mb-4 text-sm text-gray-600">
            <input
              type="checkbox"
              className="mr-2"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            자동 로그인 유지
          </label>

          {/* Error */}
          {error && <div className="text-red-500 text-xs mb-4 text-center animate-shake">{error}</div>}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-900 text-white py-2 rounded text-sm font-semibold hover:bg-blue-800 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              "LOGIN"
            )}
          </button>
        </div>
      </div>
    </>
  );
}
