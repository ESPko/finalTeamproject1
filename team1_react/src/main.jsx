import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './layout/Header.jsx';
import SideBar from './layout/SideBar.jsx';
import Topline from './layout/Topline.jsx';
import Login from './components/login/Login.jsx';
import Login2 from './components/login/Login2.jsx';
import Login3 from './components/login/Login3.jsx';
import Login4 from './components/login/Login4.jsx';
import Login5 from './components/login/Login5.jsx';
import Login6 from './components/login/Login6.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login7 from './components/login/Login7.jsx';
import ErrorPage from './page/ErrorPage.jsx';
import MainPage from './page/main/MainPage.jsx';
import Test from './layout/Test.jsx';
import TestPage1 from './page/TestPage1.jsx';
import TestPage2 from './page/TestPage2.jsx';
import TestPage3 from './page/TestPage3.jsx';
import TestPage4 from './page/TestPage4.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path={'/test1'} element={<TestPage1 />} />
          <Route path={'/test2'} element={<TestPage2 />} />
          <Route path={'/test3'} element={<TestPage3 />} />
          <Route path={'/test4'} element={<TestPage4 />} />
        </Route>
        <Route path="/login" element={<Login4 />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>

    </BrowserRouter>
  </StrictMode>
)
