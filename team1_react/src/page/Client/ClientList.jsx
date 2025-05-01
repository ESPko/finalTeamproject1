import { useState } from 'react';
import Topline from '../../layout/Topline.jsx';
import Modal from '../../Modal/Modal.jsx';
import LocationAdd from '../location/LocationAdd.jsx';
import LocationDetail from '../location/LocationDetail.jsx';
import SearchIcon from '../../icon/SearchIcon.jsx';
import { FiSettings } from 'react-icons/fi';
import ClientAdd from './ClientAdd.jsx';
import ClientDetail from './ClientDetail.jsx';

function ClientList() {

  const clients = [
    {
      clientType: '입고처',
      clientName: '임시입고거래처1',
      clientPhoneNumber: '010-1234-5678',
      clientEmail: 'example@email.com',
      clientAddress: '서울특별시 강남구 ...',
      clientNote: ' 매월 정기납품'
    },
    {
      clientType: '출고처',
      clientName: '임시입고거래처2',
      clientPhoneNumber: '010-1234-5678',
      clientEmail: 'example@email.com',
      clientAddress: '서울특별시 강남구 ...',
      clientNote: 'VIP 거래처'
    },
  ];

  // 거래처추가 모달
  const [clientAdd, setClientAdd] = useState(false);
  // 거래처상세보기 모달
  const [selectedClient, setSelectedClient] = useState(false);
  const [clientDetailModal, setClientDetailModal] = useState(null);
  const clientClick = (client) => {
    setSelectedClient(client);
    setClientDetailModal(true);
  }



  return (
    <main className=" flex-1 p-6 overflow-y-auto ">
      <div className="bg-white rounded shadow p-4 h-full min-w-[840px] overflow-auto" style={{ padding: '0px 40px 80px 40px' }}>
    <div>
      <Topline
        title="거래처"
        actions={
          <button
            onClick={() => setClientAdd(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            거래처 추가
          </button>
        }
      >
        <div>
          {/* 검색창 */}
          <div className="flex items-center justify-between m-3">
            <div className="relative w-full max-w-md min-h-[36px] bg-white border border-[#cbccd3] rounded-md flex items-center transition-all duration-100">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="이름, 바코드, 속성 검색"
                className="pl-10 pr-4 py-2 w-full focus:outline-none"
              />
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-auto w-full pretty-scrollbar flex-auto m-3 mt-4 text-center">
            <table className="min-w-full table-fixed border-collapse">
              <thead className="bg-white">
              <tr className="bg-white sticky top-0 z-30 border-b text-left">
                <th className="py-2 px-4">종류</th>
                <th className="py-2 px-4">이름</th>
                <th className="py-2 px-4">전화번호</th>
                <th className="py-2 px-4">이메일</th>
                <th className="py-2 px-4">주소</th>
                <th className="py-2 px-4">메모</th>
              </tr>
              </thead>
              <tbody>
              {clients.map((client, idx) => (
                <tr key={idx}
                    onClick={()=> clientClick(client)}
                    className="border-b border-gray-200 text-left">
                  <td className="py-2 px-4">{client.clientType}</td>
                  <td className="py-2 px-4">{client.clientName}</td>
                  <td className="py-2 px-4">{client.clientPhoneNumber}</td>
                  <td className="py-2 px-4">{client.clientEmail}</td>
                  <td className="py-2 px-4">{client.clientAddress}</td>
                  <td className="py-2 px-4">{client.clientNote}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </Topline>
      {/*위치추가*/}
      <Modal
        isOpen={clientAdd}
        onClose={() => setClientAdd(false)}
        title="거래처 추가"
        footer={
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">추가</button>
            <button
              onClick={() => setClientAdd(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              취소
            </button>
          </>
        }
      >
        <ClientAdd />
      </Modal>

      {/*위치 상세보기*/}
      <Modal
        isOpen={clientDetailModal}
        onClose={() => setClientDetailModal(false)}
        title="거래처 수정"
        footer={
          <>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">수정</button>
            <button
              onClick={() => setClientDetailModal(false)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
            >
              취소
            </button>
          </>
        }
      >
        <ClientDetail client={selectedClient} />
      </Modal>
    </div>
      </div>
    </main>
  );
}

export default ClientList;