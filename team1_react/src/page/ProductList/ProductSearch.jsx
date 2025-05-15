
import { useEffect, useState } from 'react';
import ProductSearchItem from './ProductSearchItem.jsx';
import NoResultProduct from './NoResultProduct.jsx';
import ProductListDetail from './ProductSearchDetail.jsx';
import Topline from '../../components/layout/Topline.jsx';
import { SearchIcon } from 'lucide-react';
import axiosInstance  from '../../api/axiosInstance.jsx';
import { useNavigate } from 'react-router-dom';



function ProductSearch() {
  const [search, setSearch] = useState(``)

  const [products,setProduct] = useState([])

  // 제품 상세보기를 위한 제품 선택
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [filteredProducts,setFilteredProducts] = useState(products)

  const [selectedWarehouse, setSelectedWarehouse] =useState('모든 창고')

  useEffect(() => {
    axiosInstance.get('/productSearch')
      .then(res => {
        const mappedData = res.data.map((ps) => ({
          idx:ps.idx,
          image:ps.image,
          name:ps.name,
          standard:ps.standard,
          quantity:ps.quantity,
          warehouseName:ps.warehouseName
        }));
        setProduct(mappedData)
        setFilteredProducts(mappedData)
      })
      .catch(err => {
        console.error(err)
      })
  }, []);


  const changSearch = (e) =>{
    setSearch(e.target.value);
  };

  // 검색
  const searchProduct = () =>{
    const filtered = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedWarehouse === '모든 창고' || product.warehouseName === selectedWarehouse));
    setFilteredProducts(filtered)
    setSelectedProduct(null)
  }

  // 창고선택시 변경
  const warehouseSelect = (warehouse) => {
    setSelectedWarehouse(warehouse);

    const filtered = products.filter(product => (warehouse === '모든 창고' || product.warehouseName === warehouse) && product.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredProducts(filtered)
    setSelectedProduct(null)
  }

  const navigate = useNavigate();

  return (
    <div className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh]  min-h-[80vh] " style={{ padding: '0px 40px 80px 40px' }} >
        <div>
          <Topline title="비품 검색"
          >
            <div>
              <div className="bg-white m-3 max-w-full p-6 rounded ">
                <div className="flex  items-center gap-4 mb-6">

                  {/* 창고 위치 선택 드롭다운 메뉴 */}
                  <div className="mb-4">
                    <label className="font-semibold mb-2 block">창고 선택</label>
                    <select
                      value={selectedWarehouse}
                      onChange={(e) => {
                        setSelectedWarehouse(e.target.value)
                        warehouseSelect(e.target.value)
                      }}
                      className="w-[200px] h-[35px] border border-gray-300 rounded px-3 text-sm">
                      {['모든 창고', '창고1','창고2','창고3','창고4',].map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>

                  {/* 검색창 */}
                  <div className="flex items-center flex-grow max-w-[500px] mt-3">
                    <input
                      type="text"
                      value={search}
                      onChange={changSearch}
                      placeholder="찾으시는 비품의 이름을 입력하세요"
                      className="flex-grow border w-[440px] h-[36px] border-gray-300 px-4 py-2 rounded outline-none mr-3"
                    />
                    <button
                      onClick={searchProduct}
                      className="h-[36px] hover:bg-gray-100 shadow-sm border  border-gray-300 text-gray-500 px-4 rounded"
                    >
                      {/*<img src="src/productImg/search.png" width={'27px'}/>*/}
                      <SearchIcon />
                    </button>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-1/2">
                    {/* 비품 리스트 */}
                    {filteredProducts.length > 0 ? (
                      <ProductSearchItem
                        products={filteredProducts}
                        onSelectedProduct={setSelectedProduct}
                      />
                    ) : (
                      <NoResultProduct />
                    )}
                  </div>

                  <div className="w-px bg-gray-200 "/>

                  <div className="w-1/2">
                    {/* 상세 보기 */}
                    <ProductListDetail product={selectedProduct} />
                  </div>
                </div>
              </div>
            </div>

          </Topline>
          <button
            onClick={() => navigate('/')}
            className={"bg-gray-500 text-white rounded p-2 hover:cursor-pointer"}>메인 화면 가기</button>

        </div>
      </div>
    </div>
  );
}


export default ProductSearch
