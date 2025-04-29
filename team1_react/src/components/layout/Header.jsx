import { Link } from 'react-router-dom';
import HeaderIcons from '../HeaderIcons.jsx';

function Header() {
  return (
    <header className="flex items-center justify-between bg-[#232428] h-16 px-6">
      <div className="text-white text-2xl font-bold tracking-wide">JAGOHAE</div>
      <div className="flex items-center space-x-4">
        <HeaderIcons />
        <button className="bg-[#1abc9c] text-white text-sm px-4 py-1 rounded hover:bg-[#17a589]">
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;