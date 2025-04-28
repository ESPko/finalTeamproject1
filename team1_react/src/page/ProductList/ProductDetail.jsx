function productDetail() {
  return (
    <div >
      <div className={'border'}>
    <div className={'d-flex m-3'}>
      <img src="src/productImg/pencil.png" width={'50px'} height={'50px'} className={'me-3'}/>

      <div className={'d-grid'}>
        <p>비품 5</p>
        <p>적정 수랑</p>
      </div>
      <div className={'ms-auto p-3'}>
        <p style={{ color: '#7b68ee' }}>현재 수량</p>
      </div>
    </div>
    </div>
      <div style={{background: 'lightGray'}}>재고 위치</div>
    <div className={'border'}>
      <ul>
        <li>
          <div className={'d-flex mt-2'}>
          <p>창고1</p>
            <div className={'ms-auto me-3'}>
          <p style={{ color: '#7b68ee' }}>수량</p>
            </div>
          </div>
        </li>
        <li>
          <div className={'d-flex mt-2'}>
            <p>창고2</p>
            <div className={'ms-auto me-3'}>
              <p style={{ color: '#7b68ee' }}>수량</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    </div>
  );
}

export default productDetail;
