import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const menuItems = [
  { label: "비품목록", path: "/test1" },
  { label: "입고", path: "/test2" },
  { label: "승인목록", path: "/test3" },
  { label: "재고부족리스트", path: "/test4" },
  { label: "비품", path: "/test5" },
  { label: "창고위치", path: "/test6" },
  { label: "매입처", path: "/test7" },
  { label: "입출고 조회", path: "/test8" },
  { label: "비품사용현황", path: "/test9" },
  { label: "직원관리", path: "/test10", requirePosition: 2 },
  // { label: "axios", path: "/axios" },
];

function Side ()
{
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getLinkClass = (active) =>
    `block py-2.5 px-6 font-semibold ${
      active
        ? 'bg-[#48c9b0] text-white rounded-sm'
        : 'text-white hover:bg-[#40445c] hover:text-white'
    }`;

  const visibleMenu = menuItems.filter(
    (item) =>
      !item.requirePosition || user?.position === item.requirePosition,
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#323548] flex flex-col text-sm">
        <div className="flex flex-col items-center py-6">
          <img
            src="/logo.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2"
          />
          <div className="text-white font-semibold">재고해조</div>
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

export default Side;