import Topline from '../../components/layout/Topline.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ApproveItemList from './ApproveItemList.jsx';


function ApprovalPage() {
  const [approveProduct, setApproveProduct] = useState([]);


  const [search, setSearch] = useState(``)
  const [filteredProducts,setFilteredProducts] = useState(approveProduct)

  // API 연결
  // 저장된 배열로 불러오기
  useEffect(() => {
    axios.get('http://localhost:8080/approve')

      .then(res => {
        const mappedData = res.data.map((ap, index) => ({
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
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  // 검색

  useEffect(() => {
    setFilteredProducts(approveProduct);
  }, [approveProduct]);

  const changSearch = (e) =>{
    setSearch(e.target.value);
  };

  const searchProduct = () =>{
    const filtered = approveProduct.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredProducts(filtered)
  }

  // 승인 혹은 거절 버튼 눌렀을 시 approve 값 변경
  const changeApprove = (idx, approveStatus) => {
    axios.put('http://localhost:8080/updateApprove', {
      idx: idx,
      approve: approveStatus,
    })
      .then(res => {
        console.log('승인 or 거절 완료 : ', res.data);

        setApproveProduct(prev => prev.map(item => item.idx === idx ? { ...item, approve: approveStatus } : item));
      })
      .catch(err => {
        console.log('승인 or 거정 실패 : ', err);
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
            <div className=" mt-[40px]">
              <div>
                <input
                  type="text"
                  value={search}
                  onChange={changSearch}
                  placeholder="제품 이름 검색"
                  className="w-[300px] h-[36px] border border-gray-300 rounded p-[10px] text-sm"
                />
                <button onClick={searchProduct}
                        type={'button'}
                        className={'ml-[10px] h-[36px] w-[50px] border font-semibold border-gray-300 rounded-sm hover:bg-gray-100 shadow-sm text-gray-600'}>검색
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