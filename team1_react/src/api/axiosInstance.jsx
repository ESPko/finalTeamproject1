import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Refresh 토큰 등 사용할 경우 필요
});

// 요청 전에 토큰 자동 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔥 콜백 방식으로 401 처리
let onUnauthorizedCallback = null;

// 외부에서 콜백 등록 가능하게 함
export const setUnauthorizedHandler = (callback) => {
  onUnauthorizedCallback = callback;
};

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && onUnauthorizedCallback) {
      onUnauthorizedCallback(); // 로그아웃 + 페이지 이동
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
