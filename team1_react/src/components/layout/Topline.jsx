
function Topline({ title, actions, children }) {
  return (
    <div className="px-2 pb-2">
      {/* 헤더 영역: 반응형 */}
      <div className="bg-white w-full min-w-[600px] h-[82px] flex items-center justify-between px-6">
        <div className="text-2xl font-semibold">{title}</div>
        {actions && <div>{actions}</div>}
      </div>

      <div className="border-b w-full"></div>

      {/* 본문 콘텐츠: 가로 스크롤 */}
      <div className="overflow-x-auto w-full">
        <div className="min-w-[1200px]">{children}</div>
      </div>
    </div>
  );
}

export default Topline;

