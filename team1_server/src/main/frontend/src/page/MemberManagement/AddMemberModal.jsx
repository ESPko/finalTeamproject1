import React, { useState } from 'react';

function AddMemberModal ({ isOpen, onClose, onAdd })
{
  if (!isOpen) return null;
  
  const [role, setRole] = useState('직급 선택');
  const [department, setDepartment] = useState('부서 선택');
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  
  const ModalSubmit = () => {
    const newMember = { role, name, department, userId, userPw };
    onAdd(newMember);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-gray-200/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px]">
        <div className="flex justify-between items-center px-2 py-3 border-b">
          <h2 className="text-xl font-semibold">직원추가</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>
        <div className={'px-6'}>
          <div className="flex items-center justify-between pt-3">
            <div className="mb-4">
              <div className="font-semibold mb-2">부서</div>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-[250px] border border-gray-300 rounded px-3 py-2">
                <option value="부서 선택">부서 선택</option>
                <option value="경영부">경영부</option>
                <option value="기획부">기획부</option>
                <option value="구매부">구매부</option>
                <option value="마케팅부">마케팅부</option>
                <option value="생산부">생산부</option>
              </select>
            </div>
            <div className="mb-4">
              <div className="font-semibold mb-2">직급</div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-[250px] border border-gray-300 rounded px-3 py-2">
                <option value="직급 선택">직급 선택</option>
                <option value="부장">부장</option>
                <option value="구매팀장">구매팀장</option>
                <option value="사원">사원</option>
              </select>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">이름</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={'이름을 입력하세요 (최대 10 글자)'}
              minLength={1}
              className="w-full border rounded px-3 py-2" />
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder={'ID를 입력하세요 (최대 10글자)'}
              minLength={4}
              className="w-full border rounded px-3 py-2" />
          </div>
          
          <div className="mb-4">
            <label className="block font-semibold mb-1">비밀번호</label>
            <input
              type="text"
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
              placeholder={'비밀번호 입력하세요(최소 4자리)'}
              minLength={4}
              className="w-full border rounded px-3 py-2" />
          </div>
          
          <div className="flex justify-end py-1 -mx-6 border-t"></div>
          <div className="flex justify-end gap-2 mb-2">
            
            <button onClick={ModalSubmit} className="px-4 py-2 rounded bg-blue-500 text-white">추가</button>
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-gray-700">취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;