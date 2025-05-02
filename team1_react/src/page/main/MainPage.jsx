import Side from '../../layout/Side.jsx';

function MainPage() {
  return (
    <main className="flex-1 p-6 overflow-y-auto grid grid-cols-2 gap-6">
      <div className="bg-white rounded shadow p-4">
        <div className="text-gray-700 font-semibold mb-2"></div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-gray-700 font-semibold mb-2"></div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-gray-700 font-semibold mb-2"></div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <div className="text-gray-700 font-semibold mb-2"></div>
      </div>
    </main>

  );
}

export default MainPage;