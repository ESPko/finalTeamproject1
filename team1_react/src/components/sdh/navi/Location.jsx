import { useEffect, useMemo, useRef, useState, memo } from 'react';

function Location ({ selected, setSelected })
{
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState([]);
  const dropdownRef = useRef(null);
  
  // 서버에서 창고 리스트 불러오기
  useEffect(() => {
    const fetchLocations = async () => {
      try
      {
        const res = await fetch('http://localhost:8080/api/warehouses');
        if (!res.ok) throw new Error('서버 오류');
        const data = await res.json();
        const uniqueNames = [...new Set(data.map(item => item.name))];
        setLocations(uniqueNames);
      }
      catch (err)
      {
        console.error('창고 목록 불러오기 실패:', err);
      }
    };
    fetchLocations();
  }, []);
  
  // 바깥 클릭 시 드롭다운 닫기
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
  
  const filteredLocations = useMemo(() => {
    return locations.filter(location =>
      location.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, locations]);
  
  const toggleLocation = (location) => {
    setSelected(prev =>
      prev.includes(location)
        ? prev.filter(item => item !== location)
        : [...prev, location],
    );
  };
  
  const isChecked = (location) => selected.includes(location);
  const displayText = selected.length > 0 ? `위치 : ${selected.join(', ')}` : '위치';
  
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
            placeholder="위치 검색"
            className="w-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 rounded-t-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="overflow-y-auto max-h-60 p-0">
            {filteredLocations.map((location) => (
              <li key={location} className="hover:bg-gray-100">
                <label className="flex items-center px-3 py-2 w-full whitespace-nowrap cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked(location)}
                    onChange={() => toggleLocation(location)}
                    className="mr-2 accent-blue-500"
                  />
                  <span className="text-gray-800">{location}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default memo(Location);
