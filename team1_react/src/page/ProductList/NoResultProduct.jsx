function NoResultProduct() {
  return (
    <div className="flex flex-col items-center justify-center mt-4">
      <img src="src/productImg/no_stock.png"
      className="w-[400px] h-[400px]"/>
      <p className="mt-5 text-center font-bold text-2xl">해당 제품이 없습니다.</p>
    </div>
  );
}

export default NoResultProduct;
