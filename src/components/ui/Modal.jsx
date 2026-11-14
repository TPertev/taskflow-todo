import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Erişilebilir modal: Esc ile kapanır, odak içeride tutulur,
 * kapanınca odak önceki elemana döner, arka plan kaydırması kilitlenir.
 */
export default function Modal({ open, onClose, title, description, size = 'md', children }) {
  const panelRef = useRef(null);
  const titleId = useId();
  const descriptionId = useId();
  const onCloseRef = useRef(onClose);

  // Ebeveyn her render'da yeni bir fonksiyon verse bile odak sıfırlanmasın.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const panel = panelRef.current;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';

    const first = panel?.querySelector('[data-autofocus]') ?? panel?.querySelector(FOCUSABLE);
    first?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !panel) return;
      const items = [...panel.querySelectorAll(FOCUSABLE)];
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          'relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-white shadow-xl sm:rounded-2xl',
          size === 'sm' ? 'sm:max-w-md' : 'sm:max-w-xl',
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 id={titleId} className="text-base font-semibold text-slate-900">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="mt-0.5 text-sm text-slate-500">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-1.5 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-4 focus-visible:ring-slate-900/15 focus-visible:outline-none"
            aria-label="Pencereyi kapat"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
