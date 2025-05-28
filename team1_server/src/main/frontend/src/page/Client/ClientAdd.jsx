import { useState } from 'react';
import axiosInstance from '../../api/axiosInstance.jsx';
import Swal from 'sweetalert2';

function ClientAdd ({ onClose, onSuccess })
{
  const [client, setClient] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    memo: '',
  });
  
  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };
  
  // 유효성 검사 함수
  const validateForm = () => {
    if (!client.name || !client.phone || !client.email || !client.location)
    {
      Swal.fire({
        icon: 'warning',
        title: '필수 내용이 누락되었습니다',
        text: '모든 필수 항목을 입력해 주세요.',
      });
      return false;
    }
    return true;
  };
  
  const handleSubmit = async () => {
    // 유효성 검사 통과하지 못하면 리턴
    if (!validateForm())
    {
      return;
    }
    
    // 전화번호가 숫자가 아닌 경우
    if (isNaN(client.phone) || client.phone.trim() === '')
    {
      Swal.fire({
        icon: 'warning',
        title: '전화번호는 숫자만<br />입력 가능합니다.',
        
        text: '전화번호를 올바르게 입력해 주세요.',
      });
      return;
    }
    
    // 이메일에 '@'가 포함되어 있는지 확인
    if (!client.email.includes('@'))
    {
      Swal.fire({
        icon: 'warning',
        title: '유효하지 않은 <br /> 이메일 주소입니다.',
        text: '이메일 주소에 "@"를 포함해 주세요.',
      });
      return;
    }
    
    // '입력하신 매입처를 추가하시겠습니까?' 확인 창 띄우기
    const result = await Swal.fire({
      icon: 'question',
      title: '입력하신 매입처를 <br /> 추가하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '추가',
      cancelButtonText: '취소',
    });
    
    // 사용자가 '추가'를 클릭했을 때만 실제 API 호출
    if (result.isConfirmed)
    {
      axiosInstance.post('/vendor/vendorAdd', client)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: '매입처가 추가되었습니다.',
            confirmButtonText: '확인',
          });
          onSuccess();
          onClose();
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: '추가 중 오류가 발생했습니다.',
            text: '잠시 후 다시 시도해 주세요.',
            confirmButtonText: '확인',
          });
        });
    }
  };
  
  return (
    <div>
      <div className="space-y-6">
        {/* 이름 */}
        <div>
          <label className="block font-medium mb-1">
            이름<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="거래처의 이름을 입력해 주세요."
            value={client.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        
        {/* 전화번호 + 이메일 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              전화번호<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="phone"
              placeholder="전화번호를 입력해 주세요."
              value={client.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              이메일<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="이메일 주소를 입력해 주세요."
              value={client.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>
        
        {/* 주소 */}
        <div>
          <label className="block font-medium mb-1">
            주소<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="거래처의 주소를 입력해 주세요."
            value={client.location}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        
        {/* 메모 */}
        <div>
          <label className="block font-medium mb-1">메모</label>
          <textarea
            name="memo"
            placeholder="거래처와 관련된 메모를 입력해 주세요."
            value={client.memo}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 resize-none"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 px-4 py-2 border-t -mx-4 -mb-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          추가
        </button>
        <button
          onClick={onClose}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
        >
          취소
        </button>
      </div>
    
    </div>
  );
}

export default ClientAdd;
