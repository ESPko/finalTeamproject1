import Swal from 'sweetalert2';
import { useAuth } from '../../contexts/AuthContext.jsx';

function ApproveItemList({ approveProduct, changeApprove }) {
  const { user } = useAuth();
  const isDisabled = user?.position !== 2;

  const handleApproveClick = (idx, type) => {
    const action = type === 1 ? '승인' : '거절';

    Swal.fire({
      title: `${action}하시겠습니까?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `${action}`,
      cancelButtonText: '취소',
      confirmButtonColor: type === 1 ? '#3b82f6' : '#ef4444', // Tailwind blue-500 or red-500
    }).then((result) => {
      if (result.isConfirmed) {
        changeApprove(idx, type);
        Swal.fire(`${action}되었습니다.`, '', 'success');
      }
    });
  };

  return (
    <div>
      <div className="text-[14px] mt-[20px] text-gray-700">
        <div className="items-center grid border-b border-b-gray-300 pb-2 font-semibold h-[52px] grid-cols-12">
          <div className="col-span-1">날짜</div>
          <div className="col-span-2 ml-7">비품명</div>
          <div className="col-span-1">카테고리</div>
          <div className="col-span-2">위치</div>
          <div className="col-span-2">매입 회사</div>
          <div className="col-span-1">매입가</div>
          <div className="col-span-1">매입 수량</div>
          <div className="col-span-1">승인 여부</div>
          <div className="col-span-1"></div>
        </div>

        {approveProduct.map((ap, index) => (
          <div
            key={index}
            className="break-all whitespace-normal items-center grid grid-cols-12 border-b border-b-gray-100"
          >
            <div className="col-span-1">{new Date(ap.time).toLocaleDateString()}</div>

            <div className="col-span-2 flex items-center">
              <img
                src={ap.image || '#'}
                alt="상품 이미지"
                className="w-[60px] h-[60px] m-2 mr-[20px] rounded"
              />
              <div className="font-semibold flex items-center mr-5">{ap.name}</div>
            </div>

            <div className="col-span-1 flex items-center mr-5">{ap.category}</div>
            <div className="col-span-2 flex items-center mr-5">{ap.warehouseName}</div>
            <div className="col-span-2 flex items-center mr-5">{ap.vendorName}</div>
            <div className="col-span-1 flex items-center">{ap.price}</div>
            <div className="col-span-1 flex items-center">{ap.quantity}</div>

            <p
              className={`col-span-1 font-semibold pl-[20px] ${
                ap.approve === 0
                  ? 'text-gray-400'
                  : ap.approve === 1
                    ? 'text-blue-400'
                    : ap.approve === 2
                      ? 'text-red-400'
                      : 'text-blue-400'
              }`}
            >
              {ap.approve === 0
                ? '승인 대기'
                : ap.approve === 1
                  ? '승인'
                  : ap.approve === 2
                    ? '거절'
                    : '승인'}
            </p>

            <div className="col-span-1 flex items-center">
              <button
                type="button"
                disabled={isDisabled}
                className={`border shadow font-semibold rounded-sm w-[44px] h-[36px] mr-1 ${
                  isDisabled
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 border-gray-200 hover:bg-gray-200'
                }`}
                onClick={() => handleApproveClick(ap.idx, 2)}
              >
                거절
              </button>
              <button
                type="button"
                disabled={isDisabled}
                className={`border shadow font-semibold rounded-sm w-[44px] h-[36px] ${
                  isDisabled
                    ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                    : 'text-gray-500 border-blue-200 hover:bg-blue-300'
                }`}
                onClick={() => handleApproveClick(ap.idx, 1)}
              >
                승인
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApproveItemList;
