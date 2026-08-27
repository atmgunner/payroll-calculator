import { useState } from 'react';

function FieldLabel({ label, info }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm">{label}</span>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="flex items-center justify-center w-4 h-4 rounded-full border border-gray-400 text-gray-500 text-[10px] hover:border-indigo-500 hover:text-indigo-500 transition-colors"
        >
          i
        </button>
      </div>

      {open && (
        <div className="text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-3 py-2 leading-relaxed">
          {info}
        </div>
      )}
    </div>
  );
}

export default FieldLabel;