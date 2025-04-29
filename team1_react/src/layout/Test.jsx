import HeaderIcons from '../components/HeaderIcons.jsx';

function Test() {
  return (
    <div className="flex flex-col h-screen bg-[#f1f3f6]">
      {/* Header */}
      <header className="flex items-center justify-between bg-[#232428] h-16 px-6">
        <div className="text-white text-2xl font-bold tracking-wide">JAGOHAE</div>
        <div className="flex items-center space-x-4">
          <HeaderIcons />
          <button className="bg-[#1abc9c] text-white text-sm px-4 py-1 rounded hover:bg-[#17a589]">
            Logout
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#323548] flex flex-col text-sm">
          <div className="flex flex-col items-center py-6 border-b border-[#32323d]">
            <img
              src="/logo.png"
              alt="Profile"
              className="w-24 h-24 rounded-full mb-2"
            />
            <div className="text-white font-semibold">재고해조</div>
          </div>
          <nav className="flex-1 space-y-1">
            {[
              "재고",
              "입고",
              "출고",
              "거래처",
              "직원",
              "알림",
              "Mail",
              "Charts",
              "Chat Room",
              "Google Maps",
            ].map((item, idx) => (
              <a
                key={item}
                href="#"
                className={`block py-2.5 px-6 ${
                  idx === 0
                    ? "bg-[#1abc9c] text-white"
                    : "text-[#a9c5d8] hover:bg-[#40445c] hover:text-white"
                }`}
              >
                {item}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto grid grid-cols-3 gap-6">
          {/* 대충 박스 모양 */}
          <div className="bg-white rounded shadow p-4">
            <div className="text-gray-700 font-semibold mb-2">재고</div>
            <div className="bg-gray-200 h-40 rounded"></div>
          </div>
          <div className="bg-white rounded shadow p-4">
            <div className="text-gray-700 font-semibold mb-2">입고</div>
            <div className="bg-gray-200 h-40 rounded"></div>
          </div>
          <div className="bg-white rounded shadow p-4">
            <div className="text-gray-700 font-semibold mb-2">출고</div>
            <div className="bg-gray-200 h-40 rounded"></div>
          </div>
          <div className="bg-white rounded shadow p-4 col-span-2">
            <div className="text-gray-700 font-semibold mb-2">거래처</div>
            <div className="bg-gray-200 h-40 rounded"></div>
          </div>
          <div className="bg-white rounded shadow p-4">
            <div className="text-gray-700 font-semibold mb-2">직원</div>
            <div className="bg-gray-200 h-40 rounded"></div>
          </div>
          <div className="bg-white rounded shadow p-4 col-span-3">
            <div className="text-gray-700 font-semibold mb-2">알림</div>
            <div className="bg-gray-100 h-32 rounded"></div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Test;