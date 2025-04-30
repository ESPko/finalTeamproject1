import { useEffect, useMemo, useRef, useState } from 'react';

function Location ()
{
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedLocations, setSelectedLocations] = useState([]);
  const dropdownRef = useRef(null);
  
  const locations = [
    '임시창고1',
    '임시창고2',
    '엄청엄청길어져도되는이름테스트용임시창고',
    '임시창고3',
    '임시창고4',
    'ASDASD',
    'asdASD',
  ];
  
  const filteredLocations = useMemo(() => {
    return locations.filter((location) =>
      location.toLowerCase().includes(search.toLowerCase()),
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
  
  const toggleLocation = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((item) => item !== location)
        : [...prev, location],
    );
  };
  
  const isChecked = (location) => selectedLocations.includes(location);
  
  const displayText =
    selectedLocations.length > 0
      ? `위치 : ${selectedLocations.join(', ')}`
      : '위치';
  
  const hasSelection = selectedLocations.length > 0;
  
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
            placeholder="위치 검색"
            className="w-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 rounded-t-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="overflow-y-auto max-h-60 p-0">
            {filteredLocations.map((location, index) => {
              const inputId = `location-${index}`;
              return (
                <li key={inputId} className="hover:bg-gray-100">
                  <label
                    htmlFor={inputId}
                    className="flex items-center px-3 py-2 w-full whitespace-nowrap cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      id={inputId}
                      checked={isChecked(location)}
                      onChange={() => toggleLocation(location)}
                      className="mr-2 accent-blue-500"
                    />
                    <span className="text-gray-800">{location}</span>
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

export default Location;
