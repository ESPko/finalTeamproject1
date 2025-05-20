import { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import axiosInstance from '../../api/axiosInstance.jsx';

function StockMovementChart() {
  const [data, setData] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const startDate = formatDate(startOfMonth);
  const endDate = formatDate(endOfMonth);

  useEffect(() => {
    axiosInstance
      .get(`/stock-movements?startDate=${startDate}&endDate=${endDate}`)
      .then((response) => {
        const stockData = response.data;

        if (stockData && Array.isArray(stockData)) {
          stockData.sort((a, b) => new Date(a.date) - new Date(b.date));

          const 입고Data = stockData.map(d => ({
            x: new Date(d.date).toISOString().substring(0, 10),
            y: d.stockIn,
          }));

          const 출고Data = stockData.map(d => ({
            x: new Date(d.date).toISOString().substring(0, 10),
            y: Math.abs(d.stockOut),
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
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold text-gray-800">월간 입출고 현황</div>
        <div className="text-sm text-gray-400">
          {formattedStartDate} ~ {formattedEndDate}
        </div>
      </div>

      <div className="flex space-x-4">
        {/* 입고 */}
        <div className="h-60 w-1/2">
          <div className="text-center text-md font-semibold text-blue-500 ">입고</div>
          <ResponsiveLine
            data={data.filter(d => d.id === '입고')}
            margin={{ top: 40, right: 60, bottom: 40, left: 70 }}
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
              legend: '',
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

        {/* 출고 */}
        <div className="h-60 w-1/2">
          <div className="text-center text-md font-semibold text-red-500 ">출고</div>
          <ResponsiveLine
            data={data.filter(d => d.id === '출고')}
            margin={{ top: 40, right: 80, bottom: 40, left: 70 }}
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
              legend: '',
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
