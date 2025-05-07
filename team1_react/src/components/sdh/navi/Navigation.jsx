import { useState } from 'react';
import CalendarNavi from './CalendarNavi.jsx';
import SearchInput from './SearchInput.jsx';
import Location from './Location.jsx';
import Correspondent from './Correspondent.jsx';

function Navigation ()
{
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCorrespondents, setSelectedCorrespondents] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  
  return (
    <div className="flex flex-wrap items-center gap-2 py-3.5">
      <CalendarNavi
        startDate={startDate}
        endDate={endDate}
        onChangeDate={(start, end) => {
          setStartDate(start);
          setEndDate(end);
        }}
      />
      <SearchInput tags={tags} setTags={setTags} />
      <Location selected={selectedLocations} setSelected={setSelectedLocations} />
      <Correspondent selected={selectedCorrespondents} setSelected={setSelectedCorrespondents} />
    </div>
  );
}

export default Navigation;
