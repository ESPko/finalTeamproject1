import SearchIcon from '../../icon/SearchIcon.jsx';
import { FiSettings } from 'react-icons/fi';
import { useState } from 'react';
import ProductAdd from './ProductAdd';
import Modal from '../../Modal/Modal.jsx';
import Topline from '../../layout/Topline.jsx';
import EquipmentDetail from './EquipmentDetail.jsx';


function EquipmentInformation() {
  const products = [
    {
      name: '몰',
      category: '-',
      price: '500',
      safetyStock: '5',
      totalQuantity: '2',
      tempWarehouse1: '1',
      tempWarehouse2: '1',
      vendorName: '회사A',
      orderDate: '2025-04-20',
    },
    {
      name: '임시제품1',
      category: '-',
      price: '1,000',
      safetyStock: '10',
      totalQuantity: '7',
      tempWarehouse1: '0',
      tempWarehouse2: '7',
      vendorName: '회사B',
      orderDate: '2025-04-25',
    },
  ];

  //   컬럼 설정
  const [showSettings, setShowSettings] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    category: true,
    vendorName: true,
    price: true,
    orderDate: true,
    safetyStock: true,
    totalQuantity: true,
    tempWarehouse1: true,
    tempWarehouse2: true,
  });
  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  // 비품추가 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 비품 상세보기 모달
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };


  return (
    <div>
      <Topline
        title="제품"
        actions={
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            제품 추가
          </button>
        }
      >
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

            <div className="relative ml-4">
              <div
                className="flex items-center bg-white border border-[#cbccd3] rounded-md px-3 py-2 cursor-pointer hover:shadow"
                onClick={() => setShowSettings(!showSettings)}
              >
                <FiSettings className="h-5 w-5 text-gray-400 mr-2" />
                <span>컬럼 설정</span>
              </div>
              {showSettings && (
                <div className="absolute top-12 right-0 bg-white border rounded shadow p-4 z-50">
                  {Object.keys(visibleColumns).map((key) => (
                    <div key={key} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={key}
                        checked={visibleColumns[key]}
                        onChange={() => toggleColumn(key)}
                        className="mr-2"
                      />
                      <label htmlFor={key}>
                        {({
                          category: '카테고리',
                          vendorName: '매입회사',
                          price: '매입가',
                          orderDate: '매입날짜',
                          safetyStock: '적정재고',
                          totalQuantity: '현재재고',
                          tempWarehouse1: '임시창고1',
                          tempWarehouse2: '임시창고2',
                        })[key]}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>



          {/* 테이블 */}
          <div className="overflow-auto w-full pretty-scrollbar flex-auto m-3 mt-4 text-center">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-white">
              <tr className="bg-white sticky top-0 z-30 border-b">
                <th className="sticky bg-white w-[80px]">사진</th>
                <th className="sticky bg-white border-r w-[150px] border-gray-300">제품명</th>
                {visibleColumns.category && <th>카테고리</th>}
                {visibleColumns.vendorName && <th>매입회사</th>}
                {visibleColumns.price && <th>매입가</th>}
                {visibleColumns.orderDate && <th>매입날짜</th>}
                {visibleColumns.safetyStock && <th>적정재고</th>}
                {visibleColumns.totalQuantity && <th>현재재고</th>}
                {visibleColumns.tempWarehouse1 && <th>임시창고1</th>}
                {visibleColumns.tempWarehouse2 && <th>임시창고2</th>}
              </tr>
              </thead>
              <tbody>
              {products.map((product, idx) => (
                <tr key={idx}
                    onClick={() => handleRowClick(product)}
                    className="border-b border-gray-200">
                  <td className="sticky w-[80px] bg-white flex justify-center items-center py-2">
                    <div className="bg-gray-200 w-[60px] h-[60px] rounded" />
                  </td>
                  <td className="sticky bg-white border-r border-gray-300">{product.name}</td>
                  {visibleColumns.category && <td>{product.category}</td>}
                  {visibleColumns.vendorName && <td>{product.vendorName}</td>}
                  {visibleColumns.price && <td>{product.price}</td>}
                  {visibleColumns.orderDate && <td>{product.orderDate}</td>}
                  {visibleColumns.safetyStock && <td>{product.safetyStock}</td>}
                  {visibleColumns.totalQuantity && <td>{product.totalQuantity}</td>}
                  {visibleColumns.tempWarehouse1 && <td>{product.tempWarehouse1}</td>}
                  {visibleColumns.tempWarehouse2 && <td>{product.tempWarehouse2}</td>}
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </Topline>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="비품 추가"
        footer={
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">임시 저장</button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              취소
            </button>
          </>
        }
      >
        <ProductAdd />
      </Modal>

      {/* 비품 상세보기 모달 */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title="비품 상세보기"
        footer={
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">수정</button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              삭제
            </button>
          </>
        }
      >
        <EquipmentDetail product={selectedProduct} />
      </Modal>

    </div>
  );
}

export default EquipmentInformation;
