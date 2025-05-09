import { useState } from 'react';

function ProductSearchItem({products, onSelectedProduct}) {

  // 전체 재고수량
  const totalAmount = products.reduce((sum,product) => sum + (product.quantity ?? 0),0)

  const [selected, setSelected] = useState(null)

  return (
    <div className="border border-gray-300 runded">
      <div className="flex justify-between items-center bg-gray-200 px-4 pt-1">
        {/*전체 비품 목록 개수*/}
        <p className="font-bold">{products.length} 개 품목</p>
        {/*전체 비품 재고 수량*/}
        <p className="font-bold">총 {totalAmount} 개</p>
      </div>
      <ul className="w-full ">
        {products.map((product) =>(

          <li key={product.idx} className="border border-gray-300  cursor-pointer" onClick={() => onSelectedProduct(product)}>
            <div className="flex items-center hover:bg-gray-100 active:bg-gray-200">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4"
              />

              <div className="flex flex-col">
                <p
                  className="text-black  text-left mb-2"
                  onClick={() => onSelectedProduct(product)}>
                  {product.name}
                </p>
                <p className="text-sm text-gray-500">적정 재고: {product.standard}</p>
              </div>
              <div className="ml-auto p-2">
                <p className={`${product.quantity <product.standard ? 'text-red-500': 'text-indigo-500'} font-bold` }>{product.quantity ??0}개</p>
              </div>
            </div>
          </li>
        ))}

      </ul>
    </div>

  );
}

export default ProductSearchItem;
