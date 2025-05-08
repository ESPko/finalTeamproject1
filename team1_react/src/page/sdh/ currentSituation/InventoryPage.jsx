import InventoryNavigation from '../../../components/sdh/navi/InventoryNavigation.jsx';
import Topline from '../../../components/layout/Topline.jsx';
import InventoryTableBody from '../../../components/sdh/inventory/InventoryTableBody.jsx';
import { useEffect, useState } from 'react';

function InventoryPage ()
{
  const [products, setProducts] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCorrespondents, setSelectedCorrespondents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  
  let data = [
    {
      image: 'https://mcipbeidqigprecgqogj.supabase.co/storage/v1/object/public/full503final/image/490bbb10-0802-403b-975f-60713d76d726-pen.jpg',
      name: '볼펜',
      tempWarehouse: '임시창고1',
      vendorName: '회사A',
      inbound: 3,
      outbound: 2,
      adjusted: 0,
      totalQuantity: 1,
    },
    {
      name: 'A4용지',
      inbound: 8,
      outbound: 2,
      adjusted: 0,
      totalQuantity: 6,
      tempWarehouse: '임시창고2',
      vendorName: '회사A',
      image: 'https://i.postimg.cc/6QHKxZB9/4.png',
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
            <table className=" table-fixed border-collapse">
              <thead className="bg-white top-0 z-30">
              <tr className="border-b border-gray-300">
                <th className="cell-style w-[120px]">사진</th>
                <th className="cell-style w-[200px]">제품명</th>
                <th className="cell-style w-[180px]">보관위치</th>
                <th className="cell-style w-[190px]">거래처</th>
                <th className="cell-style w-[130px]">입고량</th>
                <th className="cell-style w-[130px]">출고량</th>
                <th className="cell-style w-[130px]">조정량</th>
                <th className="cell-style w-[130px]">종료재고</th>
              </tr>
              </thead>
              <InventoryTableBody products={products} />
            </table>
          </Topline>
        </div>
      </div>
    </div>
  
  );
}

export default InventoryPage;
