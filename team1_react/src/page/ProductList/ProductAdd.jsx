import { useEffect, useState } from 'react';
import axios from 'axios';

function ProductAdd({ onAddProduct }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [warehouseName, setWarehouseName] = useState('');
  const [price, setPrice] = useState('');
  const [standard, setStandard] = useState('');
  const [image, setImage] = useState(null); // 파일 객체 저장

  const categories = ['필기구', '사무용품', '생활용품', '가전', '기타'];
  const [warehouseList, setWarehouseList] = useState([]);  // 창고 목록 상태 추가
  const [vendorList, setVendorList] = useState([]);  // 창고 목록 상태 추가


  // 창고 목록 가져오기
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axios.get('http://localhost:8080/warehouse/name');
        setWarehouseList(response.data);
      } catch (err) {
        console.log('창고 목록을 가져오는 데 실패했습니다:', err);
      }
    };
    fetchWarehouse();
  }, []);

  // 매입회사 목록 가져오기
  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await axios.get('http://localhost:8080/vendor/name');
        setVendorList(response.data);
      } catch (err) {
        console.log('창고 목록을 가져오는 데 실패했습니다:', err);
      }
    };
    fetchVendor();
  }, []);

  // 값 변경 시 상위로 전달
  useEffect(() => {
    if (onAddProduct) {
      onAddProduct({
        name,
        category,
        vendorName,
        warehouseName,
        price,
        standard,
        image, // 파일 객체도 전달
      });
    }
  }, [name, category, vendorName, warehouseName, price, standard, image]);

  // 이미지 선택 핸들러
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="space-y-5">
      {/* 제품 정보 */}
      <section>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* 왼쪽 */}
          <div className="md:col-span-3 space-y-4">

            {/*비품명*/}
            <div className="flex items-center w-full max-w-md">
              <label className=" w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
                비품명
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="flex-1 rounded border px-3 py-2"
                placeholder="비품명" />
            </div>

            {/*카테고리*/}
            <div className="flex items-center w-full max-w-md">
              <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
                카테고리
              </label>
              <select
                className="flex-1 border rounded px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}>
                <option>선택하세요</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>

            </div>

            {/*위치*/}
            <div className="flex items-center w-full max-w-md">
              <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
                창고
              </label>
              <select
                className="flex-1 border rounded px-3 py-2"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}>
                <option>선택하세요</option>
                {warehouseList.map((warehouse) => (
                  <option key={warehouse.idx} value={warehouse.name}>{warehouse.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="md:col-span-1 flex justify-end items-start mt-4 w-full">
            <div className="flex flex-col items-center space-y-2">
              {/* 파일 선택을 트리거하는 영역 */}
              <label htmlFor="file-input" className="w-24 h-24 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-2xl text-gray-400 cursor-pointer">
                📷 {/* 클릭하면 파일 선택이 가능 */}
              </label>

              {/* 파일 input */}
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden" // input 요소를 화면에서 숨김
              />

              {/* 미리보기 이미지 */}
              {image && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="미리보기"
                    className="w-24 h-24 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-2xl text-gray-400"
                  />
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* 매입 정보 */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-gray-300">
          <h6 className="text-lg font-semibold  ">매입 정보</h6>
        </div>

        <div className=" space-y-3 ">

          {/*매입회사*/}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              매입회사
            </label>
            <select
              className="flex-1 border rounded px-3 py-2"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}>
              <option>선택하세요</option>
              {vendorList.map((vendor) => (
                <option key={vendor.idx} value={vendor.name}>{vendor.name}</option>
              ))}
            </select>
          </div>

          {/*매입가*/}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              매입가
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="매입가" />
          </div>

        </div>
      </section>

      {/* 초기 수량 */}
      <section>
        <h6 className="text-lg font-semibold mb-4 border-b border-gray-300">수량 설정</h6>

        <div className=" space-y-3 ">

          {/*적정재고*/}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              적정 재고
            </label>
            <input
              type="number"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="적정 재고" />
          </div>


        </div>
      </section>
    </div>
  );
}

export default ProductAdd;