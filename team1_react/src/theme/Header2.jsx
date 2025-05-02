import { Link } from 'react-router-dom';
import HeaderIcons2 from '../components/HeaderIcons2.jsx';

function Header2() {
  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-[#ffffff] h-16 px-6">
      <Link to="/" className="!text-[#9379db] text-2xl font-bold tracking-wide">
        JAGOHAE
      </Link>
      <div className="flex items-center space-x-4">
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