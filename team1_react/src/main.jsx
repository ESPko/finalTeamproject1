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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Login />
    <Login2 />
    <Login3 />
    {/*<App />*/}
    <Header />
    <div className="d-flex">
    <SideBar />
    {/*    비품 목록 페이지*/}
    <ProductList/>
    </div>
  </StrictMode>,
)
