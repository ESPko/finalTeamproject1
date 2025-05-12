import { Link } from "react-router-dom";
import HeaderIcons from '../HeaderIcons.jsx';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { FiUser } from '@react-icons/all-files/fi/FiUser.js';



function Header({ toggleLayout }) {
  const { user } = useAuth();
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  console.log('user :', user);

  // 로그아웃 처리
  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <header className="flex items-center justify-between bg-[#232428] h-16 px-6">

      <Link to="/" className="text-white text-2xl font-bold tracking-wide">
        JAGOHAE
      </Link>


      <div className="flex items-center space-x-4">
        <HeaderIcons onToggleTheme={toggleLayout} />

        <div className="flex items-center space-x-2 backdrop-blur bg-white/5 px-3 py-1.5 rounded-full text-white text-sm font-medium border border-white/20 shadow transition-colors duration-300 hover:bg-white/20">
          <FiUser
            className={`${
              user?.position === 0
                ? 'text-yellow-400'
                : user?.position === 1
                  ? 'text-white/70 text-base'
                  : user?.position === 2
                    ? 'text-[#1abc9c]'
                    : 'text-white'
            }`}
          />
          <span className="tracking-wide">{user?.id}</span>
        </div>




        {token ?
        <Link
          to="/login"
          className="bg-[#1abc9c] text-white text-sm px-4 py-1 rounded hover:bg-[#17a589]"
          onClick={handleLogout}
        >
          Logout
        </Link>
        : <Link
            to="/login"
            className="bg-[#1abc9c] text-white text-sm px-4 py-1 rounded hover:bg-[#17a589]"
          >
            Login
          </Link>}

      </div>
    </header>
  );
}

export default Header;

