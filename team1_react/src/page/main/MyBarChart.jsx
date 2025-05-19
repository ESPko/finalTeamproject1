import { ResponsiveBar } from '@nivo/bar';

const data = [
  { month: '11월', 입고: 10, 출고: 15 },
  { month: '12월', 입고: 11, 출고: 18 },
  { month: '1월', 입고: 10, 출고: 15 },
  { month: '2월', 입고: 25, 출고: 20 },
  { month: '3월', 입고: 10, 출고: 12 },
];

function MyBarChart() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">한달 기준 입출고 수</h2>
        <p className="text-sm text-gray-400">2025-04-01 ~ 2025-04-30</p>
      </div>
      <div className="h-56">
        <ResponsiveBar
          data={data}
          keys={['입고', '출고']}
          indexBy="month"
          margin={{ top: 50, right: 30, bottom: 50, left: 50 }}
          padding={0.3}
          groupMode="grouped"
          colors={({ id }) => (id === '입고' ? '#60a5fa' : '#f87171')}
          borderRadius={4}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 12,
            legend: '날짜',
            legendPosition: 'middle',
            legendOffset: 36,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 6,
            tickValues: [0, 5, 10, 15, 20, 25], // 막대 기준 수량 맞춤
            legend: '수량',
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          enableGridY={true}
          gridYValues={[0, 5, 10, 15, 20, 25]}
          labelSkipWidth={999} // ❌ 숫자 숨기기
          labelSkipHeight={999}
          theme={{
            axis: {
              ticks: {
                text: {
                  fontSize: 12,
                  fill: '#444',
                },
              },
              legend: {
                text: {
                  fontSize: 14,
                  fontWeight: 600,
                  fill: '#333',
                },
              },
            },
            grid: {
              line: {
                stroke: '#cccccc',
                strokeDasharray: '4 4',
              },
            },
          }}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top-left',
              direction: 'row',
              translateY: -30,
              itemWidth: 60,
              itemHeight: 20,
              symbolSize: 12,
            },
          ]}
          role="application"
          ariaLabel="입출고 수량 차트"
        />

      </div>
    </div>
  );
}

export default MyBarChart;