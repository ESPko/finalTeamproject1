import Topline from '../../components/layout/Topline.jsx';
import StorageProductSearch from './StorageProductSearch.jsx';
import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

function TestPage1() {
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [inputQuantity, setInputQuantity] = useState(0);
  const totalQuantity = selectedItem ? selectedItem.quantity + Number(inputQuantity) : 0;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setInputQuantity(value);
    }
  };

  const handleComplete = async () => {
    const isConfirmed = window.confirm('입고를 완료하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const updatedQuantity = selectedItem.quantity + Number(inputQuantity);

      const response = await axiosInstance.put(
        `/api/items/${selectedItem.idx}/receive`,
        {
          ...selectedItem,
          quantity: updatedQuantity,
          approve: 1,
          userId: user.id,
        }
      );

      if (response.status === 200) {
        alert(`제품이 ${Number(inputQuantity)}개 입고 완료되었습니다.`);

        const refreshedItem = await axiosInstance.get(`/api/items/${selectedItem.idx}`);
        setSelectedItem(refreshedItem.data);

        setSelectedItem(null);
        setInputQuantity(0);
      }
    } catch (error) {
      alert('입고 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
      console.error('입고 처리 중 오류:', error);
    }
  };

  const isButtonDisabled = !selectedItem || inputQuantity <= 0;

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px' }}>
        <Topline title="입고">
          <div className="bg-danger mt-[25px]">
            <div className="text-gray-700 h-[51px] text-[14px] font-semibold border-b border-b-gray-300 flex items-center">
              제품 목록
            </div>

            <div className="text-[14px] text-gray-700">
              <div className="p-4 flex border-b-gray-300 pb-2 font-semibold h-[52px]">
                <div className="w-[1020px] pl-[30px]">제품*</div>
                <div className="w-[180px] text-center">현재 재고</div>
                <div className="w-[180px] text-center">수량*</div>
              </div>

              <div className="flex items-center border-b-gray-100 h-[52px]">
                <div className="w-[1020px] pl-[30px] p-4">
                  <StorageProductSearch
                    selectedItem={selectedItem}
                    onSelect={(item) => {
                      setSelectedItem(item);
                      setInputQuantity(0);
                    }}
                  />
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

              <div className="flex justify-end items-center h-[52px] border-b-gray-300 text-[16px] font-bold">
                <span className="mr-[60px]">
                  총 수량
                  <span className="text-blue-500 font-semibold pl-3">{totalQuantity}</span>
                </span>
              </div>
            </div>

            <div className="mt-[20px]">
              <div className="w-[305px] h-[36px] flex justify-between">
                <label className="block font-semibold">위치</label>
                <div className="w-[220px] border border-gray-300 rounded text-gray-400 flex items-center px-2 font-semibold text-sm">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap w-full" title={selectedItem ? selectedItem.warehouseName : '위치'}>
                    {selectedItem ? selectedItem.warehouseName : '위치'}
                  </div>
                </div>
              </div>

              <div className="w-[305px] h-[36px] flex justify-between mt-[12px]">
                <label className="block font-semibold">입고처</label>
                <div className="w-[220px] border border-gray-300 rounded text-gray-400 flex items-center px-2 font-semibold text-sm">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap w-full" title={selectedItem ? selectedItem.vendorName : '입고처'}>
                    {selectedItem ? selectedItem.vendorName : '입고처'}
                  </div>
                </div>
              </div>

              <div className="w-[305px] h-[36px] flex justify-between mt-[12px]">
                <label className="block font-semibold">카테고리</label>
                <div className="w-[220px] border border-gray-300 rounded text-gray-400 items-center justify-center flex font-semibold text-sm">
                  <div className="overflow-hidden text-ellipsis whitespace-nowrap w-full" title={selectedItem ? selectedItem.category : '카테고리'}>
                    {selectedItem ? selectedItem.category : '카테고리'}</div>
                </div>
              </div>

              <div className="pt-[80px]">
                <button
                  onClick={handleComplete}
                  disabled={isButtonDisabled}
                  className={`w-[86px] h-[36px] rounded-sm text-sm font-semibold ${
                    isButtonDisabled
                      ? 'bg-gray-100 text-gray-400 shadow cursor-default'
                      : 'bg-blue-400 shadow text-white hover:bg-blue-500'
                  }`}
                >
                  입고 완료
                </button>
              </div>
            </div>
          </div>
        </Topline>
      </div>
    </div>
  );
}

export default TestPage1;
