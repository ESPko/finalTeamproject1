import { Link } from 'react-router-dom';

function ProductAdd() {
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
                type="text"
                className="flex-1 rounded border px-3 py-2"
                placeholder="비품명"
              />
            </div>

            {/*카테고리*/}
            <div className="flex items-center w-full max-w-md">
              <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
                카테고리
              </label>
              <select className="flex-1 border rounded px-3 py-2">
                <option>선택하세요</option>
              </select>
            </div>
            
            {/*위치*/}
            <div className="flex items-center w-full max-w-md">
              <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
                위치
              </label>
              <select className="flex-1 border rounded px-3 py-2">
                <option>선택하세요</option>
              </select>
            </div>




          </div>

          {/* 오른쪽 이미지 */}

          <div className="md:col-span-1 flex justify-end items-start mt-4 w-full">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-24 h-24 bg-sky-500/50 rounded-full flex items-center justify-center text-2xl text-gray-400">
                📷
              </div>
              {/*<button className="bg-green-500 text-white px-3 py-2 rounded">*/}
              {/*  QR 생성*/}
              {/*</button>*/}
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
            <select className="flex-1 border rounded px-3 py-2">
              <option>선택하세요</option>
            </select>
          </div>


          {/*매입가*/}
          <div className="flex items-center w-full max-w-md">
            <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">
              매입가
            </label>
            <input
              type="text"
              className="flex-1 border rounded px-3 py-2"
              placeholder="매입가"
            />
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
              type="text"
              className="flex-1 border rounded px-3 py-2"
              placeholder="적정 재고"
            />
          </div>


          {/*매입가*/}
          {/*<div className="flex items-center w-full max-w-md">*/}
          {/*  <label className="w-20 text-sm font-medium text-gray-700 whitespace-nowrap">*/}
          {/*    매입 수량*/}
          {/*  </label>*/}
          {/*  <input*/}
          {/*    type="text"*/}
          {/*    className="flex-1 border rounded px-3 py-2"*/}
          {/*    placeholder=" 매입 수량"*/}
          {/*  />*/}
          {/*</div>*/}

        </div>
      </section>
    </div>
  );
}

export default ProductAdd;