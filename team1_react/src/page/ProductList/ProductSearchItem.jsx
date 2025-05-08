function ProductSearchItem({products, onSelectedProduct}) {

  const totalAmount = products.reduce((sum,product) => sum + (product.quantity ?? 0),0)


  return (
    <div className="border border-gray-300 runded">
      <div className="flex justify-between items-center bg-gray-200 px-4 pt-1">
        <p className="font-bold">{products.length} 개 품목</p>
        <p className="font-bold">총 {totalAmount} 개</p>
      </div>
      <ul className="w-full ">
        {products.map((product) =>(

          <li key={product.idx} className="border border-gray-300">
            <div className="flex items-center ">
              <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4"
              />

              <div className="flex flex-col">
                <button
                  className="text-black hover:underline text-left"
                  onClick={() => onSelectedProduct(product)}>
                  {product.name}
                </button>
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