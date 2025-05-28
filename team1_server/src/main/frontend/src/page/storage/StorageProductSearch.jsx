import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance.jsx';

function StorageProductSearch ({ selectedItem, onSelect })
{
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  
  // 처음에 데이터 받아오기
  useEffect(() => {
    axiosInstance.get('/api/items')
      .then(res => {
        // approve가 1 또는 3인 항목만 저장
        const approvedItems = res.data.filter(item => item.approve === 1 || item.approve === 3);
        setItems(approvedItems);
      });
  }, []);
  
  // query 바뀔 때마다 필터링
  useEffect(() => {
    if (query.trim() === '')
    {
      setFilteredItems([]);
    }
    else
    {
      const filtered = items.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredItems(filtered);
    }
  }, [query, items]);
  
  // selectedItem이 null로 바뀌면 input 초기화
  useEffect(() => {
    if (!selectedItem)
    {
      setQuery('');
    }
  }, [selectedItem]);
  
  const handleSelect = async (item) => {
    try
    {
      // 서버에서 최신 정보 다시 가져오기
      const response = await axiosInstance.get(`/api/items/${item.idx}`);
      const updatedItem = response.data;
      
      setQuery(updatedItem.name); // input에 최신 이름 표시
      setFilteredItems([]); // 드롭다운 닫기
      
      if (onSelect)
      {
        onSelect(updatedItem); // 상위 컴포넌트로 최신 데이터 전달
      }
    }
    catch (error)
    {
      console.error('제품 정보를 다시 가져오는 중 오류:', error);
      alert('제품 정보를 불러오는 데 실패했습니다.');
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