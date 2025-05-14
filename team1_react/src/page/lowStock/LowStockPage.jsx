import { useEffect, useState, useMemo } from 'react';
import Topline from '../../components/layout/Topline.jsx';
import LowStockSearch from './LowStockSearch';
import axiosInstance from '../../api/axiosInstance'; // axiosInstance 사용

function LowStockPage() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [orderedItems, setOrderedItems] = useState(() => {
    // 로컬스토리지에서 기존 데이터 불러오기
    const stored = localStorage.getItem('orderedItems');
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const response = await axiosInstance.get('/api/lowstock');
        setLowStockItems(response.data);
        setFilteredItems(response.data); // 초기 필터링 없이 전체 항목 표시
      } catch (error) {
        console.error('재고 부족 데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchLowStock();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term); // 검색어 상태 업데이트
  };

  // useMemo를 사용해 필터링 최적화
  const filteredItemsMemo = useMemo(() => {
    if (searchTerm.trim() === '') return lowStockItems; // 검색어가 비면 모든 항목을 표시
    return lowStockItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, lowStockItems]); // searchTerm 또는 lowStockItems가 변경될 때만 필터링

  const handleApply = () => {
    window.location.href = '/test2'; // 신청 버튼 클릭 시 페이지 이동
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 h-full" style={{ width: '1530px', padding: '0px 40px 80px 40px' }}>
        <Topline title="재고 부족 알림">
          <div className="mt-[40px] relative">
            <LowStockSearch items={lowStockItems} onSelect={handleSearch} />
          </div>

          <div className="text-[14px] mt-[20px] text-gray-700">
            <div className="items-center flex-row flex h-[52px]">
              <div className="h-2 w-2 bg-red-500 rounded-lg mr-3"></div>
              <div>재고 부족</div>
            </div>

            <div className="h-[52px] items-center grid grid-cols-12 border-b border-b-gray-300 font-semibold">
              <div className="col-span-3">비품명</div>
              <div className="col-span-2">위치</div>
              <div className="col-span-2">기본 안전 재고</div>
              <div className="col-span-2">현재 재고</div>
              <div className="col-span-2">부족 재고</div>
              <div className="col-span-1"></div>
            </div>

            {filteredItemsMemo.map((item) => (
              <div key={item.idx} className="h-[52px] items-center grid grid-cols-12 border-b border-b-gray-100">
                <div className="col-span-3 flex items-center">
                  <div className="w-[36px] h-[36px] mr-[20px] rounded bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://postimg.cc/7GvCWtWM';
                      }}
                    />
                  </div>
                  <div>{item.name}</div>
                </div>
                <div className="col-span-2">{item.warehouseName}</div>
                <div className="col-span-2 text-blue-300 font-semibold">{item.standard}</div>
                <div className="col-span-2 font-semibold">{item.quantity}</div>
                <div className="col-span-2 text-red-400 font-semibold">
                  {item.standard - item.quantity}
                </div>
                <div className="col-span-1">
                  <button
                    type="button"
                    className="border shadow border-gray-300 rounded-sm w-[44px] h-[36px] mr-1 hover:bg-gray-300"
                    onClick={handleApply}
                  >
                    신청
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Topline>
      </div>
    </main>
  );
}

export default LowStockPage;
