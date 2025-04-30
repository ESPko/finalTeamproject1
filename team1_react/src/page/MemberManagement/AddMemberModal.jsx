import { useState } from 'react';

function AddMemberModal({isOpen, onClose, onAdd}) {
  if (!isOpen) return null

  const [role,setRole] = useState('사원');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [addr,setAddr] = useState('');
  const [memo,setMemo] = useState('');

  const ModalSubmit = () => {
    if (!name.trim()) return
    const newMember = {role, name, phone, email, addr, memo}
    onAdd(newMember)
    onclose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[500px] p-6">
        <h2 className="font-bold mb-2">직원 추가</h2>

        <div className="mb-4 mt-5">
          <label className="font-semibold mb-2">직급</label>
          <div className="flex gap-4">
            {['부장','구매팀장','사원'].map((roleOption) => (
              <label key={roleOption} className="flex items-center gap1">
                <input
                type="radio" name="role" value={roleOption} checked={role === roleOption} onChange={() => setRole(roleOption)}
                className="accent-blue-700"/>
                {roleOption}
              </label>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">이름</label>
          <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={'이름을 입력하세요'}
          className="w-full border rounded px-3 py-2"/>
        </div>

        <div className="mb-4 flex gap-4">
          <div className="w-1/2">
          <label className="block font-semibold mb-1">전화번호</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={'전화번호를 입력하세요'}
            className="w-full border rounded px-3 py-2"/>
        </div>

        <div className="w-1/2">
          <label className="block font-semibold mb-1">이메일</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={'이메일을 입력하세요'}
            className="w-full border rounded px-3 py-2"/>
        </div>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">주소</label>
          <input
            type="text"
            value={addr}
            onChange={(e) => setAddr(e.target.value)}
            placeholder={'주소를 입력하세요'}
            className="w-full border rounded px-3 py-2"/>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">메모</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder={'기타사항을 입력하세요'}
            className="w-full border rounded px-3 py-2" rows="3"/>
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded border bg-white hover:bg-gray-400">취소</button>
          <button onClick={ModalSubmit} className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">추가</button>

        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
