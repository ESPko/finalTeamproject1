import { memo } from 'react';

function InventoryTableBody ({ products })
{
  if (!products || products.length === 0)
  {
    return (
      <tbody>
      <tr>
        <td colSpan="8" className="text-center py-10 text-gray-500">
          해당 결과가 없습니다.
        </td>
      </tr>
      </tbody>
    );
  }
  
  return (
    <tbody>
    {products.map((product) => (
      <tr key={product.id || product.name} className="border-b border-gray-200 text-center">
        <td className="py-2 px-2 w-[120px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-[60px] h-[60px] object-cover mx-auto rounded"
          />
        </td>
        <td className="cell-style">{product.name}</td>
        <td className="cell-style max-w-[15%] truncate">{product.warehouseName}</td>
        <td className="cell-style truncate max-w-[17%]">{product.vendorName}</td>
        <td className="cell-style text-blue-600">{product.inbound}</td>
        <td className="cell-style text-red-600">{product.outbound}</td>
        <td className="cell-style text-green-600">{product.adjusted}</td>
        <td className="cell-style">{product.totalQuantity}</td>
      </tr>
    ))}
    </tbody>
  );
}

export default memo(InventoryTableBody);
