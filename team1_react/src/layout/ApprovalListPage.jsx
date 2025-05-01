function ApprovalListPage() {
  return (
    <div className={'h-[52px] items-center grid grid-cols-12 border-b border-b-gray-100'}>
      <div className={'col-span-1'}>2025.05.01</div>
      <div className={'col-span-3'}>제품명</div>
      <div className={'col-span-2'}>창고2</div>
      <div className={'col-span-2'}>50,000</div>
      <div className={'col-span-2'}>ㅇㅇㅇ</div>
      <div className={'col-span-1 text-gray-400'}>대기</div>
      <div className={'col-span-1'}>
        <button type={'button'} className={'border shadow border-gray-300 rounded-sm w-[44px] h-[36px] mr-1 hover:bg-gray-300'}>거절</button>
        <button type={'button'} className={'border shadow border-blue-300 rounded-sm w-[44px] h-[36px] hover:bg-blue-300'}>승인</button>
      </div>
    </div>
  );
}

export default ApprovalListPage