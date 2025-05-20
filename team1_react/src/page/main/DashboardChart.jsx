import React, { useEffect, useState } from 'react';
import { ResponsivePie } from "@nivo/pie";
import axiosInstance from '../../api/axiosInstance.jsx';
import { Package, ArrowDownCircle, ArrowUpCircle } from "lucide-react";


function DashboardChart() {
  // 총 재고 수
  const [totalAfter, setTotalAfter] = useState(0);
  // 총 입고 수량
  const [totalInput, setTotalInput] = useState(0);
  // 총 출고 수량
  const [totalOutput, setTotalOutput] = useState(0);
  const [time, setTime] = useState("")

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  };

  const pieData = [
    { id: "입고", value: totalInput, color: "hsl(141, 70%, 50%)" },
    { id: "출고", value: totalOutput, color: "hsl(0, 70%, 50%)" },
  ];

  useEffect(() => {
    // 시간 변경을 위한 부분
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

    updateTime(); // 처음 한 번 실행
    const timeInterval = setInterval(updateTime, 1000); // 1초마다 시간 업데이트

    // 재고 정보 불러오는 부분
    const fetchStockData = () => {
      axiosInstance.get("/todayStock")
        .then(res => {
          const data = res.data;
          // 총 재고
          setTotalAfter(data.totalAfter);
          // 총 입고
          setTotalInput(data.totalInput);
          // 총 출고
          setTotalOutput(data.totalOutput);
        })
        .catch(err => {
          console.error("데이터 불러오기 실패 : ", err)
        })
    }
    fetchStockData();
    const stockInterval = setInterval(fetchStockData, 1000);

    return () => {
      clearInterval(timeInterval);
      clearInterval(stockInterval);
    };
  }, []);



  const CenteredMetric = ({ centerX, centerY }) => {
    return (
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
  };



  return (
    <div>
      {/* 재고 현황 */}
      <div className="bg-white rounded-2xl p-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-gray-800">오늘 재고 현황</div>
          <div className="text-sm text-gray-400">{getTodayDate()}</div>
        </div>

        <div className="h-56">
          <ResponsivePie
            data={pieData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            innerRadius={0.75}
            padAngle={2}
            cornerRadius={8}
            activeOuterRadiusOffset={8}
            colors={['#60A5FA', '#F87171']} // 입고-파랑, 출고-빨강
            borderWidth={2}
            borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
            enableArcLinkLabels={false}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
            layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
          />
        </div>
        {/* 통계 정보 (가로 정렬) */}
        <div className="flex justify-around items-center text-center pt-2">
          {/* 총 재고 */}
          <div className="flex flex-col items-center space-y-1">
            <Package className="text-green-600 w-6 h-6" />
            <span className="text-sm text-gray-500">총 재고</span>
            <span className="text-lg font-bold text-gray-800">{totalAfter}</span>
          </div>

          {/* 입고 */}
          <div className="flex flex-col items-center space-y-1">
            <ArrowDownCircle className="text-blue-600 w-6 h-6" />
            <span className="text-sm text-gray-500">입고</span>
            <span className="text-lg font-bold text-gray-800">{totalInput}</span>
          </div>

          {/* 출고 */}
          <div className="flex flex-col items-center space-y-1">
            <ArrowUpCircle className="text-red-500 w-6 h-6" />
            <span className="text-sm text-gray-500">출고</span>
            <span className="text-lg font-bold text-gray-800">{totalOutput}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;
