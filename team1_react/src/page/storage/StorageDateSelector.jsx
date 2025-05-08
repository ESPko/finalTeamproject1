
function StorageDateSelector({ selectedDate, setSelectedDate }) {

  return (
    <div className="flex items-center gap-11">
      <label className="font-semibold">날짜*</label>
      <div className="relative">
        {/* 날짜 표시 영역 */}
        <label
          htmlFor="date-input"
          className="w-[220px] h-[36px] border border-gray-300 rounded text-sm pl-2 bg-gray-100 text-gray-700 cursor-pointer flex items-center justify-between px-2"
        >
          {selectedDate || '날짜 선택'}
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </label>

        {/* 숨겨진 날짜 입력 필드 */}
        <input
          id="date-input"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="absolute top-0 left-0 opacity-0 cursor-pointer w-full h-full"
        />
      </div>
    </div>
  );
}

export default StorageDateSelector;
