import ProductDetail from './ProductDetail.jsx';

function ProductListItem({products, onSelectedProduct}) {

  const totalAmount = products.reduce((sum,product) => sum + (product.amount ?? 0),0)


  return (
    <div className="border runded">
      <div className="flex justify-between items-center bg-gray-200 px-4 pt-1">
        <p className="font-bold">{products.length} 개 품목</p>
        <p className="font-bold">총 {totalAmount} 개</p>
      </div>
      <ul className="w-full">
          {products.map((product) =>(

            <li key={product.id} className="mt-3">
              <div className="flex items-center">
                <img
                  src="src/productImg/pencil.png"
                  alt="product"
                  className="w-[50px] h-[50px] mr-5"
                />

                <div className="flex flex-col">
                  <button
                    className="text-black hover:underline text-left"
                    onClick={() => onSelectedProduct(product)}>
                    {product.name}
                  </button>
                  <p className="text-sm text-gray-500">적정 재고: {product.standardStock}</p>
                </div>
                <div className="ml-auto p-2">
                  <p className={`${product.amount <product.standardStock ? 'text-red-500': 'text-indigo-500'} font-bold` }>{product.amount ??0}개</p>
                </div>
              </div>
            </li>
          ))}

        </ul>
      </div>

  );
}

export default ProductListItem;
