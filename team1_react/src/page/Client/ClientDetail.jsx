import { useEffect, useState } from 'react';

function ClientDetail({ client, onUpdate  }) {
  const [clientName, setClientName] = useState('');
  const [clientPhoneNumber, setClientPhoneNumber] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientNote, setClientNote] = useState('');

  useEffect(() => {
    if (client) {
      setClientName(client.name || '');
      setClientPhoneNumber(client.phone || '');
      setClientEmail(client.email || '');
      setClientAddress(client.location || '');
      setClientNote(client.memo || '');
    }
  }, [client]);

  // 수정된 데이터 부모로 전달
  useEffect(() => {
    if (onUpdate && client) {
      onUpdate({
        ...client,
        name: clientName,
        phone: clientPhoneNumber,
        email: clientEmail,
        location: clientAddress,
        memo: clientNote
      });
    }
  }, [clientName, clientPhoneNumber, clientEmail, clientAddress, clientNote]);

  if (!client) {
    return <div>거래처 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium mb-1">이름<span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">전화번호</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={clientPhoneNumber}
            onChange={(e) => setClientPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">이메일</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">주소</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={clientAddress}
          onChange={(e) => setClientAddress(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">메모</label>
        <textarea
          className="w-full border border-gray-300 rounded-md px-3 py-2 h-28 resize-none"
          value={clientNote}
          onChange={(e) => setClientNote(e.target.value)}
        />
      </div>
    </div>
  );
}

export default ClientDetail;
