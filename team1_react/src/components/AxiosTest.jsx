import axios from "axios";
import { useState } from 'react';
import axiosInstance from '../api/axiosInstance.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

function AxiosTest() {
  const { user } = useAuth();
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 요청
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('../api/login', {
        id: username,
        pass: password,
      });

      const receivedToken = response.data.token;
      setToken(receivedToken);
      localStorage.setItem('token', receivedToken);
      console.log('Login success:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  // 스프링 서버와 통신 테스트(토큰없음)
  const sendDataTest = () => {
    axios.get("http://localhost:8080/api")
      .then(res => {
        console.log('axios를 사용한 비동기 통신에 성공')
        console.log(res.data)
      })
      .catch(err => {
        console.log("비동기 통신 중 오류가 발생했습니다.")
        console.log(err)
      })
  }

  // 스프링 서버와 통신 테스트(토큰있음)
  const sendDataTokenTest = () => {
    const token = localStorage.getItem("token"); // 토큰 가져오기
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

  // 스프링 서버와 통신 테스트(인스탠스 토큰)
  const sendDataInstanceTest = () => {
    axiosInstance.get("/api")
      .then(res => {
        console.log('axios를 사용한 비동기 통신에 성공')
        console.log(res.data)
      })
      .catch(err => {
        console.log("비동기 통신 중 오류가 발생했습니다.")
        console.log(err)
      })
  }




  return (

      <div style={{ padding: '20px' }}>
        <h1>토큰 : {token}</h1>
        <button type={'button'} className={'bg-red-400 btn btn-secondary me-2'} onClick={sendDataTest}>Spring RestAPI 서버 접속 테스트</button>
        <button type={'button'} className={'bg-blue-400 btn btn-secondary me-2'} onClick={sendDataTokenTest}>토큰을 담은 Spring RestAPI 서버 접속 테스트</button>
        <button type={'button'} className={'bg-green-300 btn btn-secondary me-2'} onClick={sendDataInstanceTest}>인스탠스를 사용한 Spring RestAPI 서버 접속 테스트</button>
        <br/><br/><br/><br/>
        {token ? (
          <div>
            <h2>환영합니다!</h2>
            <p>{user.id}님이 로그인에 성공했으며 토큰이 저장되어 있습니다.</p>
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
            <button onClick={handleLogin}>로그인</button>

            <button type={'button'} className={'btn btn-secondary me-2'} onClick={sendDataTest}>Spring RestAPI 서버 접속 테스트</button>

          </div>
        )}
      </div>
    );
}

export default AxiosTest