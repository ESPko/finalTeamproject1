import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './layout/Header.jsx';
import SideBar from './layout/SideBar.jsx';
import Login from './components/login/Login.jsx';
import Login2 from './components/login/Login2.jsx';
import Login3 from './components/login/Login3.jsx';
import EquipmentInformation from './page/EquipmentInformation.jsx';
import ProductList from './page/ProductList/ProductList.jsx';
import MemberManagement from './page/MemberManagement/MemberManagement.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<Login />*/}
    {/*<Login2 />*/}
    {/*<Login3 />*/}
    {/*<App />*/}
    <Header />
    <div className="d-flex">
    <SideBar />
    {/*    비품 목록 페이지*/}
    {/*<ProductList/>*/}
    {/*    직원 관리 페이지*/}
        <MemberManagement/>
    {/*<EquipmentInformation/>*/}
    </div>
  </StrictMode>,
)
