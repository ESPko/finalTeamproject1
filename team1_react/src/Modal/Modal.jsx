import React from "react";

function Modal({
                 isOpen,
                 onClose,
                 title,
                 children,
                 footer,
                 width = "w-[600px]",
                 height = "max-h-[70vh]",
               }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200/40">
      <div className={`bg-white ${width} ${height} rounded-lg shadow-lg p-0 flex flex-col`}>
        {/* 헤더 */}
        {title && (
          <div className="flex justify-between items-center px-2 py-3 border-b">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-black text-2xl"
            >
              &times;
            </button>
          </div>
        )}

        {/* 본문 */}
        <div className="overflow-y-auto px-4 py-4 flex-1">
          {children}
        </div>

        {/* 푸터 */}
        {footer && (
          <div className="flex justify-end space-x-2 px-4 py-2 border-t">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;