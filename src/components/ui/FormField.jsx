/**
 * Etiket + kontrol + yardım/hata metnini erişilebilir şekilde bir araya getirir.
 * children bir fonksiyondur: ({ id, describedBy, invalid }) => <input ... />
 */
export default function FormField({ id, label, required, error, hint, className, children }) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="mt-1.5 text-xs text-slate-500">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
