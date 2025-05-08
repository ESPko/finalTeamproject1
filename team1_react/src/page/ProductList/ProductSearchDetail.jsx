function productSearchDetail({product}) {

  if (!product) return null;

  return (
    <div >
      <div className="border border-gray-300 rounded ">
        <div className="flex items-center m-3">
          <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4"
          />

          <div className="flex flex-col">
            <p className="text-lg font-medium">{product.name}</p>
            <p className="text-sm text-gray-500">적정 재고: {product.standard}</p>
          </div>
          <div className="ml-auto p-3">
            <p className={`${product.quantity <product.standard ? 'text-red-500': 'text-indigo-500'} font-bold`}>{product.quantity}</p>
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded">
        <div className="bg-gray-200 px-4 p-0.5">
          <p className="text-base font-bold">재고 위치</p>
        </div>
        <ul>
          <li>
            <div className="flex items-center justify-between px-4 py-2">
              <p>{product.warehouseName}</p>

              <p className={`${product.quantity <product.standard ? 'text-red-500': 'text-indigo-500'} font-bold`}>{product.quantity} 개</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default productSearchDetail;
