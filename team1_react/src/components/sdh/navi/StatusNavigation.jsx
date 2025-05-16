import CalendarNavi from './CalendarNavi.jsx';
import SearchInput from './SearchInput.jsx';
import Department from './Department.jsx';
import OutboundPerson from './OutboundPerson.jsx';
import TransactionSelector from './TransactionSelector.jsx';

function StatusNavigation ({
  selectedDepartments, setSelectedDepartments,
  selectedOutboundPerson, setSelectedOutboundPerson,
  startDate, setStartDate,
  endDate, setEndDate,
  tags, setTags,
  transactionType, setTransactionType, // ⬅️ 추가
})
{
  const navigationItems = [
    {
      component: CalendarNavi,
      props: {
        startDate,
        endDate,
        onChangeDate: (start, end) => {
          setStartDate(start);
          setEndDate(end);
        },
      },
    },
    {
      component: SearchInput,
      props: { tags, setTags },
    },
    {
      component: Department,
      props: { selected: selectedDepartments, setSelected: setSelectedDepartments },
    },
    {
      component: OutboundPerson,
      props: { selected: selectedOutboundPerson, setSelected: setSelectedOutboundPerson },
    },
    {
      component: TransactionSelector, // ⬅️ 트랜잭션 선택 셀렉터
      props: { transactionType, setTransactionType },
    },
  ];
  
  return (
    <div className="flex flex-wrap items-center gap-2 py-3.5">
      {navigationItems.map(({ component: Component, props }, index) => (
        <Component key={index} {...props} />
      ))}
    </div>
  );
}

export default StatusNavigation;
