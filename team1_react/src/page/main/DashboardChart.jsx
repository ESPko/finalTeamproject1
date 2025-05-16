import React, { useEffect, useState } from 'react';
import { ResponsivePie } from "@nivo/pie";
import axiosInstance from '../../api/axiosInstance.jsx';

function DashboardChart() {
  const [totalAfter, setTotalAfter] = useState(0);
  const [totalInput, setTotalInput] = useState(0);
  const [totalOutput, setTotalOutput] = useState(0);
  const [time, setTime] = useState("");

  const pieData = [
    { id: "입고", value: totalInput, color: "hsl(141, 70%, 50%)" },
    { id: "출고", value: totalOutput, color: "hsl(0, 70%, 50%)" },
  ];

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setTime(formatted);
    };

    updateTime();
    const timeInterval = setInterval(updateTime, 1000);

    const fetchStockData = () => {
      axiosInstance.get("/todayStock")
        .then(res => {
          const data = res.data;
          setTotalAfter(data.totalAfter);
          setTotalInput(data.totalInput);
          setTotalOutput(data.totalOutput);
        })
        .catch(err => {
          console.error("데이터 불러오기 실패 : ", err);
        });
    };

    fetchStockData();

    return () => clearInterval(timeInterval);
  }, []);

  const CenteredMetric = ({ centerX, centerY }) => (
    <text
      x={centerX}
      y={centerY}
      textAnchor="middle"
      dominantBaseline="central"
      style={{
        fontSize: '20px',
        fontWeight: 'bold',
        fill: '#374151',
      }}
    >
      총 {totalAfter}
    </text>
  );

  return (
    <div>
      <div className="bg-white rounded-2xl shadow p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-gray-800">오늘 재고 현황</div>
          <div className="text-sm text-gray-400">{time}</div>
        </div>

        <div className="h-56">
          <ResponsivePie
            data={pieData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.75}
            padAngle={2}
            cornerRadius={8}
            activeOuterRadiusOffset={8}
            colors={['#60A5FA', '#F87171']}
            borderWidth={2}
            borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
            enableArcLinkLabels={false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
          />
        </div>

        {/* 세련된 재고 요약 - 아이콘, 배경 없이 가로 정렬 */}
        <div className="mt-6 flex justify-around text-base font-semibold text-gray-700">
          <div className="text-gray-800">총 재고 <span className="text-black">{totalAfter}</span></div>
          <div className="text-blue-600">입고 <span className="text-black">{totalInput}</span></div>
          <div className="text-red-500">출고 <span className="text-black">{totalOutput}</span></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;
