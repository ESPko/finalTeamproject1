import CalendarNavi from './CalendarNavi.jsx';
import SearchInput from './SearchInput.jsx';
import Location from './Location.jsx';
import Correspondent from './Correspondent.jsx';

function Navigation ()
{
  return (
    <div className="flex flex-wrap items-center gap-2 py-3.5">
      <CalendarNavi />
      <SearchInput />
      <Location />
      <Correspondent />
    </div>
  );
}

export default Navigation;
