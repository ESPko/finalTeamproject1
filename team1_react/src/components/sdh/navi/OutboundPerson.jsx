import { useEffect, useMemo, useRef, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance.jsx';

function OutboundPerson({ selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [outboundPersons, setOutboundPersons] = useState([]);
  const dropdownRef = useRef(null);

  // 출고자 데이터 불러오기
  useEffect(() => {
    const fetchOutboundPersons = async () => {
      try {
        const response = await axiosInstance.get('/api/nickNames');
        const names = response.data.map(item => item.nickName);
        setOutboundPersons(names);
      } catch (err) {
        console.error('출고자 목록 불러오기 실패:', err);
      }
    };
    fetchOutboundPersons();
  }, []);

  // 검색 필터
  const filteredOutboundPersons = useMemo(() => {
    return outboundPersons.filter(person =>
      person.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, outboundPersons]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 출고자 선택/해제
  const togglePerson = (person) => {
    setSelected(prev =>
      prev.includes(person)
        ? prev.filter(item => item !== person)
        : [...prev, person]
    );
  };

  const isChecked = (person) => selected.includes(person);
  const displayText = selected.length > 0 ? `출고자: ${selected.join(', ')}` : '출고자';

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
            placeholder="출고자 검색"
            className="w-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 rounded-t-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="overflow-y-auto max-h-60 p-0">
            {filteredOutboundPersons.map((person, index) => (
              <li key={index} className="hover:bg-gray-100">
                <label className="flex items-center px-3 py-2 w-full whitespace-nowrap cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked(person)}
                    onChange={() => togglePerson(person)}
                    className="mr-2 accent-blue-500"
                  />
                  <span className="text-gray-800">{person}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OutboundPerson;
