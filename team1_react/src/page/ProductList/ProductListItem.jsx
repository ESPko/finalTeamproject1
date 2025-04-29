import ProductDetail from './ProductDetail.jsx';

function ProductListItem({products, onSelectedProduct}) {

  const totalAmount = products.reduce((sum,product) => sum + (product.amount ?? 0),0)

  return (
    <div className="border runded">
      <div className="flex justify-between items-center bg-gray-200 px-4 py-2">
        <h6 >{products.length}개 품목</h6>
        <h6 >총 {totalAmount}개</h6>
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
                  <p className="text-indigo-500">{product.amount ??0}개</p>
                </div>
              </div>
            </li>
          ))}

        </ul>
      </div>

  );
}

export default ProductListItem;
