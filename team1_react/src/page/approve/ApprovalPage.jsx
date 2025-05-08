import SearchIcon from '../../icon/SearchIcon.jsx';

function ApprovalPage() {
  return (
    <main className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 h-full" style={{ width: '1530px', padding: '0px 40px 80px 40px' }}>
        <div className={'flex flex-col pb-[10px]'} style={{ height: '82px', borderBottom: '1px solid black' }}>
          <div className="text-gray-700 font-semibold mt-auto h-[36px]" style={{ fontSize: '24px' }}>승인 목록</div>
        </div>
        <div className=" mt-[40px]">
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
          <div className="items-center grid border-b border-b-gray-300 pb-2 font-semibold h-[52px] grid-cols-12">
            <div className={'col-span-1'}>날짜</div>
            <div className={'col-span-2'}>비품명</div>
            <div className={'col-span-1'}>카테고리</div>
            <div className={'col-span-2'}>위치</div>
            <div className={'col-span-1'}>매입 회사</div>
            <div className={'col-span-1'}>매입가</div>
            <div className={'col-span-2'}>매입 수량</div>
            <div className={'col-span-1'}>승인 여부</div>
            <div className={'col-span-1'}></div>
          </div>
          <div className={'h-[52px] items-center grid grid-cols-12 border-b border-b-gray-100'}>
            <div className={'col-span-1'}>2025.05.01</div>
            <div className={'col-span-2 flex items-center'}>
              <div className={'w-[36px] h-[36px] mr-[20px] rounded bg-gray-300'}></div>
              <div>비품명</div>
            </div>
            <div className={'col-span-1'}>카테고리</div>
            <div className={'col-span-2'}>위치</div>
            <div className={'col-span-1'}>매입 회사</div>
            <div className={'col-span-1'}>50,000</div>
            <div className={'col-span-2'}>5</div>
            <div className={'col-span-1 text-gray-400 font-semibold pl-[20px]'}>대기</div>
            <div className={'col-span-1'}>
              <button type={'button'} className={'border shadow border-gray-300 rounded-sm w-[44px] h-[36px] mr-1 hover:bg-gray-300'}>거절</button>
              <button type={'button'} className={'border shadow border-blue-300 rounded-sm w-[44px] h-[36px] hover:bg-blue-300'}>승인</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ApprovalPage;