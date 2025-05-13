import { useState } from 'react';
import Side from './theme/Side.jsx';
import Header2 from './theme/Header2.jsx';
import Side2 from './theme/Side2.jsx';
import Header from './components/layout/Header.jsx';
import AxiosTest from './components/AxiosTest.jsx';

function App() {
  // 컴포넌트를 전환할 상태 변수
  const [isDefault, setIsDefault] = useState(true);

  // 레이아웃 전환 함수
  const toggleLayout = () => {
    setIsDefault(!isDefault);
  };

  return (
    <div className="flex flex-col h-screen bg-[#f1f3f6]">
      {/* 조건에 따라 Header와 Side 또는 Header2와 Side2를 렌더링 */}
      {isDefault ? (
        <>
          <Header toggleLayout={toggleLayout} />
          <Side />
        </>
      ) : (
        <>
          <Header2 toggleLayout={toggleLayout} />
          <Side2 />
        </>
      )}
    </div>
  );
}

export default App;