import { Link } from 'react-router-dom';
import HeaderIcons2 from '../components/HeaderIcons2.jsx';

function Header2({toggleLayout }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-[#ffffff] h-16 px-6">
      <Link to="/" className="!text-[#9379db] text-2xl font-bold tracking-wide">
        JAEGOHAE
      </Link>
      <div className="flex items-center space-x-4">
        {/* 버튼 클릭 시 toggleLayout 함수 호출 */}
        <button
          className="text-black"
          onClick={toggleLayout}
        >
          배경색 변경
        </button>
        <HeaderIcons2 />
        <Link
          to="/login"
          className="bg-[#a599ed] text-white text-sm px-4 py-1 rounded hover:bg-[#b9afed]"
        >
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header2;