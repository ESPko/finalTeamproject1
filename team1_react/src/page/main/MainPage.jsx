import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import DashboardChart from './DashboardChart.jsx';
import MainPageInputRequestList from './MainPageInputRequestList.jsx';
import MainLowStockPage from './MainLowStockPage.jsx';
import StockMovementChart from './StockMovementChart.jsx';
import { useNavigate } from 'react-router-dom';

// const stockData = [
//   { x: "01-01", y: 9 },
//   { x: "02-01", y: 12 },
//   { x: "03-02", y: 8 },
//   { x: "04-03", y: 10 },
// ];



const Dashboard = () =>{
  const navigate = useNavigate();
  return (
    <main className="flex-1 p-4 grid grid-cols-2 gap-4 text-base">
      {/* 재고 현황 */}
      <div className="h-[400px] bg-white rounded-2xl shadow">
        <DashboardChart />
      </div>

      {/* 입고 신청 내역 */}
      <div className="h-[400px] bg-white rounded-2xl shadow hover:scale-105 hover:shadow-lg hover:cursor-pointer" onClick={() => navigate('/test3')}>
        <MainPageInputRequestList />
      </div>

      {/* 부족 재고 */}
      <div className="h-[400px] bg-white rounded-2xl shadow hover:scale-105 hover:shadow-lg hover:cursor-pointer" onClick={() => navigate('/test4')}>
        <MainLowStockPage />
      </div>

      {/* 입출고 수 */}
      <div className="bg-white rounded-2xl shadow p-4  h-[400px] hover:scale-105 hover:shadow-lg hover:cursor-pointer" onClick={() => navigate('/test9')}>
        <StockMovementChart/>
      </div>
    </main>
  );
};

export default Dashboard;
