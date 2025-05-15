import { Bell, Moon } from 'lucide-react';

const HeaderIcons = ({ onToggleTheme }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Moon - 다크모드 토글 버튼 */}
      <button
        onClick={onToggleTheme}
        className="group relative w-10 h-10 border border-white/30 rounded-md flex items-center justify-center cursor-pointer
             bg-white/5 hover:bg-white/10 transition-colors duration-300"
      >
        <Moon
          size={20}
          className="text-white group-hover:text-yellow-300 transition-colors duration-300"
        />
      </button>

      {/* Bell 알림 아이콘 */}
      {/*<div className="relative w-10 h-10 border border-white/30 rounded-md flex items-center justify-center cursor-pointer*/}
      {/*                bg-white/5 hover:bg-white/10 transition-colors duration-300">*/}
      {/*  <Bell size={20} className="text-white" />*/}
      {/*  <span className="absolute -top-2 -right-2 text-[10px] text-white font-bold bg-[#f4b63d] w-5 h-5 flex items-center justify-center rounded-full">*/}
      {/*    7*/}
      {/*  </span>*/}
      {/*</div>*/}
    </div>
  );
};

export default HeaderIcons;
