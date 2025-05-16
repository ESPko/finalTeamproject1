import { useEffect, useMemo, useRef, useState } from 'react';
import axiosInstance from '../../../api/axiosInstance.jsx';

function Department({ selected, setSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [departments, setDepartments] = useState([]);
  const dropdownRef = useRef(null);

  // 서버에서 부서 리스트 가져오기 (axiosInstance 사용)
  useEffect(() => {
    axiosInstance.get('/api/departments')
      .then(res => {
        const names = res.data.map(item => item.department);
        setDepartments(names);
      })
      .catch(err => {
        console.error('부서 목록 불러오기 실패:', err);
      });
  }, []);

  // 검색어 필터링된 부서 목록
  const filteredDepartments = useMemo(() => {
    return departments.filter(dept =>
      dept.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, departments]);

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

  // 선택 토글
  const toggleDepartment = (dept) => {
    setSelected(prev =>
      prev.includes(dept)
        ? prev.filter(item => item !== dept)
        : [...prev, dept]
    );
  };

  const isChecked = (dept) => selected.includes(dept);
  const displayText = selected.length > 0 ? `부서: ${selected.join(', ')}` : '부서';

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
            placeholder="부서 검색"
            className="w-full px-3 py-2 border-none outline-none focus:ring-2 focus:ring-blue-400 rounded-t-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ul className="overflow-y-auto max-h-60 p-0">
            {filteredDepartments.map((dept, index) => (
              <li key={index} className="hover:bg-gray-100">
                <label className="flex items-center px-3 py-2 w-full whitespace-nowrap cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked(dept)}
                    onChange={() => toggleDepartment(dept)}
                    className="mr-2 accent-blue-500"
                  />
                  <span className="text-gray-800">{dept}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Department;
