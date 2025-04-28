import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Header from './layout/Header.jsx';
import SideBar from './layout/SideBar.jsx';
import Topline from './layout/Topline.jsx';
import EquipmentInformation from './page/EquipmentInformation.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}
    <Header />
    <div className="d-flex">
    <SideBar />
    <EquipmentInformation/>
    </div>
  </StrictMode>,
)
