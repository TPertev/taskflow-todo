import { Pencil, Trash2 } from 'lucide-react';
import { CATEGORIES, PRIORITY_OPTIONS, STATUS, STATUS_OPTIONS, labelOf } from '../../interfaces/task';
import { formatDate, formatDateTime } from '../../utils/date';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { DueDate, PriorityBadge, StatusBadge } from './TaskBadges';

function DetailRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-medium text-slate-900">{children}</dd>
    </div>
  );
}

/** READ – tek bir görevin tüm detayları */
export default function TaskDetailModal({ task, onClose, onEdit, onDelete }) {
  if (!task) return null;
  const completed = task.status === STATUS.COMPLETED;

  return (
    <Modal open onClose={onClose} title={task.title} description="Görev detayları">
      <div className="px-5 py-5 sm:px-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
        </div>

        <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-slate-600">
          {task.description || <span className="text-slate-400 italic">Açıklama eklenmemiş.</span>}
        </p>

        <dl className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
          <DetailRow label="Durum">{labelOf(STATUS_OPTIONS, task.status)}</DetailRow>
          <DetailRow label="Öncelik">{labelOf(PRIORITY_OPTIONS, task.priority)}</DetailRow>
          <DetailRow label="Kategori">{labelOf(CATEGORIES, task.category)}</DetailRow>
          <DetailRow label="Son tarih">
            <span className="inline-flex items-center gap-2">
              {formatDate(task.dueDate)}
              {!completed && <DueDate dueDate={task.dueDate} />}
            </span>
          </DetailRow>
          <DetailRow label="Oluşturulma">{formatDateTime(task.createdAt)}</DetailRow>
          <DetailRow label="Son güncelleme">{formatDateTime(task.updatedAt)}</DetailRow>
        </dl>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
        <Button variant="secondary" onClick={() => onDelete(task)} className="text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Sil
        </Button>
        <Button onClick={() => onEdit(task)}>
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Düzenle
        </Button>
      </div>
    </Modal>
  );
}
