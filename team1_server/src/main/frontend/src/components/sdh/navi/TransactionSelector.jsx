import { useState, useRef, useEffect } from 'react';

const transactionOptions = [
  { label: '전체', value: null },
  { label: '입고', value: 0 },
  { label: '출고', value: 1 },
  { label: '조정', value: 2 },
];

function TransactionSelector ({ transactionType, setTransactionType })
{
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const currentLabel =
    transactionOptions.find(opt => opt.value === transactionType)?.label || '거래유형';
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target))
      {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleSelect = (value) => {
    setTransactionType(value);
    setIsOpen(false);
  };
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`h-[40px] px-4 rounded border shadow-sm ${
          transactionType !== null
            ? 'bg-blue-100 text-blue-600 border-blue-300'
            : 'text-gray-800 border-gray-300'
        }`}
      >
        {currentLabel}
      </button>
      
      {isOpen && (
        <div className="absolute mt-1 w-fit min-w-[120px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul className="overflow-y-auto max-h-60 p-0">
            {transactionOptions.map((opt, index) => (
              <li key={index} className="hover:bg-gray-100">
                <button
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left px-4 py-2 whitespace-nowrap"
                >
                  {opt.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TransactionSelector;
