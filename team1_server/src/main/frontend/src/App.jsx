import { useEffect, useState } from 'react';
import Side from './theme/Side.jsx';
import Header2 from './theme/Header2.jsx';
import Side2 from './theme/Side2.jsx';
import Header from './components/layout/Header.jsx';
import AxiosTest from './components/AxiosTest.jsx';
import { setUnauthorizedHandler } from './api/axiosInstance.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';

function App() {
  // 컴포넌트를 전환할 상태 변수
  const [isDefault, setIsDefault] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  // 레이아웃 전환 함수
  const toggleLayout = () => {
    setIsDefault(!isDefault);
  };

  // 토큰 만료시 로그인 페이지로
  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      navigate('/login');
    });
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#f1f3f6]">
      {/* 조건에 따라 Header와 Side 또는 Header2와 Side2를 렌더링 */}
      {isDefault ? (
        <>
          <Header toggleLayout={toggleLayout} />
          <Side />
        </>
      ) : (
        <>
          <Header2 toggleLayout={toggleLayout} />
          <Side2 />
        </>
      )}
    </div>
  );
}

export default App;