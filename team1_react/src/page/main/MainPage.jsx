import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import DashboardChart from './DashboardChart.jsx';
import MainPageInputRequestList from './MainPageInputRequestList.jsx';
import MainLowStockPage from './MainLowStockPage.jsx';
import { useNavigate } from 'react-router-dom';
import StockMovementChart from './StockMovementChart.jsx';


const ioData = [
  { date: "01-01", 입고: 6, 출고: 2 },
  { date: "02-01", 입고: 4, 출고: 4 },
  { date: "03-01", 입고: 6, 출고: 3 },
  { date: "04-01", 입고: 3, 출고: 5 },
];

const Dashboard = () =>{
  const navigate = useNavigate(); // ← 이 부분 추가
  return (
    <main className="flex-1 p-4 grid grid-cols-2 gap-4 text-base">
      {/* 재고 현황 */}
      <div className="h-[420px] bg-white rounded-2xl shadow hover:scale-105"
           onClick={() => navigate('/test8')}>
        <DashboardChart />
      </div>

      {/* 입고 신청 내역 */}
      {/* 재고 변동 */}
      <div className="h-[420px] bg-white rounded-2xl shadow hover:scale-105"
           onClick={() => navigate('/test3')}>
        <MainPageInputRequestList />
      </div>

      {/* 재고 변동 */}
      <div className="h-[420px] bg-white rounded-2xl shadow hover:scale-105"
           onClick={() => navigate('/test4')}>
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
