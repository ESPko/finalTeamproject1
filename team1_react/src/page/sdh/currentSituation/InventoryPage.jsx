import { useEffect, useState, useMemo } from 'react';
import Topline from '../../../components/layout/Topline.jsx';
import InventoryNavigation from '../../../components/sdh/navi/InventoryNavigation.jsx'; // 원본 컴포넌트
import InventoryTableBody from '../../../components/sdh/inventory/InventoryTableBody.jsx';
import axiosInstance from '../../../api/axiosInstance'; // axiosInstance 사용

function InventoryPage ()
{
  const [selectedLocations, setSelectedLocations] = useState([]); // 위치 선택
  const [selectedCorrespondents, setSelectedCorrespondents] = useState([]); // 거래처 선택
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6); // 기본 시작일: 6일 전
    return date;
  });
  const [endDate, setEndDate] = useState(new Date()); // 기본 종료일: 현재 날짜
  const [tags, setTags] = useState([]); // 태그 선택
  const [products, setProducts] = useState([]); // 제품 데이터
  
  // 날짜 포맷을 맞추기 위한 함수
  const formatDate = useMemo(() => (date, isStart = true) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hhmmss = isStart ? '00:00:00' : '23:59:59';
    return `${yyyy}-${mm}-${dd} ${hhmmss}`;
  }, []);
  
  // 데이터 요청을 위한 바디 객체 생성
  useEffect(() => {
    const fetchInventoryData = async () => {
      const formattedStart = formatDate(startDate, true);
      const formattedEnd = formatDate(endDate, false);
      
      const requestBody = {
        tags,
        selectedLocations,
        selectedCorrespondents,
        startDate: formattedStart,
        endDate: formattedEnd,
      };
      
      try
      {
        const response = await axiosInstance.post('/api/inventory/search', requestBody); // axios 요청
        setProducts(response.data);
      }
      catch (error)
      {
        console.error('Axios 요청 실패:', error);
      }
    };
    
    // 필터 조건이 있을 경우에만 요청
    if (
      tags.length ||
      selectedLocations.length ||
      selectedCorrespondents.length ||
      startDate ||
      endDate
    )
    {
      fetchInventoryData();
    }
  }, [tags, selectedLocations, selectedCorrespondents, startDate, endDate, formatDate]);
  
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px' }}>
        <Topline title="입출고 조회">
          <InventoryNavigation
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
            selectedCorrespondents={selectedCorrespondents}
            setSelectedCorrespondents={setSelectedCorrespondents}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            tags={tags}
            setTags={setTags}
          />
          <table className="table-fixed border-collapse w-full">
            <thead className="bg-white top-0 z-30">
            <tr className="border-b border-gray-300">
              <th className="cell-style w-[10%]">사진</th>
              <th className="cell-style w-[18%]">제품명</th>
              <th className="cell-style w-[15%]">보관위치</th>
              <th className="cell-style w-[17%]">거래처</th>
              <th className="cell-style w-[10%]">입고량</th>
              <th className="cell-style w-[10%]">출고량</th>
              <th className="cell-style w-[10%]">조정량</th>
              <th className="cell-style w-[10%]">현재재고</th>
            </tr>
            </thead>
            <InventoryTableBody products={products} />
          </table>
        </Topline>
      </div>
    </div>
  );
}

export default InventoryPage;
