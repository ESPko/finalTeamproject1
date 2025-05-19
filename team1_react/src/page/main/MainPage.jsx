import { ResponsiveLine } from "@nivo/line";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsivePie } from "@nivo/pie";
import DashboardChart from './DashboardChart.jsx';
import MainPageInputRequestList from './MainPageInputRequestList.jsx';
import MainLowStockPage from './MainLowStockPage.jsx';
import { useNavigate } from 'react-router-dom';


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
        <div className="h-[420px] bg-white rounded-2xl shadow">
          <DashboardChart />
        </div>

        {/* 입고 신청 내역 */}
        <div className="h-[420px] bg-white rounded-2xl shadow">
          <MainPageInputRequestList />
        </div>

        {/* 재고 변동 */}
        <div className="h-[420px] bg-white rounded-2xl shadow hover:scale-105"
             onClick={() => navigate('/test4')}>
          <MainLowStockPage />
        </div>


        {/* 입출고 수 */}
        <div className="bg-white rounded-2xl shadow p-4  h-[420px]">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-bold text-gray-800">한달 기준 입출고 수</div>
            <div className="text-sm text-gray-400">2025-04-01 ~ 2025-04-30</div>
          </div>
          <div className="h-56">
            <ResponsiveLine
              data={[
                {
                  id: "입고",
                  data: ioData.map(d => ({ x: d.date, y: d.입고 })),
                },
                {
                  id: "출고",
                  data: ioData.map(d => ({ x: d.date, y: d.출고 })),
                },
              ]}
              margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
              xScale={{ type: "point" }}
              yScale={{ type: "linear", stacked: true, min: 0, max: "auto" }}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                legend: "날짜",
                legendPosition: "middle",
                legendOffset: 32,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                legend: "수량",
                legendPosition: "middle",
                legendOffset: -40,
              }}
              colors={["#60A5FA", "#F87171"]} // 입고-파랑, 출고-빨강
              pointSize={8}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor" }}
              useMesh={true}
              enableArea={true} // 영역 강조
              areaOpacity={0.4}
            />

          </div>
        </div>
      </main>
    );
  };

export default Dashboard;
