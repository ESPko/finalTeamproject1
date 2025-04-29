import CalendarNavi from './CalendarNavi.jsx';
import SearchInput from './SearchInput.jsx';

function Navigation ()
{
  return (
    <div className="py-[14px] flex items-center flex-wrap gap-[8px]">
      <CalendarNavi />
      <SearchInput />
    </div>
  );
}

export default Navigation;