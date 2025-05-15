// src/pages/AxiosTest.jsx
import axios from "axios";
import { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

function AxiosTest() {
  const { user } = useAuth();
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // 컴포넌트가 마운트될 때 토큰 읽기
  useEffect(() => {
    const storedToken = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('../api/login', {
        id: username,
        pass: password,
      });

      const receivedToken = response.data.token;
      setToken(receivedToken);

      // rememberMe에 따라 저장 위치 결정
      if (rememberMe) {
        localStorage.setItem('token', receivedToken);
      } else {
        sessionStorage.setItem('token', receivedToken);
      }

      console.log('Login success:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  const sendDataTest = () => {
    axios.get("http://localhost:8080/api")
      .then(res => {
        console.log('axios를 사용한 비동기 통신에 성공');
        console.log(res.data);
      })
      .catch(err => {
        console.log("비동기 통신 중 오류가 발생했습니다.");
        console.log(err);
      });
  };

  const sendDataTokenTest = () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    console.log("보낼 토큰:", token);

    axios.get("http://localhost:8080/api", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        console.log('axios를 사용한 비동기 통신에 성공');
        console.log(res.data);
      })
      .catch(err => {
        console.log("비동기 통신 중 오류가 발생했습니다.");
        console.log(err);
      });
  };

  const sendDataInstanceTest = () => {
    axiosInstance.get("/api")
      .then(res => {
        console.log('axios를 사용한 비동기 통신에 성공');
        console.log(res.data);
      })
      .catch(err => {
        console.log("비동기 통신 중 오류가 발생했습니다.");
        console.log(err);
      });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>토큰 : {token}</h1>
      <button type="button" className="bg-red-400 btn btn-secondary me-2" onClick={sendDataTest}>Spring RestAPI 서버 접속 테스트</button>
      <button type="button" className="bg-blue-400 btn btn-secondary me-2" onClick={sendDataTokenTest}>토큰을 담은 Spring RestAPI 서버 접속 테스트</button>
      <button type="button" className="bg-green-300 btn btn-secondary me-2" onClick={sendDataInstanceTest}>인스턴스를 사용한 Spring RestAPI 서버 접속 테스트</button>

      <br /><br /><br /><br />

      {token ? (
        <div>
          <h2>환영합니다!</h2>
          <p>{user?.id}님이 로그인에 성공했으며 토큰이 저장되어 있습니다.</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <h2>로그인</h2>
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            자동 로그인 유지
          </label><br />
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </div>
  );
}

export default AxiosTest;
