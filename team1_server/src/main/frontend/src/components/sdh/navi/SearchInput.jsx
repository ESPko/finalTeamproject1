import { useRef, useState } from 'react';
import { XCircle, Search, X } from 'lucide-react';

const SearchInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  
  const handleKeyDown = (e) => {
    const trimmedValue = inputValue.trim();
    
    if (e.key === 'Enter')
    {
      e.preventDefault();
      if (trimmedValue !== '' && !tags.includes(trimmedValue))
      {
        setTags([...tags, trimmedValue]);
        setInputValue('');
      }
    }
    else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0)
    {
      e.preventDefault();
      const updatedTags = [...tags];
      updatedTags.pop();
      setTags(updatedTags);
    }
  };
  
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };
  
  const handleClearAllTags = () => {
    setTags([]);
    setInputValue('');
    inputRef.current?.focus();
  };
  
  const handleContainerClick = (e) => {
    if (!e.target.closest('button'))
    {
      inputRef.current?.focus();
    }
  };
  
  return (
    <div
      className="relative w-[400px] min-h-[40px] flex items-center border border-gray-300 rounded-md bg-white px-2 py-1 text-sm text-gray-400 flex-wrap focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 outline-none transition-all"
      onClick={handleContainerClick}
    >
      <Search className="w-4 h-4 mr-1 text-gray-400" />
      
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center text-gray-700 bg-gray-200 px-2 py-1 rounded-full mr-1 mb-1"
        >
          <span className="mr-1 text-xs">{tag}</span>
          <button
            type="button"
            onClick={() => handleRemoveTag(tag)}
            className="focus:outline-none"
          >
            <X className="w-3 h-3 text-gray-600" />
          </button>
        </div>
      ))}
      
      <input
        ref={inputRef}
        type="text"
        className="flex-1 min-w-[80px] bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
        placeholder={tags.length === 0 ? '검색어를 입력하세요' : ''}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      
      {tags.length > 0 && (
        <button
          type="button"
          onClick={handleClearAllTags}
          className="absolute right-2 text-gray-400 hover:text-gray-600"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
