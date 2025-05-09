function Topline({ title, actions, children }) {
  return (
    <div className="px-2 pb-2 h-full flex flex-col">
      {/* 헤더 영역 */}
      <div className="bg-white w-full min-w-[600px] h-[82px] flex items-center justify-between px-6">
        <div className="text-2xl font-semibold">{title}</div>
        {actions && <div>{actions}</div>}
      </div>

      <div className="border-b w-full"></div>

      {/* 본문 콘텐츠 영역 */}
      <div className="overflow-x-auto overflow-h-auto "style={{ maxHeight: 'calc(90vh)' }}>
        <div className="min-w-[1200px]  pb-20">{children}</div>
      </div>
    </div>
  );
}
export default Topline;

