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
    </div>
  );
};

export default HeaderIcons;
