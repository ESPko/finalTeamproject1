import { useEffect, useState } from 'react';
import Topline from '../../components/layout/Topline.jsx';
import Modal from '../../Modal/Modal.jsx';
import LocationAdd from './LocationAdd.jsx';
import LocationDetail from './LocationDetail.jsx';
import axios from 'axios';

function LocationInfo() {
  const [locationInfo, setLocationInfo] = useState([]); // 위치 목록 상태
  const [localAdd, setLocalAdd] = useState(false); // 위치 추가 모달
  const [localDetail, setLocalDetail] = useState(false); // 위치 수정 모달
  const [selectedLocation, setSelectedLocation] = useState(null); // 수정할 위치 선택
  const [itemCounts, setItemCounts] = useState({});

  // 위치 목록을 불러오는 함수
  const fetchLocation = () => {
    axios.get('http://localhost:8080/warehouse/warehouseList')
      .then((res) => {
        setLocationInfo(res.data);
        res.data.forEach(location => {
          if (location.name) {
            axios.get(`http://localhost:8080/warehouse/warehouseItemCount?warehouseName=${location.name}`)
              .then(response => {
                setItemCounts(prevState => ({
                  ...prevState,
                  [location.name]: response.data
                }));
              })
              .catch(error => console.error('상품 갯수 불러오기 오류:', error));
          }
        });
      })
      .catch((err) => {
        console.error('창고 목록 불러오기 오류:', err);
      });
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  // 위치 수정 함수
  const handleUpdateLocation = (updatedLocation) => {
    // 서버에 수정된 정보를 보내는 API 호출
    axios.put(`http://localhost:8080/warehouse/${updatedLocation.idx}`, updatedLocation)
      .then((response) => {
        console.log('위치 수정 성공:', response.data);
        alert('위치가 성공적으로 수정되었습니다.');
        fetchLocation(); // 수정 후 위치 목록 갱신
        setLocalDetail(false); // 모달 닫기
      })
      .catch((error) => {
        console.error('위치 수정 실패:', error.response ? error.response.data : error.message);
        alert('위치 수정에 실패했습니다.');
      });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline title="위치" actions={<button onClick={() => setLocalAdd(true)} className="bg-blue-600 text-white px-4 py-2 rounded">위치 추가</button>}>
            <div>
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
                    <tr key={location.idx} className="border-b border-gray-200 text-center">
                      <td className="py-2 px-4 w-[200px]">{location.name}</td>
                      <td className="py-2 px-4 w-[400px]">{location.location}</td>
                      <td className="py-2 px-4 w-[200px]">{itemCounts[location.name]}</td>
                      <td className="py-2 px-4 w-[440px]">{location.memo}</td>
                      <td className="py-2 px-4 w-[250px] text-right space-x-2">
                        <button onClick={() => { setSelectedLocation(location); setLocalDetail(true); }} className="px-2 py-1 border rounded text-sm hover:bg-gray-100">수정</button>
                        <button className="px-2 py-1 border rounded text-sm hover:bg-gray-100">삭제</button>
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
            <LocationAdd onClose={() => setLocalAdd(false)} onAddLocation={fetchLocation} />
          </Modal>

          {/*위치 수정 모달*/}
          <Modal
            isOpen={localDetail}
            onClose={() => setLocalDetail(false)}
            title="위치 수정"
          >
            <LocationDetail
              locationInfo={selectedLocation}
              onClose={() => setLocalDetail(false)} // 모달을 닫는 함수
              onUpdate={(updatedLocation) => handleUpdateLocation(updatedLocation)} // 수정된 데이터를 받아서 상태 업데이트
            />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default LocationInfo;
