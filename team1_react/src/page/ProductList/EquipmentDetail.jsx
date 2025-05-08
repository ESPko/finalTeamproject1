import { useState } from 'react';

function EquipmentDetail({ product }) {

  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [safetyStock, setSafetyStock] = useState(product.safetyStock);
  const [totalQuantity, setTotalQuantity] = useState(product.totalQuantity);
  const [tempWarehouse, setTempWarehouse1] = useState(product.tempWarehouse);
  const [vendorName, setVendorName] = useState(product.vendorName);
  const [orderDate, setOrderDate] = useState(product.orderDate);


  if (!product) return null;


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
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
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
                  value={safetyStock}
                  onChange={(e) => setSafetyStock(e.target.value)}
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
                  value={totalQuantity}
                  onChange={(e) => setTotalQuantity(e.target.value)}
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
                  value={tempWarehouse}
                  onChange={(e) => setTempWarehouse1(e.target.value)}
                />
              </div>


            </div>
          </section>


        </div>

        {/* 오른쪽 이미지 + QR */}
        <div className="flex flex-col items-end space-y-2">
          <div className="w-24 h-24 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-2xl text-gray-400">
            📷
          </div>
          <div className="w-24 h-24 bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-sm text-gray-400">
            QR Code
          </div>
        </div>

      </div>



  );
}

export default EquipmentDetail;