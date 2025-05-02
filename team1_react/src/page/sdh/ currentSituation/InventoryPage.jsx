
import Navigation from '../../../components/sdh/navi/Navigation.jsx';
import Topline from '../../../components/layout/Topline.jsx';

function InventoryPage() {
  return (
    <div className=" flex-1 p-6 overflow-y-auto">
      <div className="bg-white rounded shadow p-4 min-x-[100vh]  min-h-[80vh] "
           style={{ padding: '0px 40px 80px 40px' }}>
        <div>
          <Topline
            title="비품"
          >
            <Navigation />
            <div className="min-w-[820px] pl-10">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa
                doloremque est illum labore libero placeat, ut voluptas
                voluptatibus. Aperiam dicta error iure nemo unde. Aliquid at
                eveniet illum ipsa recusandae.
              </p>
            </div>
          </Topline>
        </div>
      </div>
    </div>


  );
}

export default InventoryPage;
