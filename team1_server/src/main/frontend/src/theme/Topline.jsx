function Topline({ title, actions, children }) {
  return (
    <div className="px-10 pb-20">
      {/* 헤더 영역 */}
      <div className="bg-blue-400 w-[1500px] h-[82px] flex items-center justify-between px-6">
        <div className="text-2xl font-semibold text-white">{title}</div>
        {actions && <div>{actions}</div>}
      </div>

      {/* 본문 콘텐츠 */}
      <div className="bg-danger w-[1500px]">
        {children}
      </div>
    </div>
  );
}

export default Topline;