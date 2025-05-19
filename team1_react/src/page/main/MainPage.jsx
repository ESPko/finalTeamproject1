import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import DashboardChart from './DashboardChart.jsx';
import MainPageInputRequestList from './MainPageInputRequestList.jsx';
import MainLowStockPage from './MainLowStockPage.jsx';
import StockMovementChart from './StockMovementChart.jsx';

// const stockData = [
//   { x: "01-01", y: 9 },
//   { x: "02-01", y: 12 },
//   { x: "03-02", y: 8 },
//   { x: "04-03", y: 10 },
// ];



  const Dashboard = () =>{

    return (
      <main className="flex-1 p-4 grid grid-cols-2 gap-4 text-base">
        {/* 재고 현황 */}
        <div className="h-[400px] bg-white rounded-2xl shadow">
          <DashboardChart />
        </div>

        {/* 입고 신청 내역 */}
        <div className="h-[400px] bg-white rounded-2xl shadow">
          <MainPageInputRequestList />
        </div>

        {/* 재고 변동 */}
        <div className="h-[400px] bg-white rounded-2xl shadow">
          <MainLowStockPage />
        </div>
        {/*<div className="bg-white rounded-2xl shadow p-4">*/}
        {/*  <div className="flex justify-between items-center mb-4">*/}
        {/*    <div className="text-lg font-bold text-gray-800">한달 기준 재고 변동</div>*/}
        {/*    <div className="text-sm text-gray-400">2025-04-01 ~ 2025-04-30</div>*/}
        {/*  </div>*/}
        {/*  <div className="h-56">*/}
        {/*    <ResponsiveLine*/}
        {/*      data={[*/}
        {/*        {*/}
        {/*          id: "재고",*/}
        {/*          data: stockData,*/}
        {/*        },*/}
        {/*      ]}*/}
        {/*      margin={{ top: 20, right: 20, bottom: 40, left: 50 }}*/}
        {/*      xScale={{ type: "point" }}*/}
        {/*      yScale={{ type: "linear", min: 0, max: "auto", stacked: false }}*/}
        {/*      curve="catmullRom" // 👈 부드러운 곡선 커브*/}
        {/*      axisBottom={{*/}
        {/*        tickSize: 5,*/}
        {/*        tickPadding: 5,*/}
        {/*        tickRotation: 0,*/}
        {/*        legend: "날짜",*/}
        {/*        legendOffset: 36,*/}
        {/*        legendPosition: "middle",*/}
        {/*      }}*/}
        {/*      axisLeft={{*/}
        {/*        tickSize: 5,*/}
        {/*        tickPadding: 5,*/}
        {/*        tickRotation: 0,*/}
        {/*        legend: "재고",*/}
        {/*        legendOffset: -40,*/}
        {/*        legendPosition: "middle",*/}
        {/*      }}*/}
        {/*      enableArea={true} // 영역 그래프 스타일*/}
        {/*      areaOpacity={0.25}*/}
        {/*      colors={["#3B82F6"]} // Tailwind 'blue-500' 컬러*/}
        {/*      pointSize={10}*/}
        {/*      pointColor="#ffffff"*/}
        {/*      pointBorderWidth={3}*/}
        {/*      pointBorderColor="#3B82F6"*/}
        {/*      enableGridX={false}*/}
        {/*      enableGridY={true}*/}
        {/*      animate={true}*/}
        {/*      useMesh={true}*/}
        {/*      theme={{*/}
        {/*        axis: {*/}
        {/*          ticks: {*/}
        {/*            text: {*/}
        {/*              fill: "#6B7280", // Tailwind gray-500*/}
        {/*            },*/}
        {/*          },*/}
        {/*        },*/}
        {/*        grid: {*/}
        {/*          line: {*/}
        {/*            stroke: "#E5E7EB", // Tailwind gray-200*/}
        {/*            strokeDasharray: "4 4",*/}
        {/*          },*/}
        {/*        },*/}
        {/*      }}*/}
        {/*    />*/}


        {/*  </div>*/}
        {/*</div>*/}

        {/* 입출고 수 */}
        <div className="bg-white rounded-2xl shadow p-4  h-[400px]">
          <StockMovementChart/>
        </div>
      </main>
    );
  };

export default Dashboard;
