const ACCENTS = {
  amber: 'border-amber-400 text-amber-700 bg-amber-50',
  teal: 'border-teal-400 text-teal-700 bg-teal-50',
  rose: 'border-rose-400 text-rose-700 bg-rose-50',
};

function AccordionSection({ title, icon, accent = 'amber', children }) {
  const accentClasses = ACCENTS[accent] || ACCENTS.amber;

  return (
    <details className={`group rounded-lg border-l-4 ${accentClasses}`}>
      <summary className="flex items-center justify-between cursor-pointer px-4 py-3 font-medium text-sm list-none rounded-lg">
        <span className="flex items-center gap-2">
          <span className="text-base">{icon}</span>
          {title}
        </span>
        <span className="transition-transform duration-200 group-open:rotate-180 text-xs">
          ▾
        </span>
      </summary>
      <div className="bg-white px-4 py-4 flex flex-col gap-4 border-t border-gray-100 rounded-b-lg">
        {children}
      </div>
    </details>
  );
}

export default AccordionSection;