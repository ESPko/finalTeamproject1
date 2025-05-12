import { useState } from 'react';

function LowStockSearch({ items, onSelect }) {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setSuggestions([]);
      onSelect('');
      return;
    }

    const matched = items.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(matched.slice(0, 5));
  };

  const handleSuggestionClick = (name) => {
    setInputValue(name);
    setSuggestions([]);
    onSelect(name);
  };

  const handleSearchClick = () => {
    setSuggestions([]);
    onSelect(inputValue);
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
        className="ml-[10px] h-[36px] w-[50px] border font-semibold border-gray-300 rounded-sm hover:bg-gray-100 shadow-sm text-gray-600"
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
