import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const menuItems = [
  { label: '비품목록', path: '/test1' },
  { label: '입고', path: '/test2' },
  { label: '승인목록', path: '/test3' },
  { label: '재고부족리스트', path: '/test4' },
  { label: '비품', path: '/test5' },
  { label: '창고위치', path: '/test6' },
  { label: '매입처', path: '/test7' },
  { label: '창고별 분석', path: '/test8' },
  { label: '직원별 분석', path: '/test9' },
  { label: '직원관리', path: '/test10', requirePosition: 2 },
  { label: 'Error', path: '/axios' },
];

function Side2 ()
{
  const { user } = useAuth();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const getLinkClass = (active) =>
    `block py-2.5 px-6 font-semibold ${
      active
        ? 'bg-[#a599ed] shadow text-black rounded-sm'
        : '!text-gray-600 hover:bg-[#e6e6fa] hover:text-white'
    }`;
  
  // 🔒 포지션 제한 처리
  const visibleMenu = menuItems.filter(
    ({ requirePosition }) => !requirePosition || user?.position === requirePosition,
  );
  
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
            {visibleMenu.map(({ label, path }) => (
              <li key={path}>
                <Link to={path} className={getLinkClass(isActive(path))}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      
      {/* Content */}
      <Outlet />
    </div>
  );
}

export default Side2;
