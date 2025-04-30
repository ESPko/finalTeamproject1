import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange, DefinedRange } from 'react-date-range';
import { ko } from 'date-fns/locale';

function CalendarSdh ({ startDate, endDate, onChange })
{
  const [state, setState] = useState([
    {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    },
  ]);
  
  useEffect(() => {
    setState([
      {
        startDate,
        endDate,
        key: 'selection',
      },
    ]);
  }, [startDate, endDate]);
  
  const handleChange = (item) => {
    const { startDate, endDate } = item.selection;
    setState([item.selection]);
    onChange(startDate, endDate);
  };
  
  return (
    <div className={'flex'}>
      <DateRange
        editableDateInputs={true}
        onChange={handleChange}
        moveRangeOnFirstSelection={false}
        ranges={state}
        locale={ko}
      />
      <DefinedRange
        onChange={handleChange}
        ranges={state}
      />
    
    
    </div>
  );
}

export default CalendarSdh;