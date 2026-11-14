import { useCallback, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import { ToastContext } from '../../context/toastContext';
import { cn } from '../../utils/cn';

const DURATION = 3200;

const STYLES = {
  success: { icon: CheckCircle2, iconClass: 'text-emerald-500' },
  error: { icon: XCircle, iconClass: 'text-red-500' },
  info: { icon: Info, iconClass: 'text-sky-500' },
};

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (type, message) => {
      counter.current += 1;
      const id = counter.current;
      setToasts((prev) => [...prev.slice(-2), { id, type, message }]);
      setTimeout(() => dismiss(id), DURATION);
    },
    [dismiss],
  );

  const api = useMemo(
    () => ({
      success: (message) => show('success', message),
      error: (message) => show('error', message),
      info: (message) => show('info', message),
    }),
    [show],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
        role="status"
        aria-live="polite"
      >
        {toasts.map(({ id, type, message }) => {
          const { icon: Icon, iconClass } = STYLES[type];
          return (
            <div
              key={id}
              className="toast-enter pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg shadow-slate-900/5"
            >
              <Icon className={cn('h-5 w-5 shrink-0', iconClass)} aria-hidden="true" />
              <p className="flex-1 text-sm font-medium text-slate-700">{message}</p>
              <button
                type="button"
                onClick={() => dismiss(id)}
                className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                aria-label="Bildirimi kapat"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
