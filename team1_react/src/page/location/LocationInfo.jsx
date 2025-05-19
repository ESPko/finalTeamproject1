import { useEffect, useState } from 'react';
import Topline from '../../components/layout/Topline.jsx';
import Modal from '../../Modal/Modal.jsx';
import LocationAdd from './LocationAdd.jsx';
import LocationDetail from './LocationDetail.jsx';
import axiosInstance from '../../api/axiosInstance.jsx';
import { SearchIcon } from 'lucide-react';
import Swal from 'sweetalert2';



function LocationInfo() {
  const [locationInfo, setLocationInfo] = useState([]);
  const [filteredLocationInfo, setFilteredLocationInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [localAdd, setLocalAdd] = useState(false);
  const [localDetail, setLocalDetail] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [itemCounts, setItemCounts] = useState({});
  const [updatedLocation, setUpdatedLocation] = useState(null);
  const [newLocation, setNewLocation] = useState(null);

  useEffect(() => {
    axiosInstance.get('/warehouse/warehouseList')
      .then((res) => {
        setLocationInfo(res.data);
        setFilteredLocationInfo(res.data);
        res.data.forEach(location => {
          if (location.name) {
            axiosInstance.get(`/warehouse/warehouseItemCount?warehouseName=${location.name}`)
              .then(response => {
                setItemCounts(prev => ({ ...prev, [location.name]: response.data }));
              })
              .catch(error => console.error('상품 갯수 불러오기 오류:', error));
          }
        });
      })
      .catch((err) => console.error('창고 목록 불러오기 오류:', err));
  }, []);

  useEffect(() => {
    const filtered = locationInfo.filter(location => {
      const query = searchQuery.toLowerCase();
      return (
        location.name.toLowerCase().includes(query) ||
        location.location.toLowerCase().includes(query) ||
        location.memo.toLowerCase().includes(query)
      );
    });
    setFilteredLocationInfo(filtered);
  }, [searchQuery, locationInfo]);

  const handleAddLocation = () => {
    axiosInstance.get('/warehouse/warehouseList')
      .then((res) => {
        setLocationInfo(res.data);
        setFilteredLocationInfo(res.data);
      })
      .catch((err) => console.error('창고 위치 목록 불러오기 오류:', err));
  };

  const locationClick = (location) => {
    setSelectedLocation(location);
    setUpdatedLocation(location);
    setLocalDetail(true);
  };

  const handleDeleteWarehouse = async (location) => {
    try {
      const { data: itemCount } = await axiosInstance.get(`/item/getWarehouseItemCount?warehouseName=${location.name}`);
      if (itemCount > 0) {
        const result = await Swal.fire({
          title: '비품이 존재합니다',
          text: '해당 창고를 삭제하면 관련 비품도 함께 삭제됩니다. 계속하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '예',
          cancelButtonText: '아니오',
          confirmButtonColor: '#60a5fa',
        });

        if (result.isConfirmed) {
          await axiosInstance.put(`/item/hideItemsByWarehouse?warehouseName=${location.name}`);
          console.log('비품 상태 숨기기 성공');
          await deleteWarehouse(location);
        }
      } else {
        const result = await Swal.fire({
          title: '정말 삭제하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '예',
          cancelButtonText: '아니오',
          confirmButtonColor: '#60a5fa',
        });

        if (result.isConfirmed) {
          await deleteWarehouse(location);
        }
      }
    } catch (error) {
      console.error('삭제 처리 오류:', error);
    }
  };

  const deleteWarehouse = async (location) => {
    try {
      await axiosInstance.delete(`/warehouse/${location.idx}`);
      await Swal.fire({
        title: '삭제 완료',
        text: '창고 정보가 삭제되었습니다.',
        icon: 'success',
        confirmButtonColor: '#60a5fa',
      });
      setLocationInfo(prev => prev.filter(item => item.idx !== location.idx));
      setFilteredLocationInfo(prev => prev.filter(item => item.idx !== location.idx));
    } catch (error) {
      console.error('위치 삭제 오류:', error);
      Swal.fire({
        title: '오류',
        text: '창고 정보 삭제 실패',
        icon: 'error',
        confirmButtonColor: '#60a5fa',
      });
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px 40px' }}>
        <Topline
          title="위치"
          actions={
            <button
              onClick={() => setLocalAdd(true)}
              className="bg-blue-500 text-white font-semibold px-4 py-2 rounded"
            >
              창고 추가
            </button>
          }
        >
          <div className="flex items-center justify-between m-3">
            <div className="relative w-full max-w-md min-h-[36px] bg-white border border-[#cbccd3] rounded-md flex items-center transition-all duration-100">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="이름, 주소, 메모 검색"
                className="pl-10 pr-4 py-2 w-full focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 테이블 */}
          <div className="overflow-x-auto pretty-scrollbar mt-4 text-center">
            <table className="w-full table-fixed border-collapse">
              <thead className="bg-white">
              <tr className="sticky top-0 z-30 border-b border-gray-200 text-center">
                <th className="py-2 px-4 w-[15%]">이름</th>
                <th className="py-2 px-4 w-[35%]">주소</th>
                <th className="py-2 px-4 w-[10%]">재고 수량</th>
                <th className="py-2 px-4 w-[25%]">메모</th>
                <th className="py-2 px-4 w-[15%] text-right"></th>
              </tr>
              </thead>
              <tbody>
              {filteredLocationInfo.map((location) => (
                <tr key={location.idx} className="border-b border-gray-100 text-center text-gray-500">
                  <td className="py-2 px-4 truncate" title={location.name}>{location.name}</td>
                  <td className="py-2 px-4 truncate" title={location.location}>{location.location}</td>
                  <td className="py-2 px-4 text-black">{itemCounts[location.name]}</td>
                  <td className="py-2 px-4 truncate" title={location.memo}>{location.memo}</td>
                  <td className="py-2 px-4 text-right space-x-2">
                    <button
                      onClick={() => locationClick(location)}
                      className="px-2 py-1 border border-gray-200 shadow text-gray-400 font-semibold rounded text-sm hover:bg-gray-200"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteWarehouse(location)}
                      className="px-2 py-1 border border-gray-200 shadow font-semibold text-gray-400 rounded text-sm hover:bg-gray-200"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </Topline>

        {/* 위치 추가 모달 */}
        <Modal isOpen={localAdd} onClose={() => setLocalAdd(false)} title="위치 추가" footer={
          <>
            <button
              onClick={() => {
                // newLocation 값이 없을 경우 경고 메시지 띄우기
                if (!newLocation || !newLocation.name || !newLocation.location) {
                  Swal.fire({
                    icon: 'error',
                    text: '필수 내용이 누락되었습니다',
                    confirmButtonColor: '#60a5fa'
                  });
                  return; // 값이 없으면 추가를 진행하지 않음
                }

                // 값이 있을 경우 '창고 위치를 추가하시겠습니까?' 확인 창 띄우기
                Swal.fire({
                  title: '창고 위치를 추가하시겠습니까?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: '예',
                  cancelButtonText: '아니오',
                  confirmButtonColor: '#60a5fa',
                }).then((result) => {
                  if (result.isConfirmed) {
                    // 확인을 클릭한 경우 창고 추가 요청
                    axiosInstance.post(`/warehouse/addLocation`, newLocation)
                      .then((response) => {
                        Swal.fire({
                          icon: 'success',
                          text: response.data,
                          confirmButtonColor: '#60a5fa'
                        });
                        setLocalAdd(false);
                        handleAddLocation();
                      })
                      .catch((error) => {
                        // 에러 응답에서 HTTP 상태 코드가 400인 경우 경고 메시지 표시
                        if (error.response && error.response.status === 400) {
                          Swal.fire({
                            icon: 'warning',
                            text: error.response.data, // '이미 존재하는 위치입니다.' 메시지를 표시
                            confirmButtonColor: '#60a5fa'
                          });
                        } else {
                          Swal.fire({
                            icon: 'error',
                            text: '창고 추가 실패',
                            confirmButtonColor: '#60a5fa'
                          });
                        }
                      });
                  }
                });
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              추가
            </button>


            <button onClick={() => setLocalAdd(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
              취소
            </button>
          </>
        }>
          <LocationAdd onAddLocation={setNewLocation} />
        </Modal>

        {/* 위치 수정 모달 */}
        <Modal isOpen={localDetail} onClose={() => setLocalDetail(false)} title="위치 수정" footer={
          <>
            <button
              onClick={() => {
                Swal.fire({
                  title: '창고 위치를 수정하시겠습니까?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: '예',
                  cancelButtonText: '아니오',
                  confirmButtonColor: '#60a5fa',
                }).then((result) => {
                  if (result.isConfirmed) {
                    axiosInstance.put(`/warehouse/updateLocation/${updatedLocation.idx}`, updatedLocation)
                      .then((response) => {
                        Swal.fire({
                          icon: 'success',
                          text: response.data,
                          confirmButtonColor: '#60a5fa'
                        });
                        setLocalDetail(false);
                        handleAddLocation();
                      })
                      .catch((error) => {
                        console.error('창고 수정 실패:', error);
                        Swal.fire({
                          icon: 'error',
                          text: '창고 정보 수정 실패',
                          confirmButtonColor: '#60a5fa'
                        });
                      });
                  }
                });
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              수정
            </button>
            <button onClick={() => setLocalDetail(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">
              취소
            </button>
          </>
        }>
          <LocationDetail locationInfo={selectedLocation} onUpdate={setUpdatedLocation} />
        </Modal>
      </div>
    </div>
  );
}

export default LocationInfo;
