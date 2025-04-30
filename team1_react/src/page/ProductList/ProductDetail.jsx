function productDetail({product}) {

  if (!product) return null;

  return (
    <div >
      <div className="border rounded ">
        <div className="flex items-center m-3">
          <img src="src/productImg/pencil.png"
              className="w-[50px] h-[50px] mr-3"/>

          <div className="flex flex-col">
            <p className="text-lg font-medium">{product.name}</p>
            <p className="text-sm text-gray-500">적정 재고: {product.standardStock}</p>
          </div>
          <div className="ml-auto p-3">
            <p className={`${product.amount <product.standardStock ? 'text-red-500': 'text-indigo-500'} font-bold`}>{product.amount}</p>
          </div>
        </div>
      </div>
      <div className="border rounded">
        <div className="bg-gray-200 px-4 p-0.5">
          <p className="text-base font-bold">재고 위치</p>
        </div>
        <ul>
          <li>
            <div className="flex items-center justify-between px-4 py-2">
              <p>{product.location}</p>

                <p className={`${product.amount <product.standardStock ? 'text-red-500': 'text-indigo-500'} font-bold`}>{product.amount} 개</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default productDetail;
