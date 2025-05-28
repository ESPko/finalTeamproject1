import { ResponsiveLine } from '@nivo/line';

const stockData = [
  { x: "1월", y: 9 },
  { x: "2월", y: 12 },
  { x: "3월", y: 8 },
  { x: "4월", y: 10 },
];

function InventoryTrendChart() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">한달 기준 재고 변동</h2>
        <p className="text-sm text-gray-400">2025-04-01 ~ 2025-04-30</p>
      </div>
      <div className="h-56">
        <ResponsiveLine
          data={[
            {
              id: "재고",
              data: stockData, // 예: [{ x: "1월", y: 9 }, { x: "2월", y: 12 }, ...]
            },
          ]}
          margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: 15 }}
          axisBottom={{
            tickSize: 0,
            tickPadding: 8,
            legend: "날짜",
            legendOffset: 32,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 8,
            legend: "재고량",
            legendOffset: -40,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={true}
          gridYValues={[0, 5, 10, 15]} // Y축 간격 맞춤
          colors={["#60A5FA"]}
          pointSize={6}
          pointColor="#ffffff"
          pointBorderWidth={2}
          pointBorderColor="#60A5FA"
          curve="monotoneX"
          enableArea={false}
          useMesh={true}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: "#6B7280", // 회색 텍스트
                  fontSize: 12,
                },
              },
              legend: {
                text: {
                  fill: "#6B7280",
                  fontSize: 13,
                  fontWeight: 500,
                },
              },
            },
            grid: {
              line: {
                stroke: "#E5E7EB",
                strokeDasharray: "2 4",
              },
            },
            tooltip: {
              container: {
                background: "#ffffff",
                color: "#111827",
                fontSize: 12,
                borderRadius: "6px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              },
            },
          }}
        />

      </div>
    </div>
  );
}

export default InventoryTrendChart;