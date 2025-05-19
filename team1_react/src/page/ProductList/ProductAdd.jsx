import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance.jsx';
import Swal from 'sweetalert2';

function ProductAdd({ onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [warehouseName, setWarehouseName] = useState('');
  const [price, setPrice] = useState('');
  const [standard, setStandard] = useState('');
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // 🔸 중복 방지

  const categories = ['필기구', '사무용품', '생활용품', '가전', '기타'];
  const [warehouseList, setWarehouseList] = useState([]);
  const [vendorList, setVendorList] = useState([]);

  // 창고 목록 가져오기
  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const response = await axiosInstance.get('/warehouse/name');
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
        const response = await axiosInstance.get('/vendor/name');
        setVendorList(response.data);
      } catch (err) {
        console.log('매입회사 목록을 가져오는 데 실패했습니다:', err);
      }
    };
    fetchVendor();
  }, []);

  // 이미지 변경 처리
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      setImage(file);
    }
  };

  // 업로드 함수
  const handleUpload = async () => {
    if (isUploading) return; // 중복 클릭 방지

    if (!image) {
      Swal.fire({
        icon: 'warning',
        title: '이미지를 먼저 선택하세요.',
      });
      return;
    }

    if (!name || !category || !vendorName || !warehouseName || !price || !standard) {
      Swal.fire({
        icon: 'warning',
        title: '모든 내용을 입력해주세요.',
      });
      return;
    }

    setIsUploading(true);
    // 비품 승인 요청 확인
    const isConfirmed = window.confirm('추가적으로 비품 승인요청 하시겠습니까?');
    if (!isConfirmed) {
      return; // 확인을 누르지 않으면 아무 것도 하지 않음
    }

    setIsUploading(true); // 🔸 업로드 시작

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('category', category);
    formData.append('vendorName', vendorName);
    formData.append('warehouseName', warehouseName);
    formData.append('price', price);
    formData.append('standard', standard);

    try {
      const response = await axiosInstance.post('/item/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Swal.fire({
        icon: 'success',
        title: '업로드 성공',
        text: '제품이 성공적으로 추가되었습니다.',
      });
      onSuccess();
      onClose();
      setImageSrc(response.data.imageUrl);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '업로드 실패',
        text: '이미지 업로드 중 오류가 발생했습니다.',
      });
      console.error('이미지 업로드 실패:', error);
    } finally {
      setIsUploading(false); // 🔸 업로드 종료
    }
  };

  return (
    <div className="space-y-5">
      {/* 제품 정보 */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* 왼쪽 */}
          <div className="md:col-span-3 space-y-4">
            {/* 비품명 */}
            <div className="flex items-center w-full max-w-md">
              <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">비품명</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="flex-1 min-w-0 rounded border px-3 py-2"
                placeholder="비품명"
              />
            </div>

            {/* 카테고리 */}
            <div className="flex items-center w-full max-w-md">
              <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">카테고리</label>
              <select
                className="flex-1 min-w-0 w-full max-w-md border rounded px-3 py-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>선택하세요</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 창고 */}
            <div className="flex items-center w-full max-w-md">
              <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">창고</label>
              <select
                className="flex-1 min-w-0 w-full max-w-md border rounded px-3 py-2"
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
              >
                <option>선택하세요</option>
                {warehouseList.map((warehouse) => (
                  <option key={warehouse.idx} value={warehouse.name}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 오른쪽 이미지 */}
          <div className="md:col-span-1 flex justify-end items-start mt-4 w-full">
            <div className="flex flex-col items-center space-y-2">
              <label
                htmlFor="file-input"
                className="w-24 h-24 bg-gray-100 border-none flex items-center justify-center text-2xl text-gray-400 cursor-pointer"
              >
                {!imageSrc ? '📷' : <img src={imageSrc} alt="미리보기" className="w-24 h-24 rounded-none" />}
              </label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 매입 정보 */}
      <section>
        <div className="flex items-center justify-between mb-4 border-b border-gray-300">
          <h6 className="text-lg font-semibold">매입 정보</h6>
        </div>

        <div className="space-y-3">
          {/* 매입회사 */}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">매입회사</label>
            <select
              className="flex-1 min-w-0 w-full max-w-md border rounded px-3 py-2"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            >
              <option>선택하세요</option>
              {vendorList.map((vendor) => (
                <option key={vendor.idx} value={vendor.name}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>

          {/* 매입가 */}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">매입가</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 min-w-0 border rounded px-3 py-2"
              placeholder="매입가"
            />
          </div>
        </div>
      </section>

      {/* 초기 수량 */}
      <section>
        <h6 className="text-lg font-semibold mb-4 border-b border-gray-300">수량 설정</h6>
        <div className="space-y-3">
          {/* 적정재고 */}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">적정 재고</label>
            <input
              type="text"
              value={standard}
              onChange={(e) => setStandard(e.target.value)}
              className="flex-1 min-w-0 border rounded px-3 py-2"
              placeholder="적정 재고"
            />
          </div>
        </div>
      </section>

      <div className="flex justify-end space-x-4">
        {/* 승인 요청 버튼 */}
        <button
          className={`px-4 py-2 rounded text-white ${isUploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600'}`}
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? '업로드 중...' : '승인요청'}
        </button>

        {/* 취소 버튼 */}
        <button
          className="px-4 py-2 rounded text-gray-700 bg-gray-200"
          onClick={onClose}
        >
          취소
        </button>
      </div>
    </div>
  );
}

export default ProductAdd;
