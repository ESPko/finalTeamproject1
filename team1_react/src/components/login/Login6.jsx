import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

export default function Login3() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 상태
  // const navigate = useNavigate(); // 페이지 이동용 훅

  const handleLogin = () => {
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);

      if (username === "admin" && password === "password") {
        // 로그인 성공 -> 홈화면 이동
        // navigate("/home");
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf8ec] bg-[url('/d.jpg')] bg-repeat bg-cover">
      {/* 로그인 박스 */}
      <div className="relative bg-white shadow-lg rounded-lg p-8 w-96">
        {/* 테이프 */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                bg-blue-900/70 text-white text-sm font-bold uppercase tracking-wide
                px-8 py-2 rounded-sm shadow-md backdrop-blur-sm opacity-90
                rotate-[2deg] skew-x-[1deg]">
          MEMBER LOGIN
        </div>

        {/* Username Input */}
        <div className="flex items-center border rounded px-3 py-2 mb-4 bg-gray-100">
          <svg
            className="w-5 h-5 text-gray-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
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

        {/* Password Input */}
        <div className="flex items-center border rounded px-3 py-2 mb-6 bg-gray-100 relative">
          <svg
            className="w-5 h-5 text-gray-400 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 1110 0v2h1a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2v-5a2 2 0 012-2h1zm2-2a3 3 0 116 0v2H7V7z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type={showPassword ? "text" : "password"} // 토글
            placeholder="********"
            className="bg-transparent w-full outline-none text-sm pr-8"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* 비밀번호 토글 버튼 */}
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-xs mb-4 text-center animate-shake">
            {error}
          </div>
        )}

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-900 text-white py-2 rounded text-sm font-semibold hover:bg-blue-800 transition flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          ) : (
            "LOGIN"
          )}
        </button>
      </div>
    </div>
  );
};