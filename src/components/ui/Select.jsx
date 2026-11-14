import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

/** Yerel <select> + özel ok ikonu. Erişilebilirlik için native kontrol korunur. */
export default function Select({ options, className, selectClassName, ...props }) {
  return (
    <div className={cn('relative', className)}>
      <select
        className={cn(
          'h-9 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pr-8 pl-3 text-sm text-slate-700 shadow-xs transition-colors',
          'hover:border-slate-300 focus:border-slate-400 focus:ring-4 focus:ring-slate-900/5 focus:outline-none',
          selectClassName,
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
    </div>
  );
}
