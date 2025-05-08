function StatusTableBody ({ products })
{
  if (!products || products.length === 0)
  {
    return (
      <tbody>
      <tr>
        <td colSpan="9" className="text-center py-10 text-gray-500">
          해당 결과가 없습니다.
        </td>
      </tr>
      </tbody>
    );
  }
  
  return (
    <tbody>
    {products.map((product, idx) => (
      <tr key={idx} className="border-b border-gray-200 text-center">
        <td className="py-2 px-2 w-[120px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-[60px] h-[60px] object-cover mx-auto rounded"
          />
        </td>
        <td className="cell-style">{product.name}</td>
        <td className="cell-style">{product.tempWarehouse}</td>
        <td className="cell-style">{product.vendorName}</td>
        <td className="cell-style">{product.department}</td>
        <td className="cell-style">{product.outboundPerson}</td>
        <td className="cell-style">{product.beforeQuantity + ` -> ` + product.afterQuantity}</td>
        <td className="cell-style">{product.afterQuantity - product.beforeQuantity}</td>
        <td className="cell-style">{product.date}</td>
      </tr>
    ))}
    </tbody>
  );
}

export default StatusTableBody;
