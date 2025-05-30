import Topline from '../../components/layout/Topline.jsx';
import { useEffect, useState } from 'react';
import ApproveItemList from './ApproveItemList.jsx';
import axiosInstance from '../../api/axiosInstance.jsx';

function ApprovalPage ()
{
  const [approveProduct, setApproveProduct] = useState([]);
  const [search, setSearch] = useState(``);
  const [filteredProducts, setFilteredProducts] = useState(approveProduct);
  const [selectedApproval, setSelectedApproval] = useState('전체 보기');
  
  const approvalMap = {
    '전체 보기': null,
    '승인 대기': 0,
    '승인': [1, 3],
    '거절': 2,
  };
  
  // 저장된 승인 목록들 불러오기
  useEffect(() => {
    axiosInstance.get('/approve')
      
      .then(res => {
        const mappedData = res.data.map((ap) => ({
          idx: ap.idx,
          time: ap.time,
          image: ap.image,
          name: ap.name,
          category: ap.category,
          warehouseName: ap.warehouseName,
          vendorName: ap.vendorName,
          price: ap.price,
          quantity: ap.quantity,
          approve: ap.approve,
        }));
        setApproveProduct(mappedData);
        setFilteredProducts(mappedData);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);
  
  // 드롭 다운 메뉴 변경
  const approvalSelect = (value) => {
    setSelectedApproval(value);
  };
  
  // 검색 필터링
  useEffect(() => {
    const approvalValue = approvalMap[selectedApproval];
    
    const filtered = approveProduct.filter(product => {
      const matchApproval =
        approvalValue === null
          ? true
          : Array.isArray(approvalValue)
            ? approvalValue.includes(product.approve)
            : product.approve === approvalValue;
      
      const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
      return matchApproval && matchSearch;
    });
    setFilteredProducts(filtered);
  }, [approveProduct, selectedApproval, search]);
  
  // 이름 끝까지 다 안치고 일부분만 쳐도 결과가 나오게 함
  const searchProduct = () => {
    const filtered = approveProduct.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredProducts(filtered);
  };
  
  // 승인 혹은 거절 버튼 눌렀을 시 approve 값 변경
  const changeApprove = (idx, approveStatus) => {
    const token = localStorage.getItem('token');
    
    axiosInstance.put('/updateApprove', {
        idx: idx,
        approve: approveStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('승인 or 거절 완료 : ', res.data);
        
        setApproveProduct(prev => prev.map(item => item.idx === idx ? { ...item, approve: approveStatus } : item));
      })
      .catch(err => {
        console.log('승인 or 거절 실패 : ', err);
        alert('권한이 없습니다');
      });
  };
  
  return (
    <main className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh]  min-h-[80vh] "
           style={{ padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline
            title="승인목록"
          >
            <div className=" mt-[40px] ">
              <div className="flex w-full h-[40px]">
                
                {/*승인 여부 검색용 드롭다운 메뉴*/}
                <select
                  value={selectedApproval}
                  onChange={(e) => {
                    setSelectedApproval(e.target.value);
                    approvalSelect(e.target.value);
                  }}
                  className="w-[200px] h-[36px] border border-gray-300 rounded px-3 text-sm mr-5"
                >
                  <option value="전체 보기">전체 보기</option>
                  {['승인 대기', '승인', '거절'].map((name) => (
                    <option key={name} value={name}>{name}</option>
                  ))}
                </select>
                
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="제품 이름 검색"
                  className="w-[440px] h-[36px] border border-gray-300 rounded p-[10px] text-sm"
                />
                <button onClick={searchProduct}
                        type={'button'}
                        className={'ml-[10px] h-[36px] w-[50px] border font-semibold border-gray-300 rounded-sm hover:bg-gray-100 shadow-sm text-gray-500'}>검색
                </button>
              </div>
            </div>
            
            {/* 승인 목록 리스트 컴포넌트*/}
            <ApproveItemList
              approveProduct={filteredProducts}
              changeApprove={changeApprove}
            />
          </Topline>
        
        </div>
      </div>
    </main>
  );
}

export default ApprovalPage;