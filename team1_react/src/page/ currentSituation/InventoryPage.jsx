import SideBar from '../../components/layout/SideBar.jsx';
import Header from '../../components/layout/Header.jsx';
import Navigation from '../../components/sdh/inventory/Navigation.jsx';

function InventoryPage ()
{
  return (
    <>
      <Header />
      <div className="d-flex" style={{ minWidth: '820px' }}>
        <SideBar />
        <div>
          <div style={{ padding: '0px 40px 80px 40px' }}>
            <div className="w-100" style={{ height: '82px' }}>
              <div style={{ fontSize: '24px' }}>입출고요약</div>
            </div>
            <Navigation />
          </div>
          <div className="container" style={{ minWidth: '820px', paddingLeft: '40px' }}>
            <p>Lorem ipsum dolor sit amet, consectetur
               adipisicing elit. Culpa
               doloremque est illum labore libero
               placeat, ut voluptas voluptatibus. Aperiam
               dicta error iure nemo unde.
               Aliquid at eveniet illum ipsa
               recusandae.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default InventoryPage;