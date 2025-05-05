import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login4 from './components/login/Login4.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from './page/ErrorPage.jsx';
import MainPage from './page/main/MainPage.jsx';
import TestPage1 from './page/TestPage1.jsx';
import TestPage2 from './page/TestPage2.jsx';
import TestPage3 from './page/TestPage3.jsx';
import TestPage4 from './page/TestPage4.jsx';
import TestPage5 from './page/TestPage5.jsx';
import TestPage6 from './page/TestPage6.jsx';
import AxiosTest from './components/AxiosTest.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* 로그인 없이 접근 가능 */}
        <Route path="/login" element={<Login4 />} />
        <Route path="*" element={<ErrorPage />} />

        {/* 로그인 상태여야 접근 가능 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          <Route index element={<MainPage />} />
          <Route path="/test1" element={<TestPage1 />} />
          <Route path="/test2" element={<TestPage2 />} />
          <Route path="/test3" element={<TestPage3 />} />
          <Route path="/test4" element={<TestPage4 />} />
          <Route path="/test5" element={<TestPage5 />} />
          <Route path="/test6" element={<TestPage6 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
