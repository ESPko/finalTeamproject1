import { useState } from 'react';
import CalendarNavi from './CalendarNavi.jsx';
import SearchInput from './SearchInput.jsx';
import OutboundPerson from './OutboundPerson.jsx';
import Department from './Department.jsx';

function StatusNavigation ()
{
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedOutboundPerson, setSelectedOutboundPerson] = useState([]);
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
      <Department selected={selectedDepartments} setSelected={setSelectedDepartments} />
      <OutboundPerson selected={selectedOutboundPerson} setSelected={setSelectedOutboundPerson} />
    </div>
  );
}

export default StatusNavigation;
