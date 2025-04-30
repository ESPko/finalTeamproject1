import { useState } from 'react';
import AddMemberModal from './AddMemberModal.jsx';

function MemberManagementList() {
  const [employees, setEmployees] = useState([
    { id: 1, name: '직원1', role: '부장', memo: '모든 권한을 소유하고 있습니다.' },
    { id: 2, name: '직원2', role: '구매팀장', memo: '' },
    { id: 3, name: '직원3', role: '사원', memo: '' },
    { id: 4, name: '직원4', role: '사원', memo: '' },
    { id: 5, name: '직원5', role: '사원', memo: '' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false)

  const roleOption = ['부장', '구매팀장', '사원'];

  const changeRole = (id, newRole) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, role: newRole } : emp),
    );
  };

  const DeleteMember = (id) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const AddMember = (newMember) => {
    // 고유한 ID 생성을 위한 것
    const newId = Date.now();
    setEmployees(prev => [
      ...prev,
      { id: newId, ...newMember},
    ]);
    setIsModalOpen(false)
  };

  return (
    <div className="max-w-[1500px] mx-auto mt-8 p-4 bg-white rounded ">
      <div className="flex justify-end items-center mb-4">

        <button onClick={() =>setIsModalOpen(true)} className="bg-blue-500 text-white font-bold px-3 py-2 rounded hover:bg-blue-600">+
          직원 추가
        </button>
      </div>

      <div className="grid grid-cols-[150px_150px_1fr] text-black font-semibold border-b pb-2 mb-2">
        <div>이름</div>
        <div>직급</div>
        <div>메모</div>
      </div>

      {employees.map(emp => {
        return (
        <div key={emp.id} className="grid grid-cols-[150px_150px_1fr] items-center py-2 border border-gray-500">
          <div className="ml-3">{emp.name}</div>
          <div>
            <select
              value={emp.role}
              onChange={e => changeRole(emp.id, e.target.value)} className="border rounded px-2 py-1">
              {roleOption.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{emp.memo}</span>
            <button onClick={() => DeleteMember(emp.id)} className=" border text-red-500 text-sm px-3 py-1 rounded
            hover:bg-red-500 ml-2 justify-end">삭제
            </button>
          </div>
        </div>
      )
      })}

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={AddMember}/>
    </div>
  );
}

export default MemberManagementList;
