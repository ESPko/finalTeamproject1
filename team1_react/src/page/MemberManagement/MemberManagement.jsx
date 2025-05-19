import AddMemberModal from './AddMemberModal.jsx';
import { useEffect, useState } from 'react';
import Topline from '../../components/layout/Topline.jsx';
import axiosInstance from '../../api/axiosInstance.jsx';
import Swal from 'sweetalert2';

function MemberManagement() {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const roleOption = ['부장', '구매 담당자', '사원'];
  const departmentOption = ['구매부', '경영부', '기획부', '마케팅부', '생산부'];

  const roleMap = {
    0: '사원',
    1: '구매 담당자',
    2: '부장',
  };

  const reserveRoleMap = {
    '사원': 0,
    '구매 담당자': 1,
    '부장': 2,
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    axiosInstance.get('member', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const mappedData = res.data.map((user) => ({
          idx: user.idx,
          id: user.id,
          name: user.nickName,
          department: user.department,
          role: roleMap[user.position],
        }));
        setEmployees(mappedData);
      })
      .catch(err => {
        console.error(err);
        Swal.fire('접근 권한이 없습니다.', '', 'error').then(() => {
          window.location.href = '/';
        });
      });
  }, []);

  const roleToPosition = (role) => {
    switch (role) {
      case '부장':
        return 2;
      case '구매 담당자':
        return 1;
      case '사원':
        return 0;
      default:
        return 0;
    }
  };

  const changeRole = async (id, newRole) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, role: newRole } : emp
    );
    setEmployees(updatedEmployees);

    const member = updatedEmployees.find(emp => emp.id === id);
    const position = roleToPosition(newRole);

    await axiosInstance.put('/updateMember', {
      idx: member.idx,
      id: member.id,
      department: member.department,
      position: position,
    });
  };

  const changeDepartment = async (id, newDepartment) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === id ? { ...emp, department: newDepartment } : emp
    );
    setEmployees(updatedEmployees);

    const member = updatedEmployees.find(emp => emp.id === id);
    const position = roleToPosition(member.role);

    if (!member || member.idx === undefined) {
      console.error('유효하지 않은 member 정보', member);
      return;
    }

    await axiosInstance.put('/updateMember', {
      idx: member.idx,
      id: member.id,
      department: newDepartment,
      position: position,
    });
  };

  const DeleteMember = (idx, id) => {
    Swal.fire({
      title: '삭제 확인',
      text: '해당 직원 정보를 삭제시키겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (!result.isConfirmed) return;

      setEmployees(prev => prev.filter(emp => emp.idx !== idx));
      axiosInstance.delete('/deleteMember', {
        data: { idx: idx, id: id },
      })
        .then(res => {
          Swal.fire('삭제 완료', '', 'success');
        })
        .catch(err => {
          console.error(err);
          Swal.fire('삭제 실패', '', 'error');
        });
    });
  };

  const AddMember = (newMember) => {
    const { userId, name, userPw, role, department } = newMember;

    if (!userId || !userId.trim()) {
      Swal.fire('ID를 입력해주세요.', '', 'warning');
      return;
    }
    if (userId.length < 4) {
      Swal.fire('ID를 최소 4자리 이상 입력해주세요.', '', 'warning');
      return;
    }
    if (!name || !name.trim()) {
      Swal.fire('이름을 입력해주세요.', '', 'warning');
      return;
    }
    if (!userPw || !userPw.trim()) {
      Swal.fire('비밀번호를 입력해주세요.', '', 'warning');
      return;
    }
    if (userPw.length < 4) {
      Swal.fire('비밀번호를 최소 4자리 이상 입력해주세요.', '', 'warning');
      return;
    }
    if (department === '부서 선택') {
      Swal.fire('부서를 선택해주세요.', '', 'warning');
      return;
    }
    if (role === '직급 선택') {
      Swal.fire('직급을 선택해주세요.', '', 'warning');
      return;
    }

    const requestData = {
      id: newMember.userId,
      pass: newMember.userPw,
      nickName: newMember.name,
      department: newMember.department,
      position: reserveRoleMap[newMember.role],
    };

    axiosInstance.post('/addMember', requestData)
      .then(res => {
        const { id, nickName, department, position } = res.data;
        const roleMap = ['사원', '구매 담당자', '부장'];

        setEmployees(prev => [
          ...prev,
          {
            id: id,
            name: nickName,
            department: department,
            role: roleMap[position],
          },
        ]);
        Swal.fire('직원 추가 완료', '', 'success');
        setIsModalOpen(false);
      })
      .catch(err => {
        console.error(err);
        Swal.fire('직원 추가 실패', '', 'error');
      });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px 40px' }}>
        <Topline
          title="직원 관리"
          actions={
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-500 text-white w-[86px] h-[36px] rounded-sm text-sm font-semibold"
            >
              직원 추가
            </button>
          }
        >
          <div className="overflow-auto max-w-full pretty-scrollbar flex-auto">
            <div className="mt-10"></div>
            <div className="grid grid-cols-[250px_250px_250px_1fr] text-gray-600 font-semibold border-b border-gray-200 p-3">
              <div>이름</div>
              <div>부서</div>
              <div>직급</div>
            </div>
            {employees.map(emp => (
              <div key={emp.idx} className="grid grid-cols-[250px_250px_250px_1fr] items-center py-2 border-b border-gray-100">
                <div className="ml-3 text-gray-700">{emp.name}</div>
                <div>
                  <select
                    value={emp.department}
                    onChange={e => changeDepartment(emp.id, e.target.value)}
                    className="border border-gray-300 rounded-sm w-[150px] h-[36px] shadow text-sm text-gray-600"
                  >
                    {departmentOption.map(department => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    value={emp.role}
                    onChange={e => changeRole(emp.id, e.target.value)}
                    className="border border-gray-300 rounded-sm w-[150px] h-[36px] shadow text-sm text-gray-600"
                  >
                    {roleOption.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    onClick={() => DeleteMember(emp.idx, emp.id)}
                    className="border border-gray-200 text-red-400 text-sm px-3 py-1 rounded-sm hover:bg-gray-200 justify-end mr-4"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
            <AddMemberModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onAdd={AddMember}
            />
          </div>
        </Topline>
      </div>
    </div>
  );
}

export default MemberManagement;
