function ApprovalPage() {
  return (
      <main className=" flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded shadow p-4 h-full" style={{ width: '1530px', padding: '0px 40px 80px 40px' }}>
          <div className={'flex flex-col pb-[10px]'} style={{ height: '82px', borderBottom: '1px solid black' }}>
            <div className="text-gray-700 font-semibold mt-auto h-[36px]" style={{ fontSize: '24px' }}>승인 목록</div>
          </div>
          <div className="bg-danger mt-[40px]">
            <div>
              <input
                type="text"
                placeholder="제품 이름 검색"
                className="w-[300px] h-[36px] border border-gray-300 rounded p-[10px] text-sm"
              />
              <button type={'button'} className={'ml-[10px] h-[36px] w-[50px] border font-semibold border-gray-300 rounded-sm hover:bg-gray-100 shadow-sm text-gray-600'}>검색</button>
            </div>
          </div>
          <div className="text-[14px] mt-[20px] text-gray-700">
            <div className="p-4 grid border-b border-b-gray-300 pb-2 font-semibold h-[52px] grid-cols-12">
              <div className={'col-span-1'}>날짜</div>
              <div className={'col-span-3'}>제품명</div>
              <div className={'col-span-2'}>위치</div>
              <div className={'col-span-2'}>가격</div>
              <div className={'col-span-2'}>신청자</div>
              <div className={'col-span-1'}>승인 여부</div>
              <div className={'col-span-1'}></div>
            </div>
            <div className={'h-[62px] grid grid-cols-12'}>
              <div className={'col-span-1'}>날짜</div>
              <div className={'col-span-3'}>제품명</div>
              <div className={'col-span-2'}>위치</div>
              <div className={'col-span-2'}>가격</div>
              <div className={'col-span-2'}>신청자</div>
              <div className={'col-span-1'}>승인 여부</div>
              <div className={'col-span-1'}></div>
            </div>
          </div>
        </div>
      </main>
  );
}

export default ApprovalPage;