import { Link } from "react-router-dom";
import HeaderIcons from '../HeaderIcons.jsx';

function Header({ toggleLayout }) {
  return (
    <header className="flex items-center justify-between bg-[#232428] h-16 px-6">
      <Link to="/" className="text-white text-2xl font-bold tracking-wide">
        JAEGOHAE
      </Link>
      <div className="flex items-center space-x-4">
        {/* 버튼 클릭 시 toggleLayout 함수 호출 */}
        <button
          className="text-white"
          onClick={toggleLayout}
        >
          배경색 변경
        </button>
        <HeaderIcons />
        <Link
          to="/login"
          className="bg-[#1abc9c] text-white text-sm px-4 py-1 rounded hover:bg-[#17a589]"
        >
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;