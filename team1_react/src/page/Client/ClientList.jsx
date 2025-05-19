import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance.jsx';
import Topline from '../../components/layout/Topline.jsx';
import { SearchIcon } from 'lucide-react';
import Modal from '../../Modal/Modal.jsx';
import ClientAdd from './ClientAdd.jsx';
import ClientDetail from './ClientDetail.jsx';
import Swal from 'sweetalert2';

function ClientList ()
{
  const [clients, setClients] = useState([]); // 전체 클라이언트 목록
  const [filteredClients, setFilteredClients] = useState([]); // 검색 결과로 필터된 클라이언트 목록
  const [clientAdd, setClientAdd] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientDetailModal, setClientDetailModal] = useState(false);
  const [updatedClient, setUpdatedClient] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  
  // 서버에서 클라이언트 목록 가져오기
  const fetchClients = () => {
    axiosInstance.get('/vendor/vendorList')
      .then(response => {
        setClients(response.data);
        setFilteredClients(response.data); // 초기 데이터 로드 후 필터된 클라이언트 설정
      })
      .catch(error => {
        console.error('매입처 목록 불러오기 오류:', error); // 오류 확인
      });
  };
  
  // 검색어에 맞는 클라이언트를 필터링하는 함수
  const filterClients = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = clients.filter(client => {
      return (
        client.name.toLowerCase().includes(lowercasedQuery) ||
        client.phone.toLowerCase().includes(lowercasedQuery) ||
        client.email.toLowerCase().includes(lowercasedQuery) ||
        client.location.toLowerCase().includes(lowercasedQuery)
      );
    });
    setFilteredClients(filtered);
  };
  
  useEffect(() => {
    fetchClients(); // 컴포넌트가 처음 마운트될 때 클라이언트 목록 가져오기
  }, []);
  
  // 검색어가 변경될 때마다 필터링 적용
  useEffect(() => {
    filterClients(searchQuery); // 검색어에 맞는 클라이언트 필터링
  }, [searchQuery, clients]); // clients가 변경될 때도 필터링
  
  // 클라이언트 클릭 시 상세보기 모달 열기
  const clientClick = (client) => {
    setSelectedClient(client);
    setUpdatedClient(client); // 수정할 값을 초기화
    setClientDetailModal(true);
  };
  
  // ClientList.js (삭제 로직)

  const handleDeletVendor = async (client) => {
    try {
      const response = await axiosInstance.get(`/item/getVendorItemCount?vendorName=${client.name}`);
      const itemCount = response.data;

      if (itemCount > 0) {
        const result = await Swal.fire({
          icon: 'warning',
          title: '비품이 존재합니다',
          text: '해당 매입처에 비품이 존재합니다. 삭제하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
        });

        if (result.isConfirmed) {
          deleteVendor(client);
        }
      } else {
        const result = await Swal.fire({
          icon: 'warning',
          title: '정말 삭제하시겠습니까?',
          text: '해당 매입처를 삭제하시겠습니까?',
          showCancelButton: true,
          confirmButtonText: '삭제',
          cancelButtonText: '취소',
        });

        if (result.isConfirmed) {
          deleteVendor(client);
        }
      }
    } catch (error) {
      console.error('비품 수 조회 오류:', error);
      Swal.fire('오류', '비품 수를 불러오는 중 오류가 발생했습니다.', 'error');
    }
  };


  // 창고 삭제 함수
  const deleteVendor = async (client) => {
    try {
      await axiosInstance.delete(`/vendor/${client.idx}`);
      await Swal.fire('삭제 완료', '매입처가 성공적으로 삭제되었습니다.', 'success');
      setClientDetailModal(false);
      fetchClients();
    } catch (error) {
      Swal.fire('오류', '매입처 삭제 중 오류가 발생했습니다.', 'error');
      console.error(error);
    }
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
                className="bg-blue-500 text-white font-semibold px-4 py-2 rounded"
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
                    placeholder="이름, 전화번호, 이메일, 주소 검색"
                    className="pl-10 pr-4 py-2 w-full focus:outline-none"
                    value={searchQuery} // 검색어 상태 바인딩
                    onChange={(e) => setSearchQuery(e.target.value)} // 검색어 입력 시 상태 업데이트
                  />
                </div>
              </div>
              
              {/* 테이블 */}
              <div className="overflow-x-auto pretty-scrollbar mt-4 text-center">
                <table className="w-full table-fixed border-collapse">
                  <thead className="bg-white">
                  <tr className="sticky top-0 z-30 border-b border-gray-200 text-center">
                    <th className="py-2 px-4 w-[15%]">이름</th>
                    <th className="py-2 px-4 w-[15%]">전화 번호</th>
                    <th className="py-2 px-4 w-[20%]">이메일</th>
                    <th className="py-2 px-4 w-[30%]">주소</th>
                    <th className="py-2 px-4 w-[20%]">메모</th>
                  </tr>
                  </thead>
                  <tbody>
                  {filteredClients.length > 0 ? (
                    filteredClients.map((client) => (
                      <tr
                        key={client.idx}
                        onClick={() => clientClick(client)}
                        className="border-b border-gray-100 text-center text-gray-500 hover:bg-gray-50 cursor-pointer"
                      >
                        <td
                          className="py-2 px-4 w-[15%] truncate overflow-hidden whitespace-nowrap"
                          title={client.name}
                        >
                          {client.name}
                        </td>
                        <td
                          className="py-2 px-4 w-[15%] truncate overflow-hidden whitespace-nowrap"
                          title={client.phone}
                        >
                          {client.phone}
                        </td>
                        <td
                          className="py-2 px-4 w-[20%] truncate overflow-hidden whitespace-nowrap"
                          title={client.email}
                        >
                          {client.email}
                        </td>
                        <td
                          className="py-2 px-4 w-[30%] truncate overflow-hidden whitespace-nowrap"
                          title={client.location}
                        >
                          {client.location}
                        </td>
                        <td
                          className="py-2 px-4 w-[20%] truncate overflow-hidden whitespace-nowrap"
                          title={client.memo}
                        >
                          {client.memo}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-4 text-gray-400">
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  )}
                  </tbody>
                </table>
              </div>
            
            </div>
          </Topline>
          
          {/* 거래처 추가 모달 */}
          <Modal
            isOpen={clientAdd}
            onClose={() => setClientAdd(false)}
            title="매입처 추가"
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
            title="매입처 수정"
            footer={
              <>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={async () => {
                    try {
                      await axiosInstance.put(`/vendor/${updatedClient.idx}`, updatedClient);
                      await Swal.fire('수정 완료', '매입처 정보가 수정되었습니다.', 'success');
                      setClientDetailModal(false);
                      fetchClients();
                    } catch (error) {
                      console.error(error);
                      Swal.fire('오류', '매입처 수정 중 문제가 발생했습니다.', 'error');
                    }
                  }}

                >
                  수정
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={() => handleDeletVendor(selectedClient)}
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
