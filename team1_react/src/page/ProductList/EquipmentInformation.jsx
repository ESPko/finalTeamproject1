import { FiSettings } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import ProductAdd from './ProductAdd';
import Modal from '../../Modal/Modal.jsx';
import EquipmentDetail from './EquipmentDetail.jsx';
import Topline from '../../components/layout/Topline.jsx';
import { SearchIcon } from 'lucide-react';
import axiosInstance from '../../api/axiosInstance.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

function EquipmentInformation ()
{
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // 필터링된 제품 목록
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [showSettings, setShowSettings] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState({
    category: true,
    vendorName: true,
    price: true,
    standard: true,
    quantity: true,
    warehouseName: true,
  });
  
  const toggleColumn = (key) => {
    setVisibleColumns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);
  
  const handleRowClick = (product) => {
    setSelectedProduct(product);
    setDetailModalOpen(true);
  };
  
  const fetchItems = () => {
    axiosInstance.get('/item/itemList')
      .then((res) => {
        const data = res.data;
        if (Array.isArray(data))
        {
          setProducts(data);
          setFilteredProducts(data); // 초기 로딩 시, 필터링된 목록도 설정
        }
        else if (Array.isArray(data.data))
        {
          setProducts(data.data); // 백엔드 응답이 { data: [...] } 형태일 경우
          setFilteredProducts(data.data); // 필터링된 목록 설정
        }
        else
        {
          console.error('예상하지 못한 응답 형식:', data);
          setProducts([]);
          setFilteredProducts([]); // 초기화
        }
      })
      .catch((err) => {
        console.error('비품 목록 불러오기 실패:', err);
        setProducts([]);
        setFilteredProducts([]); // 오류 발생 시 초기화
      });
  };
  
  // 서버에서 비품 목록 불러오기
  useEffect(() => {
    fetchItems();
  }, []);
  
  // 검색어에 맞춰 비품 목록 필터링
  useEffect(() => {
    if (searchTerm === '')
    {
      setFilteredProducts(products); // 검색어가 비어 있으면 전체 제품 표시
    }
    else
    {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = products.filter((product) => {
        return (
          product.name.toLowerCase().includes(lowercasedSearchTerm) ||
          product.category.toLowerCase().includes(lowercasedSearchTerm) ||
          product.vendorName.toLowerCase().includes(lowercasedSearchTerm) ||
          product.price.toString().includes(lowercasedSearchTerm) ||
          product.standard.toString().includes(lowercasedSearchTerm) ||
          product.quantity.toString().includes(lowercasedSearchTerm) ||
          product.warehouseName.toLowerCase().includes(lowercasedSearchTerm)
        );
      });
      setFilteredProducts(filtered); // 필터링된 목록 설정
    }
  }, [searchTerm, products]);
  
  // 비품 수정 요청
  const handleUpdateProduct = async () => {
    if (!updateProduct.image)
    {
      alert('이미지를 먼저 선택하세요.');
      return;
    }
    
    // FormData로 업데이트 데이터 생성
    const formData = new FormData();
    formData.append('name', updateProduct.name);
    formData.append('category', updateProduct.category);
    formData.append('vendorName', updateProduct.vendorName);
    formData.append('warehouseName', updateProduct.warehouseName);
    formData.append('quantity', updateProduct.quantity);
    formData.append('price', updateProduct.price);
    formData.append('standard', updateProduct.standard);
    formData.append('image', updateProduct.image);
    formData.append('userId', user.id);
    
    try
    {
      // axios.put(`http://localhost:8080/item/update`, null, {
      axiosInstance.put(`/item/update/${updateProduct.idx}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(() => {
          alert('비품이 수정되었습니다.');
          setDetailModalOpen(false);
          fetchItems(); // 비품 목록 다시 가져오기
        })
        .catch((err) => {
          console.error('비품 수정 실패:', err);
          if (err.response)
          {
            console.error('서버 응답 오류:', err.response.data); // 서버에서 반환하는 오류 메시지
          }
          alert('비품 수정에 실패했습니다.');
        });
    }
    catch (err)
    {
      console.error('비품 수정 실패:', err);
      if (err.response)
      {
        console.error('서버 응답 오류:', err.response.data); // 서버에서 반환하는 오류 메시지
      }
      alert('비품 수정에 실패했습니다.');
    }
  };
  
  const handleDeleteItem = (product) => {
    // 삭제 확인 메시지
    const confirmDelete = window.confirm('이 비품을 삭제하시겠습니까?');
    
    if (confirmDelete)
    {
      // 사용자가 "OK"를 클릭하면 삭제 진행
      axiosInstance.put(`/item/${product.idx}`)
        .then(() => {
          alert('비품이 삭제되었습니다.');
          setDetailModalOpen(false);
          fetchItems(); // 비품 목록 다시 가져오기
        })
        .catch((err) => {
          alert('삭제 중 오류가 발생했습니다.');
          console.log(err);
        });
    }
    else
    {
      // 사용자가 "취소"를 클릭하면 아무 작업도 하지 않음
      console.log('비품삭제가 취소되었습니다.');
    }
  };
  
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[80vh]" style={{ padding: '0px 40px 80px' }}>
        <div>
          <Topline
            title="비품"
            actions={
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-500 font-semibold text-white px-4 py-2 rounded"
              >
                비품 추가
              </button>
            }
          >
            <div className="relative w-full mt-4 text-center">
              {/* 검색창 */}
              <div className="flex items-center justify-between m-3">
                <div
                  className="relative w-full max-w-md min-h-[36px] bg-white border border-[#cbccd3] rounded-md flex items-center transition-all duration-100">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon />
                  </div>
                  <input
                    type="text"
                    placeholder="비품명, 속성 검색"
                    className="pl-10 pr-4 py-2 w-full focus:outline-none"
                    value={searchTerm} // 검색어 상태 반영
                    onChange={(e) => setSearchTerm(e.target.value)} // 검색어 변경
                  />
                </div>
                
                <div className="relative ml-4">
                  <div
                    className="flex items-center bg-white border border-[#cbccd3] rounded-md px-3 py-2 cursor-pointer hover:shadow"
                    onClick={() => setShowSettings(!showSettings)}
                  >
                    <FiSettings className="h-5 w-5 text-gray-400 mr-2" />
                    <span>컬럼 설정</span>
                  </div>
                  {showSettings && (
                    <div
                      className="absolute top-12 right-0 bg-white border rounded shadow p-2 z-50 inline-block overflow-y-auto"
                      style={{ maxHeight: 'calc(100vh - 150px)' }}
                    >
                      {Object.keys(visibleColumns).map((key) => (
                        <div key={key} className="flex items-center mb-2 text-left">
                          <input
                            type="checkbox"
                            id={key}
                            checked={visibleColumns[key]}
                            onChange={() => toggleColumn(key)}
                            className="mr-2 shrink-0"
                          />
                          <label htmlFor={key} className="whitespace-nowrap">
                            {({
                              category: '카테고리',
                              vendorName: '매입회사',
                              price: '매입가',
                              standard: '적정재고',
                              quantity: '현재재고',
                              warehouseName: '창고 위치',
                            })[key]}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* 테이블 */}
              <table className="w-full table-fixed border-collapse mt-5">
                <thead>
                <tr className="bg-white sticky top-0 z-30 border-b border-gray-200 h-[52px]">
                  <th className="bg-white w-[10%]">사진</th>
                  <th className="bg-white border-r w-[16.6%]  border-gray-200">비품명</th>
                  {visibleColumns.category && <th className="w-[15%]">카테고리</th>}
                  {visibleColumns.vendorName && <th className="w-[15.8%]">매입회사</th>}
                  {visibleColumns.price && <th className="w-[12.5%]">매입가</th>}
                  {visibleColumns.standard && <th className="w-[10.8%]">적정 재고</th>}
                  {visibleColumns.quantity && <th className="w-[10.8%]">현재 재고</th>}
                  {visibleColumns.warehouseName && <th className="w-[15%]">창고 위치</th>}
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map((product, idx) => (
                  <tr key={idx} onClick={() => handleRowClick(product)} className="border-b border-gray-100 cursor-pointer text-gray-600">
                    <td className="w-[10%] bg-white truncate ">
                      <div className="min-w-[60px] flex items-center justify-center   ">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt="비품 이미지"
                          className="w-[60px] h-[60px] object-fill rounded-sm"
                        />
                      ) : (
                        <div
                          className="w-[60px] h-[60px] bg-gray-100 border border-dashed rounded-lg   text-2xl text-gray-400"
                        >
                          📷
                        </div>
                      )}
                      </div>
                    </td>
                    
                    <td className="w-[16.6%] bg-white border-r border-gray-300 truncate" title={product.name}>{product.name}</td>
                    {visibleColumns.category &&
                      <td className="w-[15%] truncate" title={product.category}>{product.category}</td>}
                    {visibleColumns.vendorName &&
                      <td className="w-[15.8%] truncate" title={product.vendorName}>{product.vendorName}</td>}
                    {visibleColumns.price &&
                      <td className="w-[12.5%] truncate" title={product.price}>{product.price}</td>}
                    {visibleColumns.standard &&
                      <td className="w-[10.8%] truncate" title={product.standard}>{product.standard}</td>}
                    {visibleColumns.quantity &&
                      <td className="w-[10.8%] truncate" title={product.quantity}>{product.quantity}</td>}
                    {visibleColumns.warehouseName &&
                      <td className="w-[15%] truncate" title={product.warehouseName}>{product.warehouseName}</td>}
                  </tr>
                ))}
                </tbody>
              </table>
            
            </div>
          </Topline>
          
          {/* 비품 추가 모달 */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="비품 추가">
            <ProductAdd
              onClose={() => setIsModalOpen(false)}
              onSuccess={fetchItems}
            />
          </Modal>
          
          {/* 비품 상세보기 모달 */}
          <Modal
            isOpen={detailModalOpen}
            onClose={() => setDetailModalOpen(false)}
            title="비품 상세보기"
            footer={
              <>
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                  onClick={handleUpdateProduct}
                >
                  수정
                </button>
                
                <button
                  onClick={() => handleDeleteItem(selectedProduct)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >삭제
                </button>
              </>
            }
          >
            <EquipmentDetail product={selectedProduct} updateProduct={setUpdateProduct} />
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default EquipmentInformation;
