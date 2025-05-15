import { Link } from "react-router-dom";
import HeaderIcons from '../HeaderIcons.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { FiUser } from '@react-icons/all-files/fi/FiUser.js';

function Header({ toggleLayout }) {
  const { user, token, logout, loading } = useAuth(); // ✅ AuthContext에서 token, logout 받아옴

  if (loading) {
    // ✅ 로딩 중일 때는 아무것도 표시하지 않거나 로딩 스피너 등을 넣을 수 있음
    return null;
  }

  return (
    <header className="flex items-center justify-between bg-[#232428] h-16 px-6">
      <Link to="/" className="text-white text-2xl font-bold tracking-wide">
        JAEGOHAE
      </Link>

      <div className="flex items-center space-x-4">
        <HeaderIcons onToggleTheme={toggleLayout} />

        {/* 유저 정보가 있는 경우만 표시 */}
        {user && (
          <div className="flex items-center space-x-2 backdrop-blur bg-white/5 px-3 py-1.5 rounded-full text-white text-sm font-medium border border-white/20 shadow transition-colors duration-300 hover:bg-white/20">
            <FiUser
              className={`${
                user.position === 0
                  ? 'text-yellow-400'
                  : user.position === 1
                    ? 'text-white/70 text-base'
                    : user.position === 2
                      ? 'text-[#1abc9c]'
                      : 'text-white'
              }`}
            />
            <span className="tracking-wide">{user.id}</span>
          </div>
        )}

        {/* 로그인 / 로그아웃 버튼 */}
        {token ? (
          <button
            onClick={logout}
            className="bg-[#1abc9c] text-white text-sm px-4 py-1 rounded hover:bg-[#17a589]"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-[#1abc9c] text-white text-sm px-4 py-1 rounded hover:bg-[#17a589]"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
