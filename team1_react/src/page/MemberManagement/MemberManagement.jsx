import AddMemberModal from './AddMemberModal.jsx';
import { useEffect, useState } from 'react';
import Topline from '../../components/layout/Topline.jsx';
import axios from 'axios';

function MemberManagement() {
  const [employees, setEmployees] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const roleOption = ['부장', '구매 담당자', '사원'];
  const departmentOption = [ '구매부', '경영부', '기획부', '마케팅부', '생산부'];

  const roleMap = {
    0:'사원',
    1:'구매 담당자',
    2:'부장'
  }

  const reserveRoleMap ={
    '사원':0,
    '구매담당자':1,
    '부장':2
  }
  useEffect(() => {
    axios.get('http://localhost:8080/member')
      .then(res => {
        const mappedData = res.data.map((user,index) => ({
          idx:user.idx,
          id:user.id,
          name: user.nickName,
          department: user.department,
          role:roleMap[user.position],
        }));
        setEmployees(mappedData)
      })
      .catch(err => {
        console.error(err)

        })
  }, []);


  const roleToPosition = (role) => {
    switch(role){
      case '부장': return 2;
      case '구매 담당자': return 1;
      case '사원': return 0;
      default: return 0;
    }
  }

  const changeRole = async (id, newRole) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, role: newRole } : emp),
    );
    const member = employees.find(emp => emp.id === id);
    const position =roleToPosition(newRole)

    await axios.put('http://localhost:8080/updateMember', {
      idx:id,
      department: member.department,
      position:position
    })
  };

  const changeDepartment = async (id, newDepartment) => {
    setEmployees(prev =>
      prev.map(emp => emp.id === id ? { ...emp, department: newDepartment } : emp),
    );
    const member = employees.find(emp => emp.id ===id)
    const position = roleToPosition(member.role)

    await axios.put('http://localhost:8080/updateMember',{
      idx:id,
      department:newDepartment,
      position:position
    })
  };

  const DeleteMember = (idx) => {
    console.log('삭제 요청 Idx: ',idx)
    setEmployees(prev => prev.filter(emp => emp.idx !== idx));
    axios.delete('http://localhost:8080/deleteMember',{
      data:{idx:idx}
    })
      .then(res => {
        console.log('삭제 완료!', res.data)
      })
      .catch(err => {
        console.error(err)
      })
  };

  const AddMember = (newMember) => {
    const requestData = {
      id:newMember.userId,
      pass:newMember.userPw,
      nickName:newMember.name,
      department:newMember.department,
      position:reserveRoleMap[newMember.role],
    }
    axios.post('http://localhost:8080/addMember',requestData)
      .then(res =>{
        const {id, nickName, department,position} = res.data;
        const roleMap = ['사원','구매 담당자', '부장'];

        setEmployees(prev => [
          ...prev,
          {
            id:id,
            name:nickName,
            department:department,
            role:roleMap[position]
          }
        ])
          alert("직원 추가 완료")
          setIsModalOpen(false);
      })
      .catch(err => {
        console.error(err)
      })
  };
  return (
    <div className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh]  min-h-[80vh] "
           style={{ padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline
            title="직원 관리"
            actions={
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                직원 추가
              </button>
            }
          >
            <div>
              <div className="overflow-auto max-w-full pretty-scrollbar flex-auto m-3 mt-4 text-center">
                <div className="flex justify-end items-center mb-4">


                </div>

                <div className="grid grid-cols-[250px_250px_250px_1fr] text-black font-semibold border-b pb-2 mb-2">
                  <div>이름</div>
                  <div>부서</div>
                  <div>직급</div>
                </div>

                {employees.map(emp => {
                  return (
                    <div key={emp.idx}
                         className="grid grid-cols-[250px_250px_250px_1fr]  items-center py-2 border border-gray-300">
                      <div className="ml-3">{emp.name}</div>

                      <div>
                        <select
                          value={emp.department}
                          onChange={e => changeDepartment(emp.id, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1">
                          {departmentOption.map(department => (
                            <option key={department} value={department}>{department}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <select
                          value={emp.role}
                          onChange={e => changeRole(emp.id, e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1">
                          {roleOption.map(role => (
                            <option key={role} value={role}>{role}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center justify-end">
                        <button onClick={() => DeleteMember(emp.idx)} className=" border border-gray-300 text-red-500 text-sm px-3 py-1 rounded
            hover:bg-red-500 ml-2 justify-end mr-4">삭제
                        </button>
                      </div>
                    </div>
                  );
                })}

                <AddMemberModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onAdd={AddMember} />
              </div>
            </div>
          </Topline>
        </div>
      </div>
    </div>


  );
}

export default MemberManagement;
