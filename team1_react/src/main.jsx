import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import InventoryPage from './page/sdh/ currentSituation/InventoryPage.jsx';
import QrTestPage from './page/sdh/test/QrTestPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InventoryPage />
    {/*<QrTestPage />*/}
  </StrictMode>,
);
