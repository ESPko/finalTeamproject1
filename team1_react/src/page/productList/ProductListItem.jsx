import ProductDetail from './ProductDetail.jsx';

function ProductListItem() {
  return (
    <div className={'border'}>
    <div className={'d-flex'}>
      <ul style={{width:'100%'}}>
        <li>
          <div className={'d-flex mt-3'}>
            <img src="src/productImg/pencil.png" width={'50px'} height={'50px'} className={'me-3'}/>

            <div className={'d-grid'}>
              <p>비품 1</p>
              <p>적정 수랑</p>
            </div>
            <div className={'ms-auto p-3'}>
            <p style={{ color: '#7b68ee' }}>0개</p>
            </div>
          </div>
        </li>

        <li>
          <div className={'d-flex mt-3'}>
            <img src="src/productImg/pencil.png" width={'50px'} height={'50px'} className={'me-3'}/>

            <div className={'d-grid'}>
              <p>비품 2</p>
              <p>적정 수랑</p>
            </div>
            <div className={'ms-auto p-3'}>
              <p style={{ color: '#7b68ee' }}>0개</p>
            </div>
          </div>
        </li>

        <li>
          <div className={'d-flex mt-3'}>
            <img src="src/productImg/pencil.png" width={'50px'} height={'50px'} className={'me-3'}/>

            <div className={'d-grid'}>
              <p>비품 3</p>
              <p>적정 수랑</p>
            </div>
            <div className={'ms-auto p-3'}>
              <p style={{ color: '#7b68ee' }}>0개</p>
            </div>
          </div>
        </li>

        <li>
          <div className={'d-flex mt-3'}>
            <img src="src/productImg/pencil.png" width={'50px'} height={'50px'} className={'me-3'}/>

            <div className={'d-grid'}>
              <p>비품 4</p>
              <p>적정 수랑</p>
            </div>
            <div className={'ms-auto p-3'}>
              <p style={{ color: '#7b68ee' }}>0개</p>
            </div>
          </div>
        </li>

        <li>
          <div className={'d-flex mt-3'}>
            <img src="src/productImg/pencil.png" width={'50px'} height={'50px'} className={'me-3'}/>

            <div className={'d-grid'}>
              <p>비품 5</p>
              <p>적정 수랑</p>
            </div>
            <div className={'ms-auto p-3'}>
              <p style={{ color: '#7b68ee' }}>0개</p>
            </div>
          </div>
        </li>
      </ul>
    </div>

    </div>
  );
}

export default ProductListItem;
