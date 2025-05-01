import MemberManagementList from './MemberManagementList.jsx';
import AddMemberModal from './AddMemberModal.jsx';

function MemberManagement() {
  return (
    <div className="px-10 pb-20">
      <div className="bg-blue-500 w-[1500px] h-[82px] flex items-center justify-between px-5">
        <div className="text-[24px] leading-[82px]">직원 관리</div>
      </div>

      <div className="w-[1500px]"></div>
      <MemberManagementList/>

      <AddMemberModal/>
    </div>
  );
}

export default MemberManagement;
