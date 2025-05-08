import Topline from '../../../components/layout/Topline.jsx';
import { useEffect, useState } from 'react';
import StatusNavigation from '../../../components/sdh/navi/StatusNavigation.jsx';
import StatusTableBody from '../../../components/sdh/inventory/StatusTableBody.jsx';

function StatusPage ()
{
  const [products, setProducts] = useState([]);
  
  let data = [
    {
      image: 'https://mcipbeidqigprecgqogj.supabase.co/storage/v1/object/public/full503final/image/490bbb10-0802-403b-975f-60713d76d726-pen.jpg',
      name: '볼펜',
      tempWarehouse: '임시창고1',
      vendorName: '회사A',
      department: '부서A',
      outboundPerson: '홍길동',
      beforeQuantity: 3,
      afterQuantity: 1,
      date: '2023-01-01 11:22:33',
    },
    {
      image: 'https://i.postimg.cc/6QHKxZB9/4.png',
      name: 'A4용지',
      tempWarehouse: '임시창고2',
      vendorName: '회사A',
      department: '부서B',
      outboundPerson: '전우치',
      beforeQuantity: 6,
      afterQuantity: 3,
      date: '2023-01-01 11:44:55',
    },
    {
      name: '임시제품1',
      totalQuantity: '7',
      tempWarehouse: '임시창고2',
      vendorName: '회사B',
    },
    {
      name: '임시제품1',
      category: '-',
      price: '1,000',
      safetyStock: '10',
      totalQuantity: '7',
      tempWarehouse: '임시창고2',
      vendorName: '회사B',
    },
    {
      name: '임시제품1',
      category: '-',
      price: '1,000',
      safetyStock: '10',
      totalQuantity: '7',
      tempWarehouse: '임시창고2',
      vendorName: '회사B',
    },
    {
      name: '임시제품1',
      category: '-',
      price: '1,000',
      safetyStock: '10',
      totalQuantity: '7',
      tempWarehouse: '임시창고2',
      vendorName: '회사B',
    },
    {
      name: '임시제품1',
      category: '-',
      price: '1,000',
      safetyStock: '10',
      totalQuantity: '7',
      tempWarehouse: '임시창고2',
      vendorName: '회사B',
    },
    {
      name: '임시제품1',
      category: '-',
      price: '1,000',
      safetyStock: '10',
      totalQuantity: '7',
      tempWarehouse: '임시창고2',
      vendorName: '회사B',
    },
    {
      name: '임시제품1',
      category: '-',
      price: '1,000',
      safetyStock: '10',
      totalQuantity: '7',
      tempWarehouse: '임시창고2',
      vendorName: '회사B',
    },
  ];
  
  useEffect(() => {
    setProducts(data);
  }, []);
  
  return (
    <div className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh]  min-h-[80vh] "
           style={{ padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline
            title="비품 사용 현황"
          >
            <StatusNavigation />
            <table className=" table-fixed border-collapse">
              <thead className="bg-white top-0 z-30">
              <tr className="border-b border-gray-300">
                <th className="cell-style w-[120px]">사진</th>
                <th className="cell-style w-[200px]">제품명</th>
                <th className="cell-style w-[180px]">보관위치</th>
                <th className="cell-style w-[190px]">거래처</th>
                <th className="cell-style w-[130px]">부서</th>
                <th className="cell-style w-[130px]">출고자</th>
                <th className="cell-style w-[130px]">재고변동</th>
                <th className="cell-style w-[130px]">수량</th>
                <th className="cell-style w-[200px]">출고일</th>
              </tr>
              </thead>
              <StatusTableBody products={products} />
            </table>
          </Topline>
        </div>
      </div>
    </div>
  
  );
}

export default StatusPage;
