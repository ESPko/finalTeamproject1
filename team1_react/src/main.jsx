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

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
