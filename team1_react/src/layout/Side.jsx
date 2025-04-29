function Side() {
  return (
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
  );
}

export default Side;