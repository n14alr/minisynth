import React from 'react';

interface KeyProps {
  note: string;
  isBlack?: boolean;
  isPressed: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave: () => void;
}

const Key: React.FC<KeyProps> = ({
  note,
  isBlack = false,
  isPressed,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
}) => {
  const baseClasses = isBlack
    ? 'h-32 w-12 -mx-6 z-10 bg-gray-900'
    : 'h-48 w-16 bg-white';

  return (
    <button
      className={`${baseClasses} relative rounded-b-md border border-gray-300 transition-all duration-50 ${
        isPressed
          ? isBlack
            ? 'bg-gray-700 -translate-y-1'
            : 'bg-gray-100 -translate-y-1'
          : ''
      }`}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <span
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 text-sm ${
          isBlack ? 'text-white' : 'text-gray-500'
        }`}
      >
        {note}
      </span>
    </button>
  );
};

export default Key;