import { Link } from 'react-router-dom';
import HeaderIcons2 from '../components/HeaderIcons2.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FiUser } from '@react-icons/all-files/fi/FiUser.js';
import { useState } from 'react';

function Header2({toggleLayout }) {
  const { user } = useAuth();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // 로그아웃 처리
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-[#ffffff] h-16 px-6">
      <Link to="/" className="!text-[#9379db] text-2xl font-bold tracking-wide">
        JAEGOHAE
      </Link>
      <div className="flex items-center space-x-4">
        <HeaderIcons2 onToggleTheme={toggleLayout} />

        <div className="flex items-center space-x-2 backdrop-blur bg-white/5 px-3 py-1.5 rounded-full text-white text-sm font-medium shadow hover:bg-black/3 transition-colors duration-300">
          <FiUser
            className={`${
              user?.position === 0
                ? 'text-yellow-400'
                : user?.position === 1
                  ? 'text-black text-base'
                  : user?.position === 2
                    ? 'text-[#1abc9c]'
                    : 'text-white'
            }`}
          />
          <span className="tracking-wide text-black">{user?.id}</span>
        </div>

        {token ?
          <Link
            to="/login"
            className="bg-[#a599ed] text-white text-sm px-4 py-1 rounded hover:bg-[#8e7dde]"
            onClick={handleLogout}
          >
            Logout
          </Link>
          : <Link
            to="/login"
            className="bg-[#a599ed] text-white text-sm px-4 py-1 rounded hover:bg-[#8e7dde]"
          >
            Login
          </Link>}
      </div>
    </header>
  );
}

export default Header2;