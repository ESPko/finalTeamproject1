import { useEffect, useMemo, useRef, useState, memo } from 'react';

function Correspondent ({ selected, setSelected })
{
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [vendors, setVendors] = useState([]);
  const dropdownRef = useRef(null);
  
  // 거래처 목록 불러오기
  useEffect(() => {
    const fetchVendors = async () => {
      try
      {
        const response = await fetch('http://localhost:8080/api/vendors');
        if (!response.ok) throw new Error('서버 오류');
        const data = await response.json();
        const names = [...new Set(data.map(v => v.name))];
        setVendors(names);
      }
      catch (error)
      {
        console.error('거래처 데이터를 불러오는 데 실패했습니다:', error);
      }
    };
    fetchVendors();
  }, []);
  
  // 검색 필터
  const filtered = useMemo(() => {
    return vendors.filter(item =>
      item.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, vendors]);
  
  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
      {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const toggle = (item) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item],
    );
  };
  
  const isChecked = (item) => selected.includes(item);
  const displayText =
    selected.length > 0 ? `거래처 : ${selected.join(', ')}` : '거래처';
  
  return (
    <div className="relative inline-block text-left h-auto" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={`h-[40px] max-w-[400px] px-4 border overflow-hidden whitespace-nowrap text-ellipsis rounded ${
          selected.length > 0
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
            {filtered.map((item) => (
              <li key={item} className="hover:bg-gray-100">
                <label className="flex items-center px-3 py-2 w-full whitespace-nowrap cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked(item)}
                    onChange={() => toggle(item)}
                    className="mr-2 accent-blue-500"
                  />
                  <span className="text-gray-800">{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default memo(Correspondent);
