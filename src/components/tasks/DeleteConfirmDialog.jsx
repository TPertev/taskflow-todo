import { AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

/** DELETE – silmeden önce kullanıcıdan onay alır. */
export default function DeleteConfirmDialog({ task, onCancel, onConfirm }) {
  return (
    <Modal open={Boolean(task)} onClose={onCancel} title="Görevi sil" size="sm">
      <div className="flex gap-4 px-5 py-5 sm:px-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-sm leading-relaxed text-slate-600">
          <span className="font-semibold text-slate-900">“{task?.title}”</span> görevini silmek
          istediğine emin misin? Bu işlem geri alınamaz.
        </p>
      </div>
      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
        <Button variant="secondary" onClick={onCancel} data-autofocus>
          Vazgeç
        </Button>
        <Button variant="danger" onClick={() => onConfirm(task)}>
          Evet, sil
        </Button>
      </div>
    </Modal>
  );
}
