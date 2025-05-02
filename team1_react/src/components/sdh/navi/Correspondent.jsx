import { useEffect, useMemo, useRef, useState } from 'react';

function Correspondent ()
{
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCorrespondents, setSelectedCorrespondents] = useState([]);
  const dropdownRef = useRef(null);
  
  const correspondents = [
    '임시거래처1',
    '임시거래처2',
    '엄청엄청길어져도되는이름테스트용임시거래처',
    '임시거래처3',
    '임시거래처4',
    'ASDASD',
    'asdASD',
  ];
  
  const filteredCorrespondents = useMemo(() => {
    return correspondents.filter((correspondent) =>
      correspondent.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      )
      {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggleCorrespondent = (correspondent) => {
    setSelectedCorrespondents((prev) =>
      prev.includes(correspondent)
        ? prev.filter((item) => item !== correspondent)
        : [...prev, correspondent],
    );
  };
  
  const isChecked = (correspondent) => selectedCorrespondents.includes(correspondent);
  
  const displayText =
    selectedCorrespondents.length > 0
      ? `거래처 : ${selectedCorrespondents.join(', ')}`
      : '거래처';
  
  const hasSelection = selectedCorrespondents.length > 0;
  
  return (
    <div className="relative inline-block text-left h-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`h-[40px] max-w-[400px] px-4 border overflow-hidden whitespace-nowrap text-ellipsis rounded ${
          hasSelection
            ? 'bg-blue-100 text-blue-600 border-blue-300'
            : 'bg-gray-200 text-gray-800 border-gray-300'
        }`}
      >
        {displayText}
      </button>
      
      {isOpen && (
        <div className="absolute mt-1 w-fit min-w-[200px] max-w-[400px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <input
            type="text"
            placeholder="거래처 검색"
            className="w-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 rounded-t-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="overflow-y-auto max-h-60 p-0">
            {filteredCorrespondents.map((correspondent, index) => {
              const inputId = `correspondent-${index}`;
              return (
                <li key={inputId} className="hover:bg-gray-100">
                  <label
                    htmlFor={inputId}
                    className="flex items-center px-3 py-2 w-full whitespace-nowrap cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={inputId}
                      checked={isChecked(correspondent)}
                      onChange={() => toggleCorrespondent(correspondent)}
                      className="mr-2 accent-blue-500"
                    />
                    <span className="text-gray-800">{correspondent}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Correspondent;
