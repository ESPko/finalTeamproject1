import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

function EquipmentDetail({ product }) {
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price || '');
  const [standard, setStandard] = useState(product?.standard || '');
  const [quantity, setQuantity] = useState(product?.quantity || '');
  const [warehouseName, setWarehouseName] = useState(product?.warehouseName || '');
  const [vendorName, setVendorName] = useState(product?.vendorName || '');
  const [image, setImage] = useState(product?.image || null); // 이미지 상태 추가
  const [time] = useState(product?.time || ''); // time은 수정하지 않음, 읽기 전용


  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setPrice(product.price);
      setStandard(product.standard);
      setQuantity(product.quantity);
      setWarehouseName(product.warehouseName);
      setVendorName(product.vendorName);
      setImage(product.image); // 이미지 상태 업데이트
    }
  }, [product]);

  // 이미지 파일 업로드 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // 미리보기 URL 생성
      // 필요에 따라 파일 업로드 로직을 추가할 수 있습니다.
    }
  };

  // idx 값을 사용하여 QR 코드 URL 생성
  const qrCodeUrl = `http://10.100.203.16:8080/api/items/${product.idx}/dispatch-quantity`;

  // 이미지 클릭 시 파일 선택창 열기
  const handleImageClick = () => {
    document.getElementById('file-input').click();
  };

  return (

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 왼쪽 2/3: 폼 필드 */}
        <div className="md:col-span-2 space-y-4">

          {/* 비품명 */}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              비품명
            </label>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* 카테고리 */}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              카테고리
            </label>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* 매입가 */}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              매입가
            </label>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>


          {/* 매입회사 */}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              매입회사
            </label>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
            />
          </div>

          {/* 매입날짜 */}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              매입날짜
            </label>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              value={time}
              readOnly
            />
          </div>

          {/* 수량 */}
          <section>
            <h6 className="text-lg font-semibold mb-4 mt-4 border-b border-gray-300">수량 </h6>

            <div className=" space-y-3 ">

              {/* 적정재고 */}
              <div className="flex items-center w-full max-w-md">
                <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
                  적정재고
                </label>
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2"
                  value={standard}
                  onChange={(e) => setStandard(e.target.value)}
                />
              </div>

              {/* 총재고 */}
              <div className="flex items-center w-full max-w-md">
                <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
                  총재고
                </label>
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {/* 위치1 */}
              <div className="flex items-center w-full max-w-md">
                <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
                  창고위치
                </label>
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2"
                  value={warehouseName}
                  onChange={(e) => setWarehouseName(e.target.value)}
                />
              </div>


            </div>
          </section>


        </div>


        {/* 오른쪽 이미지 + QR */}
        <div className="flex flex-col items-end space-y-2">
          <div
            className="w-24 h-24 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-2xl text-gray-400 cursor-pointer"
            onClick={handleImageClick} // 이미지 클릭 시 input 열기
          >
            {image ? (
              <img
                src={image} // 이미지 미리보기
                alt="비품 이미지"
                className="w-full h-full object-cover border rounded-lg"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-2xl text-gray-400">
                📷
              </div>
            )}
          </div>
          {/* 이미지 업로드 input */}
          <input
            id="file-input" // input에 id를 부여하여 클릭 시 트리거
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // input을 화면에서 숨김
          />
          <div className="w-24 h-24 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-sm text-gray-400">
            {/* QR 코드 생성 */}
            <QRCode value={qrCodeUrl} />
          </div>
        </div>
      </div>
  );
}

export default EquipmentDetail;