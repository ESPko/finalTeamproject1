import { Link } from 'react-router-dom';
import HeaderIcons2 from '../components/HeaderIcons2.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { FiUser } from '@react-icons/all-files/fi/FiUser.js';

function Header2({toggleLayout }) {
  const { user, token, logout, loading } = useAuth(); // AuthContext에서 token, logout 받아옴

  if (loading) {
    return "로딩중...";
  }

  return (
    <header className="flex items-center justify-between border-b border-gray-100 bg-[#ffffff] h-16 px-6">
      <Link to="/" className="!text-[#9379db] text-3xl font-bold tracking-wide">
        Boxel
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

        {/* 로그인 / 로그아웃 버튼 */}
        {token ? (
          <button
            onClick={logout}
            className="bg-[#a599ed] text-white text-sm px-4 py-1 rounded hover:bg-[#a599ed]"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-[#a599ed] text-white text-sm px-4 py-1 rounded hover:bg-[#a599ed]"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header2;