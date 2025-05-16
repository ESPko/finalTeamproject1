import Topline from '../../../components/layout/Topline.jsx';
import { useEffect, useState, useMemo } from 'react';
import StatusNavigation from '../../../components/sdh/navi/StatusNavigation.jsx';
import StatusTableBody from '../../../components/sdh/inventory/StatusTableBody.jsx';
import axiosInstance from '../../../api/axiosInstance';

function StatusPage ()
{
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedOutboundPerson, setSelectedOutboundPerson] = useState([]);
  const [transactionType, setTransactionType] = useState(null); // ⬅️ 입고/출고/조정
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6);
    return date;
  });
  const [endDate, setEndDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [products, setProducts] = useState([]);
  
  const formatDate = useMemo(() => (date, isStart = true) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hhmmss = isStart ? '00:00:00' : '23:59:59';
    return `${yyyy}-${mm}-${dd} ${hhmmss}`;
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      const formattedStart = formatDate(startDate, true);
      const formattedEnd = formatDate(endDate, false);
      
      const requestBody = {
        tags,
        selectedDepartments,
        selectedOutboundPerson,
        transactionType, // ⬅️ 추가
        startDate: formattedStart,
        endDate: formattedEnd,
      };
      
      try
      {
        const response = await axiosInstance.post('/api/status/search', requestBody);
        setProducts(response.data);
      }
      catch (error)
      {
        console.error('Axios 요청 실패:', error);
      }
    };
    
    fetchProducts();
  }, [tags, selectedDepartments, selectedOutboundPerson, startDate, endDate, transactionType, formatDate]);
  
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px' }}>
        <Topline title="비품 사용 현황">
          <StatusNavigation
            selectedDepartments={selectedDepartments}
            setSelectedDepartments={setSelectedDepartments}
            selectedOutboundPerson={selectedOutboundPerson}
            setSelectedOutboundPerson={setSelectedOutboundPerson}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            tags={tags}
            setTags={setTags}
            transactionType={transactionType}
            setTransactionType={setTransactionType}
          />
          <table className="table-fixed border-collapse w-full">
            <thead className="bg-white top-0 z-30">
            <tr className="border-b border-gray-300">
              <th className="cell-style w-[10%]">사진</th>
              <th className="cell-style w-[13%]">제품명</th>
              <th className="cell-style w-[13%]">보관위치</th>
              <th className="cell-style w-[13%]">거래처</th>
              <th className="cell-style w-[10%]">부서</th>
              <th className="cell-style w-[10%]">출고자</th>
              <th className="cell-style w-[10%]">재고변동</th>
              <th className="cell-style w-[6%]">수량</th>
              <th className="cell-style w-[10%]">총 가격</th>
              <th className="cell-style w-[15%]">출고일</th>
            </tr>
            </thead>
            <StatusTableBody products={products} />
          </table>
        </Topline>
      </div>
    </div>
  );
}

export default StatusPage;
