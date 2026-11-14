import { useContext } from 'react';
import { ToastContext } from '../context/toastContext';

/** Toast bildirimleri: toast.success('...'), toast.error('...'), toast.info('...') */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast, ToastProvider içinde kullanılmalıdır.');
  return context;
}
