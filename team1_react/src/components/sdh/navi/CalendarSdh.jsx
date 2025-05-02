import React, { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // 필수: 기본 스타일
import 'react-date-range/dist/theme/default.css'; // 필수: 테마
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
    <div className="flex rounded-lg shadow-md overflow-hidden border border-gray-300 bg-white">
      <div>
        <DateRange
          editableDateInputs={true}
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          ranges={state}
          locale={ko}
        />
      </div>
      
      <div className="border-r border-gray-200">
        <DefinedRange
          onChange={handleChange}
          ranges={state}
        />
      </div>
    </div>
  );
}

export default CalendarSdh;
