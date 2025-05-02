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
import MemberManagement from './page/MemberManagement/MemberManagement.jsx';
import EquipmentInformation from './page/ProductList/EquipmentInformation.jsx';
import ProductSearch from './page/ProductList/ProductSearch.jsx';
import ApprovalPage from './layout/ApprovalPage.jsx';
import StoragePage from './layout/StoragePage.jsx';
import LocationDetail from './page/location/LocationDetail.jsx';
import LocationInfo from './page/location/LocationInfo.jsx';
import ClientList from './page/Client/ClientList.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<MainPage />} />
          <Route path={'/test1'} element={<EquipmentInformation />} />
          <Route path={'/test2'} element={<TestPage2 />} />
          <Route path={'/test3'} element={<TestPage3 />} />
          <Route path={'/test4'} element={<TestPage4 />} />
          <Route path={'/test5'} element={<MemberManagement />} />
          <Route path={'/test6'} element={<TestPage6 />} />

        </Route>
        <Route path="/login" element={<Login4 />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <EquipmentInformation/>
      <LocationInfo/>
        <ProductSearch/>
        <MemberManagement/>
      <ApprovalPage/>
      <StoragePage/>
      <ClientList/>
    </BrowserRouter>
  </StrictMode>
)
