import { memo, useCallback } from 'react';
import CalendarNavi from './CalendarNavi.jsx';
import SearchInput from './SearchInput.jsx';
import Correspondent from './Correspondent.jsx';
import Location from './Location.jsx';

function InventoryNavigation ({
  selectedLocations,
  setSelectedLocations,
  selectedCorrespondents,
  setSelectedCorrespondents,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  tags,
  setTags,
})
{
  const handleDateChange = useCallback((start, end) => {
    setStartDate(start);
    setEndDate(end);
  }, [setStartDate, setEndDate]);
  
  return (
    <div className="flex flex-wrap items-center gap-2 py-3.5">
      <CalendarNavi
        startDate={startDate}
        endDate={endDate}
        onChangeDate={handleDateChange}
      />
      <SearchInput tags={tags} setTags={setTags} />
      <Location selected={selectedLocations} setSelected={setSelectedLocations} />
      <Correspondent selected={selectedCorrespondents} setSelected={setSelectedCorrespondents} />
    </div>
  );
}

export default memo(InventoryNavigation);
