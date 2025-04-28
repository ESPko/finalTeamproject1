import {Dropdown, DropdownToggle} from "react-bootstrap";
import { useState } from 'react';
import ProductListItem from './ProductListItem.jsx';
import ProductDetail from './ProductDetail.jsx';

function ProductList() {
  const [search, setSearch] = useState(``)

  const changSearch = (e) =>{
    setSearch(e.target.value);
  };

  return (
      <div style={{ padding: '0px 40px 80px 40px' }}>
        <div className="bg-white" style={{ width: '1500px', height: '82px' }}>
          <div style={{ fontSize: '24px' }}>비품 목록</div>
        </div>

        <div className="bg-white" style={{ width: '1500px'}}>
          <div className={'d-flex justify-between' }>

          {/*  창고 위치 선택 드롭다운 메뉴*/}
          <Dropdown>
            <Dropdown.Toggle variant={'light'} id={'dropdown-basic'}>
              위치 선택
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">모든 창고 </Dropdown.Item>
              <Dropdown.Item href="#">창고 1</Dropdown.Item>
              <Dropdown.Item href="#">창고 2</Dropdown.Item>
              <Dropdown.Item href="#">창고 3</Dropdown.Item>
              <Dropdown.Item href="#">창고 4</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

            {/*검색창*/}
            <input type={'text'} placeholder={'찾으시는 비품의 이름을 입력하세요'} value={search} onChange={changSearch} className={'form-control'} style={{width:'1000px'}}/>

            <button className={'btn'} style={{background: '#7b68ee'}}> 제품 추가</button>
          </div>

            <div className={'d-flex'}>
          <div className={'w-50 border-end p-3'} style={{marginTop: '50px'}}>
            <ProductListItem/>
          </div>
          <div className={'w-50 p-3'} style={{marginTop: '50px', marginLeft: '20px'}}>
            <ProductDetail/>
          </div>
          </div>
        </div>
      </div>
  );
}

export default ProductList
