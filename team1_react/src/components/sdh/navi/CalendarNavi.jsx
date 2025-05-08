import { useCallback, useEffect, useRef, useState } from 'react';
import { addDays, format } from 'date-fns';
import CalendarSdh from './CalendarSdh.jsx';

function CalendarNavi ({ startDate, endDate, onChangeDate })
{
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const wrapperRef = useRef(null);
  
  const shiftDateRange = useCallback((days) => {
    onChangeDate(addDays(startDate, days), addDays(endDate, days));
  }, [startDate, endDate, onChangeDate]);
  
  const handleClickOutside = useCallback((e) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target))
    {
      setIsCalendarOpen(false);
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);
  
  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center w-[260px] h-10 rounded-md border border-gray-300 overflow-hidden bg-white text-sm">
        <button
          onClick={() => shiftDateRange(-30)}
          className="flex items-center justify-center w-[38px] h-full border-r border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          {/* ← */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={() => setIsCalendarOpen((prev) => !prev)}
          className="flex-1 text-center text-[13px] font-medium cursor-pointer"
        >
          {`${format(startDate, 'yyyy-MM-dd')} - ${format(endDate, 'yyyy-MM-dd')}`}
        </button>
        
        <button
          onClick={() => shiftDateRange(30)}
          className="flex items-center justify-center w-[38px] h-full border-l border-gray-300 text-gray-500 hover:bg-gray-100"
        >
          {/* → */}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {isCalendarOpen && (
        <div className="absolute z-10 mt-2">
          <CalendarSdh
            startDate={startDate}
            endDate={endDate}
            onChange={onChangeDate}
          />
        </div>
      )}
    </div>
  );
}

export default CalendarNavi;
