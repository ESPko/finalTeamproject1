import { useState } from 'react';
import './SideBar.css';

function SideBar() {
  // 로컬 스토리지에서 저장된 상태를 가져와서 초기값 설정
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = localStorage.getItem('activeIndex');
    return savedIndex ? parseInt(savedIndex) : 0; // 로컬스토리지에서 가져온 값이 없으면 기본값 0으로 설정
  });

  // 클릭한 항목을 active 상태로 설정하고 로컬 스토리지에 저장
  const handleClick = (index) => {
    setActiveIndex(index);
    localStorage.setItem('activeIndex', index); // 클릭된 인덱스를 로컬 스토리지에 저장
  };

  return (

    <div className="sidebar-container">
      <div className="spacer"></div>
      <nav className="sidebar-nav">
        <a href="#" className={`sidebar-item ${activeIndex === 0 ? 'active' : ''}`}
          onClick={() => handleClick(0)}
        >입고</a>

        <a href="#" className={`sidebar-item ${activeIndex === 1 ? 'active' : ''}`}
           onClick={() => handleClick(1)}
        >분석</a>

        <a href="#" className={`sidebar-item ${activeIndex === 2 ? 'active' : ''}`}
          onClick={() => handleClick(2)}
        >데이터 관리</a>

        <a href="#" className={`sidebar-item ${activeIndex === 3 ? 'active' : ''}`}
          onClick={() => handleClick(3)}
        >위치</a>

        <a href="#" className={`sidebar-item ${activeIndex === 4 ? 'active' : ''}`}
          onClick={() => handleClick(4)}
        >거래처</a>

        <a href="#" className={`sidebar-item ${activeIndex === 5 ? 'active' : ''}`}
          onClick={() => handleClick(5)}
        >설정</a>

      </nav>
    </div>
  );
}

export default SideBar;

