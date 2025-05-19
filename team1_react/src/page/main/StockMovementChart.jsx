import { ResponsiveLine } from '@nivo/line';

function StockMovementChart() {
  const ioData = [
    { date: "05-01", 입고: 60000, 출고: 20000 },
    { date: "05-10", 입고: 40000, 출고: 40000 },
    { date: "05-17", 입고: 60000, 출고: 30000 },
    { date: "05-18", 입고: 30000, 출고: 50000 },
  ];

  // 현재 날짜를 기준으로 해당 월의 첫날과 마지막 날 계산
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  // 날짜를 "MM-DD" 형식으로 변환하는 함수
  const formatDate = (date) => {
    const month = date.getMonth() + 1; // 월은 0부터 시작하므로 +1
    const day = date.getDate();
    return `${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  const formattedStartDate = formatDate(startOfMonth);
  const formattedEndDate = formatDate(endOfMonth);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-800">금액 변동</div>
        <div className="text-sm text-gray-400">
          {formattedStartDate} ~ {formattedEndDate}
        </div>
      </div>
      <div className="h-56">
        <ResponsiveLine
          data={[
            {
              id: "입고금액",
              data: ioData.map(d => ({ x: d.date, y: d.입고 })),
            },
            {
              id: "출고금액",
              data: ioData.map(d => ({ x: d.date, y: d.출고 })),
            },
          ]}
          margin={{ top: 20, right: 20, bottom: 40, left: 70 }}
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
            legend: "금액",
            legendPosition: "middle",
            legendOffset: -60,
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
      {/* 더보기 버튼 */}
      <div className="mt-4 text-center flex justify-end pr-2">
        <button
          onClick={() => window.location.href = '/test9'}
          className="px-4 py-2 text-sm text-blue-600 font-semibold hover:underline"
        >
          더보기 &gt;
        </button>
      </div>
    </div>
  );
}

export default StockMovementChart;
