import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import axiosInstance from '../../api/axiosInstance.jsx';

function StockMovementChart() {
  const [data, setData] = useState([]);

  // 날짜 형식 지정 함수 (YYYY-MM-DD)
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // 현재 날짜를 기준으로 해당 월의 첫날과 마지막 날 계산
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const startDate = formatDate(startOfMonth);
  const endDate = formatDate(endOfMonth);

  useEffect(() => {
    axiosInstance
      .get(`/stock-movements?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => {
        console.log('Full API Response:', response); // 전체 응답을 확인
        const stockData = response.data.data;  // 여기서 'data'를 추출한다고 가정

        if (stockData && Array.isArray(stockData)) {
          const 입고Data = stockData.map(d => ({
            x: new Date(d.time).toISOString().substring(0, 10),
            y: d.입고,
          }));
          const 출고Data = stockData.map(d => ({
            x: new Date(d.time).toISOString().substring(0, 10),
            y: d.출고,
          }));

          setData([
            { id: '입고', data: 입고Data },
            { id: '출고', data: 출고Data },
          ]);
        } else {
          console.error('stockData가 배열이 아니거나 데이터가 없습니다.');
        }
      })
      .catch((error) => {
        console.error('Error fetching stock movements:', error);
      });
  }, [startDate, endDate]);

  return (
    <div>
      <div className="text-lg font-bold">월간 입출고 현황</div>

      <div className="flex space-x-4">
        <div className="h-56 w-1/2">
          <ResponsiveLine
            data={data.filter(d => d.id === '입고')}
            margin={{ top: 20, right: 20, bottom: 40, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              legend: '날짜',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              legend: '입고',
              legendPosition: 'middle',
              legendOffset: -60,
            }}
            colors={['#60A5FA']}
            pointSize={8}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            useMesh={true}
            enableArea={true}
            areaOpacity={0.4}
          />
        </div>

        <div className="h-56 w-1/2">
          <ResponsiveLine
            data={data.filter(d => d.id === '출고')}
            margin={{ top: 20, right: 20, bottom: 40, left: 70 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              legend: '날짜',
              legendPosition: 'middle',
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              legend: '출고',
              legendPosition: 'middle',
              legendOffset: -60,
            }}
            colors={['#F87171']}
            pointSize={8}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            useMesh={true}
            enableArea={true}
            areaOpacity={0.4}
          />
        </div>
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
