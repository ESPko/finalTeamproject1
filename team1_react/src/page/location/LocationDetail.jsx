import { useEffect, useState } from 'react';

function LocationDetail({ locationInfo, onClose, onUpdate }) {
  const [localName, setLocalName] = useState('');
  const [localMemo, setLocalMemo] = useState('');
  const [localAddress, setLocalAddress] = useState('');

  useEffect(() => {
    if (locationInfo) {
      setLocalName(locationInfo.name);
      setLocalMemo(locationInfo.memo);
      setLocalAddress(locationInfo.location);
    }
  }, [locationInfo]);

  const handleSave = () => {
    const updatedLocation = {
      name: localName,
      memo: localMemo,
      location: localAddress,
      idx: locationInfo.idx // 수정된 항목의 idx 값 포함
    };

    // 수정된 위치 정보를 부모에게 전달하여 상태 업데이트
    onUpdate(updatedLocation);
    onClose(); // 모달을 닫음
  };

  if (!locationInfo) {
    return <div>위치 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">이름<span className="text-red-500 ml-1">*</span></label>
        <input
          type="text"
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">주소<span className="text-red-500 ml-1">*</span></label>
        <input
          type="text"
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm"
          value={localAddress}
          onChange={(e) => setLocalAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
        <input
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm resize-none"
          rows={4}
          value={localMemo}
          onChange={(e) => setLocalMemo(e.target.value)}
        />
      </div>

      <div className="flex justify-end space-x-4 mt-4">
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded" onClick={onClose}>취소</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleSave}>수정</button>
      </div>
    </div>
  );
}

export default LocationDetail;
