import { useState } from 'react';

function LocationDetail({locationInfo}) {

  const [localName, setLocalName] = useState(locationInfo.localName );
  const [localMemo, setLocalMemo] = useState(locationInfo.localMemo );
  const [localAddress, setLocalAddress] = useState(locationInfo.localAddress);

  if (!locationInfo) {
    return <div>위치 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 이름 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이름<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
        />
      </div>

      {/* 주소 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          주소<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm"
          value={localAddress}
          onChange={(e) => setLocalAddress(e.target.value)}
        />
      </div>

      {/* 메모 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
        <input
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm resize-none"
          rows={4}
          value={localMemo}
          onChange={(e) => setLocalMemo(e.target.value)}
        />
      </div>
    </div>
  );
}

export default LocationDetail;