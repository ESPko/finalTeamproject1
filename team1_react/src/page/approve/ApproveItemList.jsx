function ApproveItemList({ approveProduct, changeApprove }) {

  return (
    <div>
      <div className="text-[14px] mt-[20px] text-gray-700">
        <div className="items-center grid border-b border-b-gray-300 pb-2 font-semibold h-[52px] grid-cols-12">
          <div className={'col-span-1'}>날짜</div>
          <div className={'col-span-2 ml-7'}>비품명</div>
          <div className={'col-span-1'}>카테고리</div>
          <div className={'col-span-2'}>위치</div>
          <div className={'col-span-1'}>매입 회사</div>
          <div className={'col-span-1'}>매입가</div>
          <div className={'col-span-2'}>매입 수량</div>
          <div className={'col-span-1'}>승인 여부</div>
          <div className={'col-span-1'}></div>
        </div>

        {approveProduct.map((ap, index) => (
          <div
            key={index}
            className="h-[52px] items-center grid grid-cols-12 border-b border-b-gray-100">
            <div className={'col-span-1'}>{new Date(ap.time).toLocaleDateString()}</div>
            <div className={'col-span-2 flex items-center'}>
              <img src={ap.image ||'#'} alt={'상품 이미지'} className={'w-[36px] h-[36px] mr-[20px] rounded bg-gray-300'}/>
              <div className="font-semibold flex items-center">{ap.name}</div>
            </div>
            <div className={'col-span-1 flex items-center'}>{ap.category}</div>
            <div className={'col-span-2 flex items-center'}>{ap.warehouseName}</div>
            <div className={'col-span-1 flex items-center'}>{ap.vendorName}</div>
            <div className={'col-span-1 flex items-center ml-2'}>{ap.price}</div>
            <div className={'col-span-2 flex items-center ml-5'}>{ap.quantity}</div>
            <p className={`col-span-1 text-gray-400 font-semibold pl-[20px] ${ap.approve === 0 ? 'text-gray-400'
              : ap.approve === 1 ? 'text-green-500': 'text-red-500'}`}
            >{ap.approve === 0 ? '대기'
              : ap.approve === 1 ? '승인'
                : '거절'}</p>

            <div className={'col-span-1 flex items-center'}>
              <button type={'button'}
                      className={'border shadow text-gray-500 border-gray-200 rounded-sm w-[44px] h-[36px] mr-1 hover:bg-gray-200'}
                      onClick={() => changeApprove(ap.idx,2)}>거절
              </button>
              <button type={'button'}
                      className={'border shadow text-gray-500 border-blue-200 rounded-sm w-[44px] h-[36px] hover:bg-blue-200'}
                      onClick={() => changeApprove(ap.idx,1)}>승인
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApproveItemList;
