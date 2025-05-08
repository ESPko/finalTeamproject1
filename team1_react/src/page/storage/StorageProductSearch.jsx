import { useEffect, useState } from 'react';
import axios from 'axios';

function StorageProductSearch({onSelect}) {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // 처음에 데이터 받아오기
  useEffect(() => {
    axios.get('http://localhost:8080/api/items')
      .then(res => {
        setItems(res.data);
      });
  }, []);

  // query 바뀔 때마다 필터링
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredItems([]);
    } else {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [query, items]);

  const handleSelect = (item) => {
    setQuery(item.name); // 선택한 항목 이름을 input에 표시
    setFilteredItems([]); // 목록 닫기
    if (onSelect) {
      onSelect(item); // 상위 컴포넌트로 선택한 제품 정보 전달
    }
  };

  return (
    <div className="relative w-[500px]">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="+ 제품 검색"
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      {filteredItems.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded shadow z-10 max-h-[200px] overflow-auto">
          {filteredItems.map(item => (
            <li key={item.idx}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StorageProductSearch;