import { Bell, Mail } from "lucide-react";

const HeaderIcons2 = () => {
  const icons = [
    { icon: <Mail size={20} className="text-black" />, count: 5, color: "bg-[#4bd4c5]" },
    { icon: <Bell size={20} className="text-black" />, count: 7, color: "bg-[#f4b63d]" },
  ];

  return (
    <div className="flex gap-3 items-center">
      {icons.map((item, idx) => (
        <div
          key={idx}
          className="relative w-10 h-10 border border-black/30 rounded-md flex items-center justify-center cursor-pointer"
        >
          {item.icon}
          <span
            className={`absolute -top-2 -right-2 text-[10px] text-black font-bold ${item.color} w-5 h-5 flex items-center justify-center rounded-full`}
          >
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HeaderIcons2;
