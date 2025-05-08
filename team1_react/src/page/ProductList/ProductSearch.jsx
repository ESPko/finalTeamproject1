
import { useState } from 'react';
import ProductSearchItem from './ProductSearchItem.jsx';
import NoResultProduct from './NoResultProduct.jsx';
import ProductListDetail from './ProductSearchDetail.jsx';
import Topline from '../../components/layout/Topline.jsx';
import { SearchIcon } from 'lucide-react';

function ProductSearch() {
  const [search, setSearch] = useState(``)

  // 비품 더미 데이터
  const [products] = useState([
    {id:1, name: '비품1',amount: 1, location:'창고 1', standardStock: 10},
    {id:2, name: '비품2',amount: 7, location:'창고 4', standardStock: 10},
    {id:3, name: '비품3',amount: 5, location:'창고 2', standardStock: 10},
    {id:4, name: '비품4',amount: 3, location:'창고 3', standardStock: 10},
    {id:5, name: '비품5',amount: 10, location:'창고 1', standardStock: 10},
  ])
  // 제품 상세보기를 위한 제품 선택
  const [selectedProduct, setSelectedProduct] = useState(null)

  const [filteredProducts,setFilteredProducts] = useState(products)

  const [selectedWarehouse, setSelectedWarehouse] =useState('위치 선택')

  const changSearch = (e) =>{
    setSearch(e.target.value);
  };

  // 검색
  const searchProduct = () =>{
    const filtered = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedWarehouse === '모든 창고' || product.location === selectedWarehouse));
    setFilteredProducts(filtered)
    setSelectedProduct(null)
  }

  // 창고선택시 변경
  const warehouseSelect = (warehouse) => {
    setSelectedWarehouse(warehouse);

    const filtered = products.filter(product => (warehouse === '모든 창고' || product.location === warehouse) && product.name.toLowerCase().includes(search.toLowerCase())
    )
    setFilteredProducts(filtered)
    setSelectedProduct(null)
  }

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
                      className="w-full border border-gray-300 rounded px-3 py-2">
                      {['모든 창고', '창고 1','창고 2','창고 3','창고 4',].map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                  </div>

                  {/* 검색창 */}
                  <div className="flex items-center flex-grow max-w-[800px] mt-3">
                    <input
                      type="text"
                      value={search}
                      onChange={changSearch}
                      placeholder="찾으시는 비품의 이름을 입력하세요"
                      className="flex-grow border border-gray-300 px-4 py-2 rounded-l outline-none"
                    />
                    <button
                      onClick={searchProduct}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
                    >
                      {/*<img src="src/productImg/search.png" width={'27px'}/>*/}
                      <SearchIcon />
                    </button>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-1/2 mt-12 p-3">
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

                  <div className="w-1/2 mt-12 p-3">
                    {/* 상세 보기 */}
                    <ProductListDetail product={selectedProduct} />
                  </div>
                </div>
              </div>
            </div>

          </Topline>

        </div>
      </div>
    </div>
  );
}


export default ProductSearch
