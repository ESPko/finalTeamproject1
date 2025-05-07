import { useState, useEffect } from 'react';
import axios from 'axios';
import Topline from '../../components/layout/Topline.jsx';
import { SearchIcon } from 'lucide-react';
import Modal from '../../Modal/Modal.jsx';
import ClientAdd from './ClientAdd.jsx';
import ClientDetail from './ClientDetail.jsx'; // axios import

function ClientList() {
  const [clients, setClients] = useState([]);
  const [clientAdd, setClientAdd] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDetailModal, setClientDetailModal] = useState(false);
  const [updatedClient, setUpdatedClient] = useState(null);

  const fetchClients = () => {
    axios.get('http://localhost:8080/vendor/vendorList')
      .then(response => setClients(response.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const clientClick = (client) => {
    setSelectedClient(client);
    setUpdatedClient(client); // 수정할 값을 초기화
    setClientDetailModal(true);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline
            title="매입처"
            actions={
              <button
                onClick={() => setClientAdd(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                매입처 추가
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
              <div className="overflow-auto w-max pretty-scrollbar flex-auto m-3 mt-4 text-center">
                <table className="min-w-full table-fixed border-collapse">
                  <thead className="bg-white">
                  <tr className="bg-white sticky top-0 z-30 border-b text-center">
                    <th className="py-2 px-4 w-[200px]">이름</th>
                    <th className="py-2 px-4 w-[200px]">전화번호</th>
                    <th className="py-2 px-4 w-[240px]">이메일</th>
                    <th className="py-2 px-4 w-[450px]">주소</th>
                    <th className="py-2 px-4 w-[350px]">메모</th>
                  </tr>
                  </thead>
                  <tbody>
                  {clients.map((client ) => (
                    <tr key={client.idx} onClick={() => clientClick(client)} className="border-b border-gray-200 text-center">
                      <td className="py-2 px-4 w-[200px]">{client.name}</td>
                      <td className="py-2 px-4 w-[200px]">{client.phone}</td>
                      <td className="py-2 px-4 w-[240px]">{client.email}</td>
                      <td className="py-2 px-4 w-[450px]">{client.location}</td>
                      <td className="py-2 px-4 w-[350px]">{client.memo}</td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Topline>

          {/* 거래처 추가 모달 */}
          <Modal
            isOpen={clientAdd}
            onClose={() => setClientAdd(false)}
            title="거래처 추가"
          >
            <ClientAdd
              onClose={() => setClientAdd(false)}
              onSuccess={fetchClients}
            />
          </Modal>

          {/* 거래처 수정 모달 */}
          <Modal
            isOpen={clientDetailModal}
            onClose={() => setClientDetailModal(false)}
            title="거래처 수정"
            footer={
              <>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    axios.put(`http://localhost:8080/vendor/${updatedClient.idx}`, updatedClient)
                      .then(() => {
                        alert('수정 완료');
                        setClientDetailModal(false);
                        fetchClients();
                      });
                  }}
                >
                  수정
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => {
                    if (window.confirm('정말 삭제하시겠습니까?')) {
                      axios.delete(`http://localhost:8080/vendor/${selectedClient.idx}`)
                        .then(() => {
                          alert('삭제 완료');
                          setClientDetailModal(false);
                          fetchClients(); // 삭제 후 목록 갱신
                        })
                        .catch(error => {
                          alert('삭제 중 오류가 발생했습니다.');
                          console.error(error);
                        });
                    }
                  }}
                >
                  삭제
                </button>
              </>
            }
          >
            <ClientDetail client={selectedClient} onUpdate={setUpdatedClient} />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ClientList;
