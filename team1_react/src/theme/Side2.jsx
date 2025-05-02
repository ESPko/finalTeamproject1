import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const menuItems = [
  { label: '재고', path: '/stock' },
  { label: '입고', path: '/storage' },
  { label: '승인', path: '/approve' },
  { label: '위치', path: '/location' },
  { label: '직원', path: '/member' },
  { label: '제품', path: '/product' },
];

function Side2() {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);

  // 페이지 로드 시, 저장된 테마를 불러옵니다.
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    const isDarkMode = storedTheme === 'dark';
    setIsDark(isDarkMode);
    document.documentElement.classList.toggle('dark', isDarkMode); // 다크모드 적용
  }, []);

  // 테마를 토글하는 함수
  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme); // 다크모드 적용
    localStorage.setItem('theme', nextTheme ? 'dark' : 'light'); // 로컬스토리지에 상태 저장
  };

  return (
    <div className="flex flex-1">
      {/* Sidebar */}
      <aside className="w-64 h-full drop-shadow-xl bg-[#f5f5fa] flex flex-col text-sm">
        <div className="flex flex-col items-center py-6">
          <img
            src="/logo.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2 shadow"
          />
          <div className="text-gray-600 font-semibold">재고 해조</div>
        </div>
        <nav className="flex-1">
          <ul className="space-y-1 p-0">
            {menuItems.map(({ label, path }) => {
              const isActive = location.pathname === path;
              return (
                <li key={label}>
                  <Link
                    to={path}
                    className={`block py-2.5 px-6 font-semibold ${isActive
                      ? 'bg-[#a599ed] shadow text-black rounded-sm'
                      : '!text-gray-600 hover:bg-[#e6e6fa] hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Dark/Light Mode Toggle */}
        <div className="flex p-5">
          <span className="text-sm text-gray-600 dark:text-white mr-2">{isDark ? '다크 모드' : '라이트 모드'}</span>
          <button
            onClick={toggleTheme}
            className={`w-10 h-5 rounded-full p-1 flex items-center justify-${isDark ? 'end' : 'start'} bg-gray-300 dark:bg-gray-600`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300`} />
          </button>
        </div>
      </aside>

      {/* Content */}
      <Outlet />
    </div>
  );
}

export default Side2;
