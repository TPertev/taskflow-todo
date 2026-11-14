import { cn } from '../../utils/cn';

const VARIANTS = {
  primary:
    'bg-slate-900 text-white shadow-sm hover:bg-slate-800 focus-visible:ring-slate-900/30 disabled:bg-slate-400',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-slate-50 hover:text-slate-900 focus-visible:ring-slate-900/15',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-900/15',
  danger: 'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-600/30',
};

const SIZES = {
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-sm',
  icon: 'h-9 w-9',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:ring-4 focus-visible:outline-none disabled:cursor-not-allowed',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
