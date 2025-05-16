import { useEffect, useState } from 'react';
import Topline from '../../components/layout/Topline.jsx';
import Modal from '../../Modal/Modal.jsx';
import LocationAdd from './LocationAdd.jsx';
import LocationDetail from './LocationDetail.jsx';
import axiosInstance from '../../api/axiosInstance.jsx';
import { SearchIcon } from 'lucide-react';

function LocationInfo ()
{
  // 서버에서 받아온 위치 목록 상태
  const [locationInfo, setLocationInfo] = useState([]);
  // 필터링된 위치 목록 상태
  const [filteredLocationInfo, setFilteredLocationInfo] = useState([]);
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState('');
  // 위치추가 모달 상태
  const [localAdd, setLocalAdd] = useState(false);
  // 위치상세보기 모달 상태
  const [localDetail, setLocalDetail] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [itemCounts, setItemCounts] = useState({});
  const [updatedLocation, setUpdatedLocation] = useState(null);
  const [newLocation, setNewLocation] = useState(null);
  
  // 서버에서 데이터 가져오기
  useEffect(() => {
    axiosInstance.get('/warehouse/warehouseList')
      .then((res) => {
        setLocationInfo(res.data);
        setFilteredLocationInfo(res.data); // 초기 상태에서는 필터링하지 않은 전체 목록
        // 각 창고에 대한 상품 갯수도 함께 가져오기
        res.data.forEach(location => {
          if (location.name)
          {  // localName이 존재하는 경우에만 요청
            axiosInstance.get(`/warehouse/warehouseItemCount?warehouseName=${location.name}`)
              .then(response => {
                setItemCounts(prevState => ({
                  ...prevState,
                  [location.name]: response.data,
                }));
              })
              .catch(error => console.error('상품 갯수 불러오기 오류:', error));
          }
          else
          {
            console.warn('창고 이름이 없습니다:', location);
          }
        });
      })
      .catch((err) => {
        console.error('창고 목록 불러오기 오류:', err);
      });
  }, []);
  
  // 검색어에 따라 위치 목록 필터링하는 함수
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
  }, [searchQuery, locationInfo]); // 검색어 또는 위치 목록이 변경되면 필터링

  // 위치 목록 갱신 함수
  const handleLocation = () => {
    axiosInstance.get('/warehouse/warehouseList')
      .then((res) => {
        setLocationInfo(res.data);  // 위치 목록 갱신
        setFilteredLocationInfo(res.data);  // 갱신 후 필터링된 목록도 다시 업데이트

        // 새로 추가된 창고에 대해서도 재고 수량을 가져오기
        res.data.forEach(location => {
          if (location.name) {
            axiosInstance.get(`/warehouse/warehouseItemCount?warehouseName=${location.name}`)
              .then(response => {
                setItemCounts(prevState => ({
                  ...prevState,
                  [location.name]: response.data,
                }));
              })
              .catch(error => console.error('상품 갯수 불러오기 오류:', error));
          }
        });
      })
      .catch((err) => {
        console.error('창고 위치 목록 불러오기 오류:', err);
      });
  };
  
  const locationClick = (location) => {
    setSelectedLocation(location);
    setUpdatedLocation(location);
    setLocalDetail(true);
  };
  
  // 비품 수를 확인한 후 삭제 처리 함수
  const handleDeleteWarehouse = (location) => {
    axiosInstance.get(`/item/getWarehouseItemCount?warehouseName=${location.name}`)
      .then(response => {
        const itemCount = response.data;
        if (itemCount > 0)
        {
          // 비품이 존재하는 경우
          if (window.confirm('해당 창고에 비품이 존재합니다. 창고를 삭제하시면 관련 비품도 함께 삭제됩니다. 계속하시겠습니까?'))
          {
            axiosInstance.put(`/item/hideItemsByWarehouse?warehouseName=${location.name}`)
              .then(() => {
                console.log('비품 상태 숨기기 성공');
                deleteWarehouse(location);  // 비품 숨기기 후 창고 삭제
              })
              .catch(error => {
                console.error('비품 숨기기 오류:', error);
                alert('비품 상태 숨기기 실패');
              });
          }
          else
          {
            console.log('비품 숨기기 취소');
          }
        }
        else
        {
          if (window.confirm('해당 창고를 삭제하시겠습니까?'))
          {
            deleteWarehouse(location);
          }
        }
      })
      .catch(error => console.error('비품 수 조회 오류:', error));
  };
  
  // 창고 삭제 함수
  const deleteWarehouse = (location) => {
    axiosInstance.delete(`/warehouse/${location.idx}`)
      .then(() => {
        alert('창고 정보가 성공적으로 삭제되었습니다.');
        setLocationInfo(prevLocationInfo => prevLocationInfo.filter(item => item.idx !== location.idx));
        setFilteredLocationInfo(prevFilteredLocationInfo => prevFilteredLocationInfo.filter(item => item.idx !== location.idx));
      })
      .catch(error => {
        console.error('위치 삭제 오류:', error);
        alert('창고 정보 삭제 실패');
      });
  };



  
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]"
           style={{ padding: '0px 40px 80px 40px' }}>
        <div>
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
            <div>
              {/* 검색창 */}
              <div className="flex items-center justify-between m-3">
                <div className="relative w-full max-w-md min-h-[36px] bg-white border border-[#cbccd3] rounded-md flex items-center transition-all duration-100">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="이름, 주소, 메모 검색"
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
                    <th className="py-2 px-4 w-[35%]">주소</th>
                    <th className="py-2 px-4 w-[10%]">재고 수량</th>
                    <th className="py-2 px-4 w-[25%]">메모</th>
                    <th className="py-2 px-4 w-[15%] text-right"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {filteredLocationInfo.map((location) => (
                    <tr key={location.idx} className="border-b border-gray-100 text-center text-gray-500">
                      <td className="py-2 px-4 w-[15%] truncate overflow-hidden whitespace-nowrap" title={location.name}>
                        {location.name}
                      </td>
                      <td className="py-2 px-4 w-[35%] truncate overflow-hidden whitespace-nowrap" title={location.location}>
                        {location.location}
                      </td>
                      <td className="py-2 px-4 w-[10%] text-black truncate overflow-hidden whitespace-nowrap">
                        {itemCounts[location.name]}
                      </td>
                      <td className="py-2 px-4 w-[25%] truncate overflow-hidden whitespace-nowrap" title={location.memo}>
                        {location.memo}
                      </td>
                      <td className="py-2 px-4 w-[15%] text-right space-x-2">
                        
                        <button
                          onClick={() => locationClick(location)}
                          className="px-2 py-1 border border-gray-200 shadow text-gray-400 font-semibold rounded text-sm hover:bg-gray-200"
                        >
                          수정
                        </button>
                        <button
                          onClick={() => {
                              handleDeleteWarehouse(location); // 삭제 처리 함수 호출
                          }}
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
            </div>
          </Topline>
          
          {/*위치 추가 모달*/}
          <Modal isOpen={localAdd}
                 onClose={() => setLocalAdd(false)}
                 title="위치 추가"
                 footer={
                   <>
                     <button
                       onClick={() => {
                         if (!newLocation || !newLocation.name || !newLocation.location) {
                           alert('필수내용이 누락되었습니다.');
                           return; // 누락된 내용이 있으면 추가하지 않음
                         }

                         // 서버에 새로운 위치 추가 요청
                         axiosInstance.post(`/warehouse/addLocation`, newLocation)
                           .then((response) => {
                             alert(response.data);
                             setLocalAdd(false); // 위치 추가 모달 닫기
                             handleLocation(); // 위치 목록 갱신
                           })
                           .catch((error) => {
                             console.error('창고 추가 실패:', error);
                             alert('창고 추가 실패');
                           });
                       }}
                       className="bg-blue-600 text-white px-4 py-2 rounded"
                     >
                       추가
                     </button>
                     <button
                       onClick={() => setLocalAdd(false)}
                       className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                     >
                       취소
                     </button>
                   </>
                 }>
            <LocationAdd onAddLocation={setNewLocation} />
          </Modal>
          
          {/*위치 수정 모달*/}
          <Modal
            isOpen={localDetail}
            onClose={() => setLocalDetail(false)}
            title="위치 수정"
            footer={
              <>
                <button
                  onClick={() => {
                    axiosInstance.put(`/warehouse/updateLocation/${updatedLocation.idx}`, updatedLocation)
                      .then((response) => {
                        alert(response.data);
                        setLocalDetail(false);  // 수정 모달 닫기
                        handleLocation();  // 위치 목록 갱신
                      })
                      .catch((error) => {
                        console.error('창고 수정 실패:', error);
                        alert('창고 정보 수정 실패');
                      });
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  수정
                </button>
                <button
                  onClick={() => setLocalDetail(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >
                  취소
                </button>
              </>
            }
          >
            <LocationDetail locationInfo={selectedLocation} onUpdate={setUpdatedLocation} />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default LocationInfo;
