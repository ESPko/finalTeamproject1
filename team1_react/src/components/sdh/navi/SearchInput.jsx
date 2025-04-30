import React, { useCallback, useRef, useState } from 'react';

const SearchInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [tags, setTags] = useState([]);
  const inputRef = useRef(null);
  
  const handleKeyDown = useCallback((e) => {
    const trimmed = inputValue.trim();
    
    if (e.key === 'Enter')
    {
      e.preventDefault();
      if (trimmed && !tags.includes(trimmed))
      {
        setTags((prev) => [...prev, trimmed]);
        setInputValue('');
      }
    }
    else if (e.key === 'Backspace' && !inputValue && tags.length > 0)
    {
      e.preventDefault();
      setTags((prev) => prev.slice(0, -1));
    }
  }, [inputValue, tags]);
  
  const handleRemoveTag = useCallback((tagToRemove) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }, []);
  
  const handleClearAll = useCallback(() => {
    setTags([]);
    setInputValue('');
    inputRef.current?.focus(); // Clear 후에도 포커스 유지
  }, []);
  
  const handleDivClick = (e) => {
    // 클릭한 요소가 X 또는 × 버튼이 아니면 인풋에 포커스를 준다.
    if (!e.target.closest('button'))
    {
      inputRef.current?.focus();
    }
  };
  
  return (
    <div
      className="relative w-[400px] min-h-[40px] flex items-center border border-gray-300 rounded-md bg-white px-3 py-2 text-sm text-gray-400 flex-wrap focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 outline-none transition-all"
      onClick={handleDivClick}
    >
      {/* 돋보기 아이콘 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 mr-2 text-gray-400 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
      
      {/* 태그들 */}
      {tags.map((tag) => (
        <div
          key={tag}
          className="flex items-center bg-gray-200 text-gray-700 px-2 py-[2px] text-xs border border-gray-300 rounded-md mr-1 my-[1px]"
        >
          <span className="mr-1">{tag}</span>
          <button
            onClick={() => handleRemoveTag(tag)}
            className="text-gray-500 hover:text-gray-700 text-[13px]"
            aria-label={`Remove ${tag}`}
          >
            ×
          </button>
        </div>
      ))}
      
      {/* 입력창 */}
      <input
        ref={inputRef}
        type="text"
        placeholder={tags.length === 0 ? '이름 검색' : ''}
        className="flex-1 min-w-[60px] bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      
      {/* 전체 삭제 버튼 */}
      {tags.length > 0 && (
        <button
          onClick={handleClearAll}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-[20px] w-6 h-6"
          aria-label="Clear all tags"
        >
          X
        </button>
      )}
    </div>
  );
};

export default SearchInput;
