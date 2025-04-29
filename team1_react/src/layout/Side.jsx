import { Link, Outlet } from 'react-router-dom';


function Side() {
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
          <ul className="space-y-1">
            <li>
              <Link to="/test1" className="block py-2.5 px-6 text-[#a9c5d8] hover:bg-[#40445c] hover:text-white">
                재고
              </Link>
            </li>
            <li>
              <Link to="/test2" className="block py-2.5 px-6 text-[#a9c5d8] hover:bg-[#40445c] hover:text-white">
                입고
              </Link>
            </li>
            <li>
              <Link to="/test3" className="block py-2.5 px-6 text-[#a9c5d8] hover:bg-[#40445c] hover:text-white">
               출고
              </Link>
            </li>
            <li>
              <Link to="/test4" className="block py-2.5 px-6 text-[#a9c5d8] hover:bg-[#40445c] hover:text-white">
                거래처
              </Link>
            </li>
            <li>
              <Link to="/test4" className="block py-2.5 px-6 text-[#a9c5d8] hover:bg-[#40445c] hover:text-white">
                직원
              </Link>
            </li>
            <li>
              <Link to="/test4" className="block py-2.5 px-6 text-[#a9c5d8] hover:bg-[#40445c] hover:text-white">
                알림
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Content */}
      <Outlet />
    </div>
  );
}

export default Side;