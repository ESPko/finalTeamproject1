import Side from '../../theme/Side.jsx';

function MainPage() {
  return (
    <main className="flex-1 p-6 overflow-y-auto grid grid-cols-3 gap-6">
      <div className="bg-white rounded shadow p-4">
        <div className="text-gray-700 font-semibold mb-2">비품</div>
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
  );
}

export default MainPage;