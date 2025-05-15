import AddMemberModal from './AddMemberModal.jsx';
import { useEffect, useState } from 'react';
import Topline from '../../components/layout/Topline.jsx';
import axiosInstance  from '../../api/axiosInstance.jsx';

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
    const token = localStorage.getItem('token');

    axiosInstance.get('member', {headers: {Authorization: `Bearer ${token}`}})
      .then(res => {
        console.log("서버에서 받은 데이터: ", res.data)
        const mappedData = res.data.map((user) => {
          console.log('매핑된 사용자: ', user);
          return{
            idx:user.idx,
            id:user.id,
            name: user.nickName,
            department: user.department,
            role:roleMap[user.position],
          }
        });
        setEmployees(mappedData)
      })
      .catch(err => {
        console.error(err)
        alert("접근 권한이 없습니다.")
        window.location.href = "/";

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
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, role: newRole } : emp
    );
    setEmployees(updatedEmployees);

    const member = updatedEmployees.find(emp => emp.id === id);
    console.log('직급 바꿀 직원 : ', member)
    const position = roleToPosition(newRole);

    await axiosInstance.put('/updateMember', {
      idx: member.idx,
      id:member.id,
      department: member.department,  // 여기서 최신 department 사용
      position: position
    });
  };

  const changeDepartment = async (id, newDepartment) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, department: newDepartment } : emp
    );
    setEmployees(updatedEmployees);

    const member = updatedEmployees.find(emp => emp.id === id);
    console.log('부서 바꿀 직원 : ', member)
    const position = roleToPosition(member.role);

    if (!member || member.idx === undefined) {
      console.error("유효하지 않은 member 정보", member);
      return;
    }

    await axiosInstance.put('/updateMember', {
      idx: member.idx,
      id:member.id,
      department: newDepartment,
      position: position
    });
  };

  const DeleteMember = (idx,id) => {
    console.log('삭제 요청 Idx: ',idx)
    console.log('삭제 요청 Id: ',id)
    setEmployees(prev => prev.filter(emp => emp.idx !== idx));
    axiosInstance.delete('/deleteMember',{
      data:{idx:idx, id:id}
    })
      .then(res => {
        console.log('삭제 완료!', res.data)
      })
      .catch(err => {
        console.error(err)
      })
  };

  // 직원 추가
  const AddMember = (newMember) => {

    console.log('전발 받은 newMember', newMember)
    const {userId, name, userPw} = newMember
    console.log('name:', name, 'type:', typeof name, 'length:', name ? name.length : 'no value');
    // ID 공백 방지
    if(!userId || !userId.trim()){
      alert('ID 를 입력해주세요.')
      return;
    }
    // 이름 공백 방지
    if(!name || !name.trim()){
      alert('이름 를 입력해주세요.')
      return;
    }
    // 비밀번호 4자리 이하 계정 생성 방지
    if(!userPw || !userPw.trim()){
      alert('비밀번호 를 입력해주세요.')
      return;
    }

    if(userPw.length < 4 ){
      alert('비밀번호 최소 4자리 입력해주세요.')
      return;
    }
    const requestData = {
      id:newMember.userId,
      pass:newMember.userPw,
      nickName:newMember.name,
      department:newMember.department,
      position:reserveRoleMap[newMember.role],
    }
    axiosInstance.post('/addMember',requestData)
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
        alert("직원 추가 실패")
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
                        <button onClick={() => DeleteMember(emp.idx, emp.id)} className=" border border-gray-300 text-red-500 text-sm px-3 py-1 rounded
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