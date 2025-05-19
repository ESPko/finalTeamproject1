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
        console.log('response.data:', response.data); // 수정: response.data를 바로 확인

        const stockData = response.data; // response.data는 바로 배열

        if (stockData && Array.isArray(stockData)) {
          // 날짜 순서대로 정렬
          stockData.sort((a, b) => new Date(a.date) - new Date(b.date));  // 날짜 오름차순 정렬

          const 입고Data = stockData.map(d => ({
            x: new Date(d.date).toISOString().substring(0, 10), // 'time' -> 'date'로 변경
            y: d.stockIn,
          }));

          // 출고의 절댓값을 사용
          const 출고Data = stockData.map(d => ({
            x: new Date(d.date).toISOString().substring(0, 10), // 'time' -> 'date'로 변경
            y: Math.abs(d.stockOut), // 출고는 음수일 경우 절댓값으로 처리
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

  const formattedStartDate = formatDate(startOfMonth);
  const formattedEndDate = formatDate(endOfMonth);

  return (
    <div >
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-800">월간 입출고 현황</div>
        <div className="text-sm text-gray-400">
          {formattedStartDate} ~ {formattedEndDate}
        </div>
      </div>

      <div className="flex space-x-4">
        <div className=" h-60 w-1/2">
          <ResponsiveLine
            data={data.filter(d => d.id === '입고')}
            margin={{ top: 40, right: 60, bottom: 40, left: 70 }} // 오른쪽 여백 증가
            xScale={{ type: 'point' }} // 다시 point로 변경
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

        <div className="h-60 w-1/2">
          <ResponsiveLine
            data={data.filter(d => d.id === '출고')}
            margin={{ top: 40, right: 80, bottom: 40, left: 70 }} // 오른쪽 여백 증가
            xScale={{ type: 'point' }} // 날짜와 점을 정확히 맞추기 위해 point 사용
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
    </div>
  );
}

export default StockMovementChart;
