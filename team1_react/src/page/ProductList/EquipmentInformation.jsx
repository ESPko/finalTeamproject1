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
          alert('수정에 실패했습니다.');
        });
    }
    catch (err)
    {
      console.error('비품 수정 실패:', err);
      if (err.response)
      {
        console.error('서버 응답 오류:', err.response.data); // 서버에서 반환하는 오류 메시지
      }
      alert('수정에 실패했습니다.');
    }
  };
  
  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh] min-h-[90vh]" style={{ padding: '0px 40px 0 40px' }}>
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
            <div className="relative w-full m-3 mt-4 text-center">
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
              <table className="w-full table-flex border-collapse mt-5">
                <thead className="bg-white">
                <tr className="bg-white sticky top-0 z-30 border-b border-gray-200 h-[52px]">
                  <th className="bg-white w-[120px]">사진</th>
                  <th className="bg-white border-r w-[200px] border-gray-200">비품명</th>
                  {visibleColumns.category && <th className="w-[180px]">카테고리</th>}
                  {visibleColumns.vendorName && <th className="w-[190px]">매입회사</th>}
                  {visibleColumns.price && <th className="w-[150px]">매입가</th>}
                  {visibleColumns.standard && <th className="w-[130px]">적정 재고</th>}
                  {visibleColumns.quantity && <th className="w-[130px]">현재 재고</th>}
                  {visibleColumns.warehouseName && <th className="w-[180px]">창고 위치</th>}
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map((product, idx) => (
                  <tr key={idx} onClick={() => handleRowClick(product)}
                      className="border-b border-gray-100 cursor-pointer text-gray-600">
                    <td className="w-[120px] bg-white flex justify-center items-center py-2">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt="비품 이미지"
                          className="w-[60px] h-[60px] object-cover rounded-sm"
                        />
                      ) : (
                        <div
                          className="w-[60px] h-[60px] bg-gray-100 border border-dashed rounded-lg flex items-center justify-center text-2xl text-gray-400">
                          📷
                        </div>
                      )}
                    </td>
                    <td className="w-[200px] bg-white border-r border-gray-300">{product.name}</td>
                    {visibleColumns.category && <td className="w-[180px]">{product.category}</td>}
                    {visibleColumns.vendorName && <td className="w-[190px]">{product.vendorName}</td>}
                    {visibleColumns.price && <td className="w-[150px]">{product.price}</td>}
                    {visibleColumns.standard && <td className="w-[130px]">{product.standard}</td>}
                    {visibleColumns.quantity && <td className="w-[130px]">{product.quantity}</td>}
                    {visibleColumns.warehouseName && <td className="w-[180px]">{product.warehouseName}</td>}
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
                  onClick={() => setDetailModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
                >
                  닫기
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
