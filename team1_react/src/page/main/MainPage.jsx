import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import DashboardChart from "./DashboardChart.jsx";
import MainPageInputRequestList from "./MainPageInputRequestList.jsx";
import MyBarChart from './MyBarChart.jsx';
import InventoryTrendChart from './InventoryTrendChart.jsx';

const Dashboard = () => {
  return (
    <main className="flex-1 p-4 grid grid-cols-2 gap-4 text-base">
      {/* 오늘 재고 현황 */}
      <DashboardChart />

      {/* 입고 신청 내역 */}
      <MainPageInputRequestList />

      {/* 재고 변동 (라인 차트) */}
      <InventoryTrendChart />



      {/* 입출고 수 (막대그래프) */}
      <MyBarChart />
    </main>
  );
};

export default Dashboard;
