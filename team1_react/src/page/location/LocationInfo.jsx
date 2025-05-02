import { useState } from 'react';
import Topline from '../../theme/Topline.jsx';
import Modal from '../../Modal/Modal.jsx';
import LocationAdd from './LocationAdd.jsx';
import LocationDetail from './LocationDetail.jsx';
import Topline from '../../components/layout/Topline.jsx';

function LocationInfo() {

  const locationInfo = [
    {
      localName: '임시창고1',
      localAddress: '사상구',
      localMemo: '-',
      localTotalCount: '2',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
      localMemo: '-',
      localTotalCount: '8',
    },
    {
      localName: '임시창고2',
      localAddress: '수영구',
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
    <div className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh]  min-h-[80vh] " style={{ padding: '0px 40px 80px 40px' }} >
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
          <div className="overflow-auto w-max pretty-scrollbar flex-auto m-3 mt-4 text-center">
            <table className="w-full table-fiex border-collapse">
              <thead className="bg-white">
              <tr className="bg-white sticky top-0 z-30 border-b text-center">
                <th className="py-2 px-4 w-[200px]">이름</th>
                <th className="py-2 px-4 w-[400px]">주소</th>
                <th className="py-2 px-4 w-[200px]">재고 수량</th>
                <th className="py-2 px-4 w-[440px]">메모</th>
                <th className="py-2 px-4 w-[250px] text-right"></th>
              </tr>
              </thead>
              <tbody>
              {locationInfo.map((locationInfo, idx) => (
                <tr key={idx}
                    className="border-b border-gray-200 text-center">
                  <td className="py-2 px-4 w-[200px]">{locationInfo.localName}</td>
                  <td className="py-2 px-4 w-[400px]">{locationInfo.localAddress}</td>
                  <td className="py-2 px-4 w-[200px]">{locationInfo.localTotalCount}</td>
                  <td className="py-2 px-4 w-[440px]">{locationInfo.localMemo}</td>
                  <td className="py-2 px-4 w-[250px] text-right space-x-2">
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
      </div>
    </div>
  );
}

export default LocationInfo;