function LocationAdd() {
  return (
    <div className="space-y-6">
      {/* 이름 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          이름<span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          placeholder="위치 이름을 입력해주세요."
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* 메모 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">메모</label>
        <textarea
          placeholder="메모를 입력해주세요."
          className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded px-3 py-2 text-sm resize-none"
          rows={4}
        />
      </div>
    </div>
  );
}

export default LocationAdd;