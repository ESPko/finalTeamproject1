
import { useState } from 'react';
import ProductListItem from './ProductListItem.jsx';
import NoResultProduct from './NoResultProduct.jsx';
import ProductListDetail from './ProductListDetail.jsx';

function ProductList() {
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

  const [dropdownMenu, setDropdownMenu] = useState(false)

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
    <div className="px-10 pb-20">
      <div className="bg-[#0d6efd] m-3 w-[1500px] h-[82px] flex items-center px-6">
        <div className="text-2xl text-white">비품 목록</div>
      </div>

      <div className="bg-white m-3 w-full p-6 rounded ">
        <div className="flex justify-between items-center gap-4 mb-6">

          {/* 창고 위치 선택 드롭다운 메뉴 */}
          <div className="relative">
            <button
              onClick={() => setDropdownMenu(!dropdownMenu)}
              className="bg-gray-100 hover:bg-gray-200 text-black px-4 py-2 rounded"
            >
              {selectedWarehouse}
            </button>
            {dropdownMenu && (
              <ul className="absolute mt-2 px-1 bg-white border rounded">
                {['모든 창고', '창고 1', '창고 2', '창고 3', '창고 4'].map((name) => (
                  <li key={name}>
                    <button
                      onClick={() => {
                        warehouseSelect(name);
                        setDropdownMenu(false);
                      }}
                      className="w-full text-left py-2 p-2 hover:bg-gray-100"
                    >
                      {name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 검색창 */}
          <div className="flex items-center flex-grow max-w-[1000px]">
            <input
              type="text"
              value={search}
              onChange={changSearch}
              placeholder="찾으시는 비품의 이름을 입력하세요"
              className="flex-grow border px-4 py-2 rounded-l outline-none"
            />
            <button
              onClick={searchProduct}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r"
            >
              <i className="bi bi-search" />
            </button>
          </div>

          {/* 제품 추가 버튼 */}
          <button className="bg-[#a599ed] text-white px-4 py-2 rounded hover:opacity-90">
            제품 추가
          </button>
        </div>

        <div className="flex gap-6">
          <div className="w-1/2 mt-12 p-3">
            {/* 비품 리스트 */}
            {filteredProducts.length > 0 ? (
              <ProductListItem
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
  );
}


export default ProductList
