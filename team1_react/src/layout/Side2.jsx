import { Link, Outlet, useLocation } from 'react-router-dom';

const menuItems = [
  { label: '재고', path: '/test1' },
  { label: '입고', path: '/test2' },
  { label: '출고', path: '/test3' },
  { label: '거래처', path: '/test4' },
  { label: '직원', path: '/test5' },
  { label: '알림', path: '/test6' },
];

function Side2() {
  const location = useLocation();
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 drop-shadow-xl bg-[#f5f5fa] flex flex-col text-sm">
        <div className="flex flex-col items-center py-6">
          <img
            src="/logo.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mb-2"
          />
          <div className="text-gray-600 font-semibold">재고해조</div>
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
                        ? 'bg-[#a599ed] shadow  text-black rounded-sm'
                        : '!text-gray-600  hover:bg-[#e6e6fa] hover:text-white'
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <Outlet />
    </div>
  );
}

export default Side2;