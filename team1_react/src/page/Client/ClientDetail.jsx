import { useState } from 'react';

function ClientDetail({client}) {

  const [ clientName, setClientName ] = useState(client.clientName);
  const [ clientPhoneNumber , setclientPhoneNumber ] = useState(client. clientPhoneNumber );
  const [ clientEmail , setClientEmail  ] = useState(client. clientEmail );
  const [ clientAddress, setClientAddress] = useState(client. clientAddress);
  const [ clientNote , setclientNote ] = useState(client. clientNote );

  if (!client) {
    return <div>거래처 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="space-y-6">
      {/* 이름 */}
      <div>
        <label className="block font-medium mb-1">
          이름<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>

      {/* 전화번호 + 이메일 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">전화번호</label>
          <input
            type="text"
            name="phoneNumber"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={clientPhoneNumber }
            onChange={(e) => setclientPhoneNumber (e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">이메일</label>
          <input
            type="email"
            name="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={clientEmail  }
            onChange={(e) => setClientEmail   (e.target.value)}
          />
        </div>
      </div>

      {/* 주소 */}
      <div>
        <label className="block font-medium mb-1">주소</label>
        <input
          type="text"
          name="address"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={clientAddress   }
          onChange={(e) => setClientAddress    (e.target.value)}
        />
      </div>

      {/* 메모 */}
      <div>
        <label className="block font-medium mb-1">메모</label>
        <textarea
          name="memo"
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 resize-none"
          value={clientNote    }
          onChange={(e) => setclientNote     (e.target.value)}
        />
      </div>



    </div>
  );
}

export default ClientDetail;