import SearchIcon from '../icon/SearchIcon.jsx';
import { FiSettings } from 'react-icons/fi';

function EquipmentInformation() {
  const products = [
    { name: '몰', category: '-', price: '500', safetyStock: '5', totalQuantity: '2', tempWarehouse1: '1', tempWarehouse2: '1' },
    { name: '임시제품1', category: '-', price: '1,000', safetyStock: '10', totalQuantity: '7', tempWarehouse1: '0', tempWarehouse2: '7' },
  ];

  return (
    <div className="px-10 pb-20">
      <div className="bg-primary w-[1500px] h-[82px]">
        <div className="text-[24px] leading-[82px] pl-5">제품</div>
      </div>

      <div className="w-[1500px]">
        {/* 검색창 */}
        <div className="flex items-center justify-between m-3">

          <div className="relative w-full max-w-md min-h-[36px] bg-white border border-[#cbccd3] rounded-md flex items-center transition-all duration-100">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="이름, 바코드, 속성 검색"
              className="pl-10 pr-4 py-2 w-full focus:outline-none"
            />
          </div>

          <div className="flex items-center bg-white border border-[#cbccd3] rounded-md ml-4 px-3 py-2 cursor-pointer hover:shadow">
            <FiSettings className="h-5 w-5 text-gray-400 mr-2" />
            <span>컬럼 설정</span>
          </div>

        </div>
        <div className="text-red-500">테스트</div>

        {/* 테이블 */}
        <div className="overflow-auto w-full pretty-scrollbar flex-auto m-3 text-center">
          <table className="w-full table-fixed border-collapse">
            <thead className="bg-white  border-top border-b">
            <tr className="bg-white sticky top-0 z-30">

              <th className="sticky left-[16px] bg-white w-[80px]">사진</th>
              <th className="sticky left-[96px] bg-white border-r w-[280px]">제품명</th>
              <th>카테고리</th>
              <th>구매가</th>
              <th>기본 위치 안전재고</th>
              <th>총 수량</th>
              <th>임시창고1</th>
              <th>임시창고2</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product, idx) => (
              <tr key={idx} className="border-b">
                <td className="sticky left-[16px] bg-white">
                  <div className="bg-gray-200 w-9 h-9 rounded"></div>
                </td>
                <td className="sticky left-[96px] bg-white border-r-2">{product.name}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.safetyStock}</td>
                <td>{product.totalQuantity}</td>
                <td>{product.tempWarehouse1}</td>
                <td>{product.tempWarehouse2}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
}

export default EquipmentInformation;
