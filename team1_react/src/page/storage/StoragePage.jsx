import Topline from '../../components/layout/Topline.jsx';
import StorageProductSearch from './StorageProductSearch.jsx';
import { useState } from 'react';
import StorageDateSelector from './StorageDateSelector.jsx';
import axios from 'axios';

function TestPage1() {
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 제품
  const [inputQuantity, setInputQuantity] = useState(0); // 입력 수량
  const totalQuantity = selectedItem ? selectedItem.quantity + Number(inputQuantity) : 0;
  const [showMessage, setShowMessage] = useState(false);
  const [selectedDate, setSelectedDate] = useState(''); // 날짜 선택자 상태
  const [memo, setMemo] = useState(''); // 메모 상태

  // 수량 변경 처리
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setInputQuantity(value);
    }
  };

  // 입고 완료 처리
  const handleComplete = async () => {
    if (!selectedItem || inputQuantity <= 0 || !selectedDate) {
      alert("수량을 1 이상 입력하고, 날짜를 선택해주세요.");
      return;
    }

    try {
      const updatedQuantity = selectedItem.quantity + Number(inputQuantity);

      // PUT 요청을 보냄
      const response = await axios.put(
        `http://localhost:8080/api/items/stock/${selectedItem.idx}/receive`, // 입고 처리 엔드포인트
        {
          ...selectedItem,
          quantity: updatedQuantity,
          memo: memo || null, // 메모가 비어 있으면 null 전송
          receivedDate: selectedDate // 날짜 정보 전송
        }
      );

      // 응답이 정상일 때
      if (response.status === 200) {
        // 수량 업데이트
        setSelectedItem(prevItem => ({
          ...prevItem,
          quantity: updatedQuantity
        }));

        // 성공 메시지 표시
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000); // 메시지 3초 후 사라짐
      }
    } catch (error) {
      alert("입고 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
      console.error("입고 처리 중 오류:", error);
    }
  };

  const isButtonDisabled = !selectedItem || inputQuantity <= 0 || !selectedDate;

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
                      <StorageProductSearch onSelect={(item) => {
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

                  {/* 날짜 */}
                  <div className={'w-[305px] h-[36px] flex justify-between mt-[12px]'}>
                    <StorageDateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                  </div>

                  {/* 메모 (선택 사항) */}
                  <div className={'mt-[30px]'}>
                    <textarea
                      rows={4}
                      value={memo}
                      onChange={(e) => setMemo(e.target.value)}
                      className="w-full border rounded text-sm border-gray-300 p-[8px]"
                      placeholder="메모 입력 (선택)"
                    />
                  </div>

                  {/* 완료 버튼 */}
                  <div className="pt-2">
                    <button
                      onClick={handleComplete}
                      disabled={isButtonDisabled}
                      className={`w-[86px] h-[36px] rounded-sm text-sm font-semibold ${isButtonDisabled ? 'bg-gray-100 text-gray-400 shadow cursor-default' : 'bg-gray-100 shadow text-gray-500 font-semibold text-sm hover:bg-gray-200'}`}
                    >
                      입고 완료
                    </button>

                    {showMessage && (
                      <div className="text-sm text-green-600 mt-2">
                        입고가 완료되었습니다. 총 1개 품목의 제품이 {inputQuantity}개 입고 되었습니다.
                      </div>
                    )}
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
