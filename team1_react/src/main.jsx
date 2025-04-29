import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import InventoryPage from './page/ currentSituation/InventoryPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<Header />*/}
    {/*<div className="d-flex">*/}
    {/*  <SideBar />*/}
    {/*  /!*    비품 목록 페이지*!/*/}
    {/*  <ProductList />*/}
    {/*  <EquipmentInformation />*/}
    {/*</div>*/}
    <InventoryPage />
  </StrictMode>,
);
