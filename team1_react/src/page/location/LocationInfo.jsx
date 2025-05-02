import Topline from '../../theme/Topline.jsx';
import { useState } from 'react';
import Modal from '../../Modal/Modal.jsx';
import LocationAdd from './LocationAdd.jsx';
import LocationDetail from './LocationDetail.jsx';

function LocationInfo() {

  const locationInfo = [
    {
      localName: '임시창고1',
      localMemo: '-',
      localTotalCount: '2',
    },
    {
      localName: '임시창고2',
      localMemo: '-',
      localTotalCount: '8',
    },
  ];

  // 위치추가 모달
  const [localAdd, setLocalAdd] = useState(false);
  // 위치상세보기 모달
  const [localDetail, setLocalDetail] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <div>
      <Topline
        title="위치"
        actions={
          <button
            onClick={() => setLocalAdd(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            위치 추가
          </button>
        }
      >
        <div>
          {/* 테이블 */}
          <div className="overflow-auto w-full pretty-scrollbar flex-auto m-3 mt-4 text-center">
            <table className="min-w-full table-fixed border-collapse">
              <thead className="bg-white">
              <tr className="bg-white sticky top-0 z-30 border-b text-left">
                <th className="py-2 px-4">이름</th>
                <th className="py-2 px-4">재고 수량</th>
                <th className="py-2 px-4">메모</th>
                <th className="py-2 px-4 text-right"></th>
              </tr>
              </thead>
              <tbody>
              {locationInfo.map((locationInfo, idx) => (
                <tr key={idx}
                    className="border-b border-gray-200 text-left">
                  <td className="py-2 px-4">{locationInfo.localName}</td>
                  <td className="py-2 px-4">{locationInfo.localTotalCount}</td>
                  <td className="py-2 px-4">{locationInfo.localMemo}</td>
                  <td className="py-2 px-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedLocation(locationInfo); // 현재 반복 중인 항목
                        setLocalDetail(true);
                      }}
                      className="px-2 py-1 border rounded text-sm hover:bg-gray-100">수정
                    </button>
                    <button className="px-2 py-1 border rounded text-sm hover:bg-gray-100">삭제</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </Topline>
      {/*위치추가*/}
      <Modal
        isOpen={localAdd}
        onClose={() => setLocalAdd(false)}
        title="위치 추가"
        footer={
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">추가</button>
            <button
              onClick={() => setLocalAdd(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              취소
            </button>
          </>
        }
      >
        <LocationAdd />
      </Modal>
      {/*위치 상세보기*/}

      <Modal
        isOpen={localDetail}
        onClose={() => setLocalDetail(false)}
        title="위치 수정"
        footer={
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">수정</button>
            <button
              onClick={() => setLocalDetail(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              취소
            </button>
          </>
        }
      >
        <LocationDetail locationInfo={selectedLocation} />
      </Modal>


    </div>
  );
}

export default LocationInfo;