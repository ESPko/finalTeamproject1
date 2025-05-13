import { Bell, Sun } from 'lucide-react';
import { FaSun } from 'react-icons/fa';
import { IconSun, IconMoon } from '@tabler/icons-react';

const HeaderIcons2 = ({ onToggleTheme }) => {
  return (
    <div className="flex gap-3 items-center">
      {/* Sun - 라이트모드 토글 버튼 */}
      <button
        onClick={onToggleTheme}
        className="group relative w-10 h-10 border border-black/30 rounded-md flex items-center justify-center cursor-pointer
             hover:bg-black/[0.05] transition-colors duration-300"
      >
        <IconSun
          size={26}
          stroke={2}
          className="text-black group-hover:text-yellow-500 transition-colors duration-300"
        />
      </button>

      {/* Bell 알림 아이콘 */}
      <div className="relative w-10 h-10 border border-black/30 rounded-md flex items-center justify-center cursor-pointer
                      hover:bg-black/3 transition-colors duration-300">
        <Bell size={20} className="text-black" />
        <span className="absolute -top-2 -right-2 text-[10px] text-black font-bold bg-[#f4b63d] w-5 h-5 flex items-center justify-center rounded-full">
          7
        </span>
      </div>
    </div>
  );
};

export default HeaderIcons2;
