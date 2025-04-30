import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './layout/Header.jsx';
import SideBar from './layout/SideBar.jsx';
import Login from './components/login/Login.jsx';
import Login2 from './components/login/Login2.jsx';
import Login3 from './components/login/Login3.jsx';
import EquipmentInformation from './page/ProductList/EquipmentInformation.jsx';
import ProductList from './page/ProductList/ProductList.jsx';

import ProductAdd from './page/ProductList/ProductAdd.jsx';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<Login />*/}
    {/*<Login2 />*/}
    {/*<Login3 />*/}
    {/*<App />*/}

    <Header />

    <div className="flex">
    <SideBar />
    {/*    비품 목록 페이지*/}
    {/*<ProductList/>*/}
    <EquipmentInformation/>
    </div>

  </StrictMode>,


)
