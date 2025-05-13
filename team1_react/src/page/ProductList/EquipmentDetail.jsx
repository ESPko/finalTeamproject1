import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';


function EquipmentDetail({ product , updateProduct}) {
  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price || '');
  const [standard, setStandard] = useState(product?.standard || '');
  const [quantity, setQuantity] = useState(product?.quantity || 0 );
  const [warehouseName] = useState(product?.warehouseName || '');
  const [vendorName] = useState(product?.vendorName || '');
  const [image, setImage] = useState(product?.image || null); // 기존 이미지 URL

  const [imageSrc, setImageSrc] = useState(null);       // 미리보기용
  const [imageUrl, setImageUrl] = useState(product?.image || ''); // 기존 이미지 URL 상태


  useEffect(() => {
    if (updateProduct && product) {
      updateProduct({
        ...product,
        name: name,
        price: price,
        quantity: quantity,
        warehouseName: product.warehouseName,
        vendorName: product.vendorName,
        image: imageUrl || image, // 이미지 수정된 경우만 반영
        category: category,
        standard: standard
      })
    }
  }, [name, price, quantity, warehouseName, vendorName, image, category, standard]);

  // 이미지 파일 업로드 처리 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);
      setImage(file);
      setImageUrl(null);
    }
  };

  // idx 값을 사용하여 QR 코드 URL 생성
  const qrCodeUrl = `http://10.100.203.16:8080/api/items/${product.idx}/dispatch-quantity`;

  // 이미지 클릭 시 파일 선택창 열기
  const handleImageClick = () => {
    document.getElementById('file-input').click();
  };

  const categories = ['필기구', '사무용품', '생활용품', '가전', '기타'];


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
              readOnly            />
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
                  현재 재고
                </label>
                <input
                  type="text"
                  className="flex-1 border rounded px-3 py-2"
                  value={quantity === 0 ? '0' : quantity} // '0'일 때도 출력되도록 설정
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
                  readOnly                />
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
            {imageSrc ? (
              <img
                src={imageSrc} // 미리보기용 URL을 src에 넣음
                alt="비품 이미지"
                className="w-full h-full object-cover border rounded-lg"
              />
            ) : (
              image && (
                <img
                  src={image} // 기존 이미지를 src로 사용
                  alt="비품 이미지"
                  className="w-full h-full object-cover border rounded-lg"
                />
              )
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