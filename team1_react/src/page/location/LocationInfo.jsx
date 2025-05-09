import { useEffect, useState } from 'react';
import Topline from '../../components/layout/Topline.jsx';
import Modal from '../../Modal/Modal.jsx';
import LocationAdd from './LocationAdd.jsx';
import LocationDetail from './LocationDetail.jsx';
import axios from 'axios';

function LocationInfo() {
  // 서버에서 받아온 위치 목록 상태
  const [locationInfo, setLocationInfo] = useState([]);

  // 위치추가 모달 상태
  const [localAdd, setLocalAdd] = useState(false);

  // 위치상세보기 모달 상태
  const [localDetail, setLocalDetail] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [itemCounts, setItemCounts] = useState({});

  const[updatedLocation,setUpdatedLocation] = useState(null);

  // 서버에서 데이터 가져오기
  useEffect(() => {
    axios.get('http://localhost:8080/warehouse/warehouseList')
      .then((res) => {
        setLocationInfo(res.data);
        // 각 창고에 대한 상품 갯수도 함께 가져오기
        res.data.forEach(location => {
          if (location.name) {  // localName이 존재하는 경우에만 요청
            axios.get(`http://localhost:8080/warehouse/warehouseItemCount?warehouseName=${location.name}`)
              .then(response => {
                setItemCounts(prevState => ({
                  ...prevState,
                  [location.name]: response.data
                }));
              })
              .catch(error => console.error('상품 갯수 불러오기 오류:', error));
          } else {
            console.warn('창고 이름이 없습니다:', location);
          }
        });
      })
      .catch((err) => {
        console.error('창고 목록 불러오기 오류:', err);
      });
  }, []);

  // 위치 목록 갱신 함수
  const handleAddLocation = () => {
    axios.get('http://localhost:8080/warehouse/warehouseList')
      .then((res) => {
        setLocationInfo(res.data); // 위치 목록 갱신
      })
      .catch((err) => {
        console.error('위치 목록 불러오기 오류:', err);
      });
  };

  const locationClick = (location) => {
    setSelectedLocation(location);
    setUpdatedLocation(location);
    setLocalDetail(true);
  }



  return (
    <div className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh]  min-h-[80vh] "
           style={{ padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline
            title="위치"
            actions={
              <button
                onClick={() => setLocalAdd(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                위치 추가
              </button>
            }
          >
            <div>
              {/* 테이블 */}
              <div className="overflow-auto w-max pretty-scrollbar flex-auto m-3 mt-4 text-center">
                <table className="w-full table-fiex border-collapse">
                  <thead className="bg-white">
                  <tr className="bg-white sticky top-0 z-30 border-b text-center">
                    <th className="py-2 px-4 w-[200px]">이름</th>
                    <th className="py-2 px-4 w-[400px]">주소</th>
                    <th className="py-2 px-4 w-[200px]">재고 수량</th>
                    <th className="py-2 px-4 w-[440px]">메모</th>
                    <th className="py-2 px-4 w-[250px] text-right"></th>
                  </tr>
                  </thead>
                  <tbody>
                  {locationInfo.map((location) => (
                    <tr key={location.idx}
                        className="border-b border-gray-200 text-center">
                      <td className="py-2 px-4 w-[200px]">{location.name}</td>
                      <td className="py-2 px-4 w-[400px]">{location.location}</td>
                      <td className="py-2 px-4 w-[200px]">{itemCounts[location.name]}</td>
                      <td className="py-2 px-4 w-[440px]">{location.memo}</td>
                      <td className="py-2 px-4 w-[250px] text-right space-x-2">
                        <button
                          onClick={() => {
                            locationClick(location)
                          }}
                          className="px-2 py-1 border rounded text-sm hover:bg-gray-100">수정
                        </button>
                        <button
                          className="px-2 py-1 border rounded text-sm hover:bg-gray-100"
                          onClick={() => {
                            if (window.confirm('정말 삭제하시겠습니까?')) {
                              // 삭제 요청을 보낼 idx를 사용
                              axios.delete(`http://localhost:8080/warehouse/${location.idx}`)
                                .then(() => {
                                  // 삭제 성공 시, locationInfo 상태에서 해당 항목 제거
                                  setLocationInfo(prevLocationInfo =>
                                    prevLocationInfo.filter(item => item.idx !== location.idx)
                                  );
                                  alert('위치가 성공적으로 삭제되었습니다.');
                                })
                                .catch(error => {
                                  console.error('위치 삭제 오류:', error);
                                  alert('위치 삭제 실패');
                                });
                            }
                          }}
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
          <Modal isOpen={localAdd} onClose={() => setLocalAdd(false)} title="위치 추가">
            <LocationAdd
              onClose={() => setLocalAdd(false)}
              onAddLocation={handleAddLocation} />
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
                    axios.put(`http://localhost:8080/warehouse/updateLocation/${updatedLocation.idx}`, updatedLocation)
                      .then((response) => {
                        alert(response.data);
                        setLocalDetail(false);  // 수정 모달 닫기
                        handleAddLocation();  // 위치 목록 갱신
                      })
                      .catch((error) => {
                        console.error('위치 수정 실패:', error);
                        alert('위치 수정 실패');
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
            <LocationDetail
              locationInfo={selectedLocation}
              onUpdate={setUpdatedLocation}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default LocationInfo;
