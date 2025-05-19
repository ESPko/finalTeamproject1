import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

function MainLowStockPage() {
  const navigate = useNavigate(); // ← 이 부분 추가
  const [lowStockItems, setLowStockItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'order', 'arrival'

  useEffect(() => {
    axiosInstance.get('/api/lowstock')
      .then((response) => {
        setLowStockItems(response.data);
      })
      .catch((error) => {
        console.error('재고 데이터 불러오기 실패:', error);
      });
  }, []);

  const totalLowStock = lowStockItems.length;
  const waitingOrder = lowStockItems.filter(item => item.approve !== 3).length;
  const waitingArrival = lowStockItems.filter(item => item.approve === 3).length;

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  };

  const calculateLack = (standard, quantity) => {
    const lack = (standard ?? 0) - (quantity ?? 0);
    return lack > 0 ? lack : 0;
  };

  const filteredItems = lowStockItems.filter(item => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'order') return item.approve !== 3;
    if (selectedCategory === 'arrival') return item.approve === 3;
    return true;
  });

  return (
    <div className=" p-6 flex flex-col">
      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6 cursor-pointer">
        <div onClick={() => navigate('/test4')}> {/* ← 여기 수정 */}
          <h2 className="text-lg font-bold text-gray-800">부족 재고</h2>
        </div>
        <div className="text-sm text-gray-400">{getTodayDate()}</div>
      </div>

      {/* 통계 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          onClick={() => setSelectedCategory('all')}
          className={`cursor-pointer bg-red-100 text-red-400 font-semibold text-center py-2 rounded ${selectedCategory === 'all' ? 'ring-2 ring-red-400' : ''}`}>
          부족 재고: {totalLowStock}건
        </div>
        <div
          onClick={() => setSelectedCategory('order')}
          className={`cursor-pointer bg-yellow-100 text-yellow-400 font-semibold text-center py-2 rounded ${selectedCategory === 'order' ? 'ring-2 ring-yellow-400' : ''}`}>
          발주 대기: {waitingOrder}건
        </div>
        <div
          onClick={() => setSelectedCategory('arrival')}
          className={`cursor-pointer bg-blue-100 text-blue-400 font-semibold text-center py-2 rounded ${selectedCategory === 'arrival' ? 'ring-2 ring-blue-400' : ''}`}>
          입고 대기: {waitingArrival}건
        </div>
      </div>

      {/* 리스트 */}
      <div className="space-y-4 overflow-y-auto max-h-[250px] pr-2">
        {filteredItems.map(item => {
          const lack = calculateLack(item.standard, item.quantity);
          return (
            <div key={item.idx} className="flex items-center border-b border-gray-200 pb-3">
              <div className="w-14 h-14 rounded overflow-hidden bg-gray-200 mr-4 flex-shrink-0">
                <img
                  src={item.image || item.img_url}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = '/default-product.png'; }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 truncate">{item.name}</div>
                <div className="text-xs font-semibold text-gray-500 truncate">위치: {item.warehouseName || item.location || '정보 없음'}</div>
              </div>
              <div className="text-xs font-semibold text-gray-500 text-right ml-6 min-w-[130px]">
                <div>적정 재고: <span className="font-medium">{item.standard}</span></div>
                <div>현재 재고: <span className="font-medium font-semibold text-red-400">{item.quantity}</span></div>
                <div className="text-red-300 font-semibold mt-1">부족 수량: {lack}개</div>
              </div>
            </div>
          );
        })}
        <div className="mt-4 flex justify-end pr-2">
          <button
            onClick={() => navigate('/test4')} // ← 여기도 수정
            className="text-sm text-blue-600 font-semibold hover:underline"
          >
            더보기 &gt;
          </button>
        </div>
      </div>


    </div>
  );
}

export default MainLowStockPage;
