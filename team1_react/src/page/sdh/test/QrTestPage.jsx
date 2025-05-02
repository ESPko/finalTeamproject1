import React from 'react';
import QRCode from 'react-qr-code';

function QrTestPage ()
{
  const data = '123/모나미학용품창고1';
  const onlyCode = data.split('/')[0];
  
  return (
    <div style={{ padding: '40px' }}>
      <h2>QR 테스트</h2>
      <QRCode value={'http://10.100.203.16:8080/api/items/2/dispatch-quantity'} />
    </div>
  );
}

export default QrTestPage;
