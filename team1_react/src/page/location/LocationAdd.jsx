import { useState } from 'react';
import axios from 'axios';

function LocationAdd({ onClose, onAddLocation }) {
  // 상태 관리
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');

  // 위치 추가 함수
  const handleAddLocation = () => {
    if (!locationName || !address) {
      alert("위치 이름과 주소는 필수입니다.");
      return;
    }

    const newLocation = {
      name: locationName,
      location: address,
      memo: memo,
    };

    axios.post('http://localhost:8080/warehouse/addLocation', newLocation)
      .then(() => {
        alert('위치가 성공적으로 추가되었습니다.');
        onAddLocation();  // 위치 추가 후 갱신
        onClose();
        // 추가 성공 후 필요한 처리 (예: 창고 목록 갱신)
      })
      .catch((error) => {
        console.error('위치 추가 실패:', error);
        alert('위치 추가에 실패했습니다.');
      });
  };

  return (
    <div className="space-y-6">
      {/* 이름 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이름<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={locationName}
          onChange={(e) => setLocationName(e.target.value)}
          placeholder="위치 이름을 입력해주세요."
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* 주소 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          주소<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소를 입력해주세요."
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* 메모 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모를 입력해주세요."
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm resize-none"
          rows={4}
        />
      </div>


      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={handleAddLocation}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          추가
        </button>
        <button onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">취소</button>
      </div>
    </div>
  );
}

export default LocationAdd;