import { Bell, Mail, Menu } from "lucide-react";

const HeaderIcons = () => {
  const icons = [
    { icon: <Menu size={20} />, count: 4, color: "bg-[#4bd4c5]" },
    { icon: <Mail size={20} />, count: 5, color: "bg-[#4bd4c5]" },
    { icon: <Bell size={20} />, count: 7, color: "bg-[#f4b63d]" },
  ];

  return (
    <div className="flex gap-4 items-center">
      {icons.map((item, idx) => (
        <div
          key={idx}
          className="relative w-10 h-10 border border-white/30 rounded-md flex items-center justify-center"
        >
          {item.icon}
          <span
            className={`absolute -top-2 -right-2 text-[10px] text-white font-bold ${item.color} w-5 h-5 flex items-center justify-center rounded-full`}
          >
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
};

export default HeaderIcons;
