function productSearchDetail({product}) {

  if (!product) return null;

  return (
    <div >
      <div className="border-t border-gray-200 h-[97px]">
        <div className="flex items-center m-3">
          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4"
          />

          <div className="flex flex-col">
            <p className="font-medium">{product.name}</p>
            <p className="text-sm text-gray-500">적정 재고: {product.standard}</p>
          </div>
          <div className="ml-auto p-3">
            <p className={`${product.quantity <product.standard ? 'text-red-400': 'text-blue-400'} font-bold`}>{product.quantity}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="bg-gray-100 px-4 h-[36px] flex items-center border-b border-gray-200">
          <p className="text-base font-semibold text-gray-500">재고 위치</p>
        </div>
        <ul>
          <li className="border-b border-gray-100 h-[64px]">
            <div className="flex items-center justify-between px-4 py-5">
              <div>{product.warehouseName}</div>

              <p className={`${product.quantity <product.standard ? 'text-red-400': 'text-blue-400'} font-bold`}>{product.quantity} 개</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default productSearchDetail;
