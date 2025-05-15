import { useEffect, useState} from 'react';
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
    axiosInstance.get('/api/lowstock')
      .then((response) => {
        const data = response.data;

        setLowStockItems(data);
        setFilteredItems(data); // 전체 목록 초기 표시

        // 로컬스토리지에서 기존 발주 정보 가져오기
        const stored = JSON.parse(localStorage.getItem('orderedItems') || '{}');
        const updatedOrdered = {};

        // 서버에서 approve 상태가 3인 것만 유지
        data.forEach(item => {
          if (item.approve === 3 && stored[item.idx]) {
            updatedOrdered[item.idx] = true;
          }
        });

        setOrderedItems(updatedOrdered);
        localStorage.setItem('orderedItems', JSON.stringify(updatedOrdered));
      })
      .catch((error) => {
        console.error('Error fetching low stock items:', error);
      });
  }, []);

// 검색 필터링
  const handleSearch = (term) => {
    setSearchTerm(term);

    if (term.trim() === '') {
      setFilteredItems(lowStockItems);
      return;
    }

    const matched = lowStockItems.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase()),
    );

    setFilteredItems(matched);
  };

  // 발주 완료 버튼 클릭 시
  const handleApply = async (idx) => {
    const confirmed = window.confirm('입고 대기 상태로 변경 하시겠습니까?');

    if (confirmed) {
      try {
        // 서버에 approve 컬럼 업데이트 요청
        const response = await axiosInstance.put(`/api/lowstock/${idx}/approve`, {
          approve: 3, // approve 값을 3으로 설정
        });

        if (response.status === 200) {
          const updated = {
            ...orderedItems,
            [idx]: true,
          };
          setOrderedItems(updated);

          // 로컬스토리지에 저장
          localStorage.setItem('orderedItems', JSON.stringify(updated));


          // approve 상태를 3으로 반영
          const updatedFiltered = filteredItems.map((item) =>
            item.idx === idx ? { ...item, approve: 3 } : item
          );
          setFilteredItems(updatedFiltered);

          const updatedLowStock = lowStockItems.map((item) =>
            item.idx === idx ? { ...item, approve: 3 } : item
          );
          setLowStockItems(updatedLowStock);

        } else {
          alert("입고 대기 상태로 변경하는데 실패했습니다.");
        }
      } catch (error) {
        console.error('입고 대기 상태로 변경 중 오류가 발생했습니다.', error);
        alert('입고 대기 상태로 변경하는데 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px 40px' }}>
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
                <div className="col-span-1">부족 재고</div>
                <div className="col-span-1"></div>
                <div className="col-span-1 flex justify-center">입고 현황</div>
              </div>

              {filteredItems.map((item) => (
                <div key={item.idx} className="break-all whitespace-normal items-center grid grid-cols-12 border-b border-b-gray-100">
                  <div className="col-span-3 flex items-center">
                    <div className="w-[60px] h-[60px] m-3 mr-[20px] rounded bg-gray-300 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.className = 'hidden';
                        }}
                      />
                    </div>
                    <div>{item.name}</div>
                  </div>
                  <div className="col-span-2 mr-5">{item.warehouseName}</div>
                  <div className="col-span-2 font-semibold">{item.standard}</div>
                  <div className="col-span-2 font-semibold">{item.quantity}</div>
                  <div className="col-span-1 text-red-400 font-semibold">{item.quantity - item.standard}</div>

                  <div className="col-span-1 flex justify-center">
                    <button
                      type="button"
                      className={`border shadow border-gray-200 rounded-sm h-[36px] px-1
                        ${orderedItems[item.idx] && item.approve === 3
                        ? 'text-gray-300'
                        : 'text-gray-400 font-semibold hover:bg-gray-200'}`}
                      disabled={orderedItems[item.idx] && item.approve === 3}
                      onClick={() => handleApply(item.idx)}
                    >
                      발주 완료
                    </button>
                  </div>

                  <div className="col-span-1 flex items-center justify-center">
                    {orderedItems[item.idx] && item.approve ===3 && (
                      <div className="text-gray-400 font-semibold cursor-pointer"
                      onClick={() => window.location.href = '/test2'}
                      >
                        입고 대기 중
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </Topline>
        </div>
      </div>
    </div>
  );
}

export default LowStockPage;
