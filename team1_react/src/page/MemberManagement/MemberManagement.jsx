
import AddMemberModal from './AddMemberModal.jsx';
import { useState } from 'react';
import Topline from '../../components/layout/Topline.jsx';

function MemberManagement() {
  const [employees, setEmployees] = useState([
    { id: 1, name: '직원1', department: '구매부', role: '부장' },
    { id: 2, name: '직원2', department: '구매부', role: '구매팀장' },
    { id: 3, name: '직원3', department: '구매부', role: '사원'},
    { id: 4, name: '직원4', department: '구매부', role: '사원' },
    { id: 5, name: '직원5', department: '구매부', role: '사원' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false)

  const roleOption = ['부장', '구매팀장', '사원'];
  const departmentOption = ['경영부','기획부','마케팅부','생산부','구매부'];

  const changeRole = (id, newRole) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, role: newRole } : emp),
    );
  };

  const changeDepartment = (id, newDepartment) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, department: newDepartment } : emp),
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
    <div>
      <Topline
        title="직원 관리"
        actions={
          <button onClick={() =>setIsModalOpen(true)} className="bg-blue-500 text-white font-bold px-3 py-2 rounded hover:bg-blue-600">+
            직원 추가
          </button>
        }
        >

      <div className="w-[1500px]"></div>
        <div className="max-w-[1500px] mx-auto mt-8 p-4 bg-white rounded ">
          <div className="flex justify-end items-center mb-4">


          </div>

          <div className="grid grid-cols-[250px_250px_250px_1fr] text-black font-semibold border-b pb-2 mb-2">
            <div>이름</div>
            <div>부서</div>
            <div>직급</div>
          </div>

          {employees.map(emp => {
            return (
              <div key={emp.id} className="grid grid-cols-[250px_250px_250px_1fr] items-center py-2 border border-gray-300">
                <div className="ml-3">{emp.name}</div>

                <div>
                  <select
                    value={emp.department}
                    onChange={e => changeDepartment(emp.id, e.target.value)} className="border border-gray-300 rounded px-2 py-1">
                    {departmentOption.map(department => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    value={emp.role}
                    onChange={e => changeRole(emp.id, e.target.value)} className="border border-gray-300 rounded px-2 py-1">
                    {roleOption.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end">
                  <button onClick={() => DeleteMember(emp.id)} className=" border border-gray-300 text-red-500 text-sm px-3 py-1 rounded
            hover:bg-red-500 ml-2 justify-end mr-4">삭제
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
      </Topline>
    </div>
  );
}

export default MemberManagement;
