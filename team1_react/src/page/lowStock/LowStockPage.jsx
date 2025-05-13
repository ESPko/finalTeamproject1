import Topline from '../../components/layout/Topline.jsx';
import { useEffect, useState } from 'react';
import LowStockSearch from './LowStockSearch'; // 컴포넌트 추가

function LowStockPage() {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/lowstock')
      .then((response) => response.json())
      .then((data) => {
        setLowStockItems(data);
        setFilteredItems(data); // 기본적으로 전체 항목 표시
      })
      .catch((error) => {
        console.error("Error fetching low stock items:", error);
      });
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredItems(lowStockItems);
      return;
    }

    const matched = lowStockItems.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredItems(matched);
  };

  const handleApply = () => {
    // 버튼 클릭 시 StoragePage로 이동
    window.location.href = '/test2'; // 이동할 페이지의 URL로 변경
  };

  return (
    <main className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 h-full" style={{ width: '1530px', padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline title="재고 부족 알림">
            <div className="mt-[40px] relative">
              <LowStockSearch items={lowStockItems} onSelect={handleSearch} /> {/* 컴포넌트 사용 */}

            </div>

            <div className="text-[14px] mt-[20px] text-gray-700">
              <div className="items-center flex-row flex h-[52px]">
                <div className="h-2 w-2 bg-red-500 rounded-lg mr-3"></div>
                <div>재고 부족</div>
              </div>

              <div className="h-[52px] items-center grid grid-cols-12 border-b border-b-gray-300">
                <div className="col-span-3">비품명</div>
                <div className="col-span-2">위치</div>
                <div className="col-span-2">기본 안전 재고</div>
                <div className="col-span-2">현재 재고</div>
                <div className="col-span-2">부족 재고</div>
                <div className="col-span-1"></div>
              </div>

              {filteredItems.map((item) => (
                <div key={item.idx} className="h-[52px] items-center grid grid-cols-12 border-b border-b-gray-100">
                  <div className="col-span-3 flex items-center">
                    <div className="w-[36px] h-[36px] mr-[20px] rounded bg-gray-300 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/36';
                        }}
                      />
                    </div>
                    <div>{item.name}</div>
                  </div>
                  <div className="col-span-2">{item.warehouseName}</div>
                  <div className="col-span-2 text-blue-300 font-semibold">{item.standard}</div>
                  <div className="col-span-2 font-semibold">{item.quantity}</div>
                  <div className="col-span-2 text-red-400 font-semibold">{item.quantity - item.standard}</div>
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
      </div>
    </main>
  );
}

export default LowStockPage;
