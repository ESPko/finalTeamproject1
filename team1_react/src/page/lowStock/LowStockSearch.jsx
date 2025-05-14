import { useState, useEffect } from 'react';

function LowStockSearch({ items, onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // 디바운싱을 위한 타이머
  useEffect(() => {
    const timer = setTimeout(() => {
      onSelect(inputValue); // 300ms 후에 onSelect 호출
    }, 300); // 300ms 지연

    return () => clearTimeout(timer); // 이전 타이머를 클리어
  }, [inputValue, onSelect]); // inputValue가 바뀔 때마다 실행

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setSuggestions([]);
      onSelect(''); // 검색어가 비었을 때
      return;
    }

    // 검색어에 맞는 항목 필터링
    const matched = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matched.slice(0, 5)); // 5개까지만 보여줌
  };

  const handleSuggestionClick = (name) => {
    setInputValue(name);
    setSuggestions([]); // 클릭 후 제안 목록 제거
    onSelect(name);
  };

  const handleSearchClick = () => {
    setSuggestions([]);
    onSelect(inputValue); // 검색 버튼 클릭 시
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="제품 이름 검색"
        className="w-[300px] h-[36px] border border-gray-300 rounded p-[10px] text-sm"
      />
      <button
        type="button"
        onClick={handleSearchClick}
        className="ml-[10px] h-[36px] w-[50px] border font-semibold border-gray-300 rounded-sm hover:bg-gray-100 shadow-sm text-gray-500"
      >
        검색
      </button>

      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded w-[300px] mt-1 shadow-md z-10">
          {suggestions.map((item) => (
            <li
              key={item.idx}
              onClick={() => handleSuggestionClick(item.name)}
              className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default LowStockSearch;
