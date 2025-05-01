function TestPage1() {
  return (
    <main className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 h-full" style={{ width: '1530px', padding: '0px 40px 80px 40px' }}>
        <div className={'flex flex-col pb-[10px]'} style={{ height: '82px', borderBottom: '1px solid black' }}>
          <div className="text-gray-700 font-semibold mt-auto h-[36px]" style={{ fontSize: '24px' }}>입고</div>
        </div>
        <div className="bg-danger mt-[25px]">
          <div
            className={'text-gray-700 h-[51px] text-[14px] font-semibold border-b-1 border-b-gray-300 flex items-center'}>제품
            목록
          </div>
          <div className="text-[14px] text-gray-700">
            <div className="p-4 flex border-b-1 border-b-gray-300 pb-2 font-semibold h-[52px]">
              <div className="w-[1020px] pl-[30px]">제품</div>
              <div className="w-[180px] text-center">현재고</div>
              <div className="w-[180px] text-center">수량*</div>
            </div>

            {/* 입력 필드 */}
            <div className="flex items-center border-b border-b-gray-300 h-[52px] justify-around">
              <div className="w-[1020px] pl-[30px] pr-2 p-4">
                <input
                  type="text"
                  placeholder="+ 제품 검색"
                  className="w-[500px] h-[36px] border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <div className="w-[180px] pl-[50px] text-gray-400">-</div>
              <div className="w-[148px]">
                <input
                  type="number"
                  defaultValue={1}
                  className="w-full border p-3 border-gray-300 rounded h-[36px] text-gray-400 fw-bold"
                />
              </div>
            </div>

            {/* 품목 및 총 수량 */}
            <div
              className="flex justify-between items-center h-[52px] border-b border-b-gray-300 text-[16px] font-bold">
              <span>0개 품목</span>
              <span>총 수량
                <span className="text-blue-500 font-semibold pl-3">0</span>
        </span>
            </div>
          </div>

          <div className={'mt-[20px]'}>
            {/* 위치 */}
            <div className={'w-[305px] h-[36px] flex justify-between'}>
              <label className="block font-semibold">위치*</label>
              <div className="w-[220px] border border-gray-300 rounded text-sm text-gray-400">
              </div>
            </div>

            {/* 입고처 */}
            <div className={'w-[305px] h-[36px] flex justify-between mt-[12px]'}>
              <label className="block font-semibold ">입고처</label>
              <div className="w-[220px] border border-gray-300 rounded text-sm text-gray-400">
              </div>
            </div>

            {/* 날짜 */}
            <div className={'w-[305px] h-[36px] flex justify-between mt-[12px]'}>
              <label className="block font-semibold">날짜</label>
              <button type={'button'}
                className="w-[220px] border border-gray-300 rounded text-sm text-start pl-[5px] bg-gray-100 text-gray-400 hover:bg-gray-200 shadow">현재
              </button>
            </div>

            {/* 메모 */}
            <div className={'mt-[30px]'}>
        <textarea
          rows={4}
          className="w-full border rounded text-sm border-gray-300 p-[8px]"
          placeholder={`메모 입력`}>
        </textarea>
            </div>

            {/* 완료 버튼 */}
            <div className="pt-2">
              <button className="w-[86px] h-[36px] border border-gray-300 rounded-sm font-semibold text-gray-600 hover:bg-gray-100 shadow-sm">
                입고 완료
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default TestPage1;