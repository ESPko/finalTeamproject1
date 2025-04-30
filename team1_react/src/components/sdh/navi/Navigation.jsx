import CalendarNavi from './CalendarNavi.jsx';
import SearchInput from './SearchInput.jsx';
import Location from './Location.jsx';
import Correspondent from './Correspondent.jsx';

function Navigation ()
{
  return (
    <div className="py-[14px] flex items-center flex-wrap gap-[8px]">
      <CalendarNavi />
      <SearchInput />
      <Location />
      <Correspondent />
    </div>
  );
}

export default Navigation;