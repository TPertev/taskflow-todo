import { cn } from './cn';

/** Form input / textarea için ortak sınıflar */
export const inputClass = (hasError) =>
  cn(
    'block w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-xs transition-colors',
    'placeholder:text-slate-400 focus:ring-4 focus:outline-none',
    hasError
      ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
      : 'border-slate-200 hover:border-slate-300 focus:border-slate-400 focus:ring-slate-900/5',
  );
