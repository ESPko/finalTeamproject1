import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 기다림
  }

  // 토큰이 없으면 로그인 페이지로 이동
  return token ? children : <Navigate to="/login" />;
}
