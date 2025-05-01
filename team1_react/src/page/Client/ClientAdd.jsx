import React, { useState } from 'react';

function ClientAdd() {
  const [selected, setSelected] = useState("입고처");

  return (
    <div className="space-y-6">
        {/* 종류 */}
      <div className="flex flex-col space-y-2">
        <label className="block font-medium mb-2">종류</label>
        <div className="flex items-center space-x-6">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="입고처"
              checked={selected === "입고처"}
              onChange={(e) => setSelected(e.target.value)}
              className="form-radio text-blue-600"
            />
            <span className="text-sm text-gray-800">입고처</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="type"
              value="출고처"
              checked={selected === "출고처"}
              onChange={(e) => setSelected(e.target.value)}
              className="form-radio text-blue-600"
            />
            <span className="text-sm text-gray-800">출고처</span>
          </label>
        </div>
      </div>

        {/* 이름 */}
        <div>
          <label className="block font-medium mb-1">
            이름<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="거래처의 이름을 입력해 주세요."
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* 전화번호 + 이메일 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">전화번호</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="전화번호를 입력해 주세요."

              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">이메일</label>
            <input
              type="email"
              name="email"
              placeholder="이메일 주소를 입력해 주세요."

              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
        </div>

        {/* 주소 */}
        <div>
          <label className="block font-medium mb-1">주소</label>
          <input
            type="text"
            name="address"
            placeholder="거래처의 주소를 입력해 주세요."

            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>

        {/* 메모 */}
        <div>
          <label className="block font-medium mb-1">메모</label>
          <textarea
            name="memo"
            placeholder="거래처와 관련된 메모를 입력해 주세요."

            className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 resize-none"
          />
        </div>



    </div>
  );
}

export default ClientAdd;