import Topline from '../../components/layout/Topline.jsx';
import StorageProductSearch from './StorageProductSearch.jsx';
import { useState } from 'react';
import StorageDateSelector from './StorageDateSelector.jsx';
import axiosInstance from '../../api/axiosInstance.jsx';

function TestPage1() {
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 제품
  const [inputQuantity, setInputQuantity] = useState(0); // 입력 수량
  const totalQuantity = selectedItem ? selectedItem.quantity + Number(inputQuantity) : 0;

  // 수량 변경 처리
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) { // 0 이상일 경우만 수량을 업데이트
      setInputQuantity(value);
    }
  };

  // 입고 완료 처리
  const handleComplete = async () => {

    // 취소 확인 팝업
    const isConfirmed = window.confirm("입고를 완료하시겠습니까?");

    if (!isConfirmed) {
      return; // 사용자가 취소를 클릭하면 함수 종료
    }

    try {
      const updatedQuantity = selectedItem.quantity + Number(inputQuantity);

      // PUT 요청을 보냄
      const response = await axiosInstance.put(
        `/api/items/${selectedItem.idx}/receive`, // 입고 처리 엔드포인트
        {
          ...selectedItem,
          quantity: updatedQuantity,
          approve: 1,
        }
      );

      // 응답이 정상일 때
      if (response.status === 200) {
        // 수량 업데이트
        setSelectedItem(prevItem => ({
          ...prevItem,
          quantity: updatedQuantity
        }));

        alert(`제품이 ${Number(inputQuantity)}개 입고 완료되었습니다.`);

        // 입고 완료 후 서버에서 최신 데이터 다시 불러오기
        const refreshedItem = await axios.get(`http://localhost:8080/api/items/${selectedItem.idx}`);
        setSelectedItem(refreshedItem.data);

        // 상태 초기화
        setSelectedItem(null);
        setInputQuantity(0);
        // setMemo(''); // 메모를 비워도 되므로 주석 처리
      }
    } catch (error) {
      alert("입고 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("입고 처리 중 오류:", error);
    }
  };

  // 버튼 활성화 조건 변경 (날짜 부분을 제외하고 수량과 제품이 있을 때만 활성화)
  const isButtonDisabled = !selectedItem || inputQuantity <= 0;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline title="입고">
            <div>
              <div className="bg-danger mt-[25px]">
                <div className={'text-gray-700 h-[51px] text-[14px] font-semibold border-b-1 border-b-gray-300 flex items-center'}>제품 목록</div>
                <div className="text-[14px] text-gray-700">
                  <div className="p-4 flex border-b-gray-300 pb-2 font-semibold h-[52px]">
                    <div className="w-[1020px] pl-[30px]">제품*</div>
                    <div className="w-[180px] text-center">현재 재고</div>
                    <div className="w-[180px] text-center">수량*</div>
                  </div>

                  {/* 입력 필드 */}
                  <div className="flex items-center border-b-gray-100 h-[52px]">
                    <div className="w-[1020px] pl-[30px] p-4">
                      <StorageProductSearch
                        selectedItem={selectedItem}
                        onSelect={(item) => {
                          setSelectedItem(item);
                          setInputQuantity(0); // 선택 시 수량 초기화
                        }} />
                    </div>
                    <div className="w-[180px] text-gray-400 justify-center flex mr-[80px]">
                      {selectedItem ? selectedItem.quantity : '-'}
                    </div>
                    <div className="w-[180px] justify-end flex">
                      <input
                        type="number"
                        value={inputQuantity}
                        onChange={handleQuantityChange}
                        className="w-full border p-3 border-gray-300 rounded h-[36px] text-gray-400 fw-bold"
                      />
                    </div>
                  </div>

                  {/* 총 수량 */}
                  <div className="flex justify-end items-center h-[52px] border-b-gray-300 text-[16px] font-bold">
                    <span className="mr-[60px]">총 수량
                      <span className="text-blue-500 font-semibold pl-3">{totalQuantity}</span>
                    </span>
                  </div>
                </div>

                <div className={'mt-[20px]'}>
                  {/* 위치 */}
                  <div className={'w-[305px] h-[36px] flex justify-between'}>
                    <label className="block font-semibold">위치</label>
                    <div className="w-[220px] border border-gray-300 rounded text-gray-400 items-center justify-center flex font-semibold text-sm">
                      <div>{selectedItem ? selectedItem.warehouseName : '위치'}</div>
                    </div>
                  </div>

                  {/* 입고처 */}
                  <div className={'w-[305px] h-[36px] flex justify-between mt-[12px]'}>
                    <label className="block font-semibold">입고처</label>
                    <div className="w-[220px] border border-gray-300 rounded text-gray-400 items-center justify-center flex font-semibold text-sm">
                      <div>{selectedItem ? selectedItem.vendorName : '입고처'}</div>
                    </div>
                  </div>

                  {/* 완료 버튼 */}
                  <div className="pt-[80px]">
                    <button
                      onClick={handleComplete}
                      disabled={isButtonDisabled}
                      className={`w-[86px] h-[36px] rounded-sm text-sm font-semibold ${isButtonDisabled ? 'bg-gray-100 text-gray-400 shadow cursor-default' : 'bg-gray-100 shadow text-gray-500 font-semibold text-sm hover:bg-gray-200'}`}
                    >
                      입고 완료
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Topline>
        </div>
      </div>
    </div>
  );
}

export default TestPage1;
