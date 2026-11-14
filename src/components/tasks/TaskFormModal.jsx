import Modal from '../ui/Modal';
import TaskForm from './TaskForm';

/** Oluşturma / düzenleme formunu modal içinde gösterir. */
export default function TaskFormModal({ open, task, onClose, onSubmit }) {
  const isEdit = Boolean(task);
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? 'Görevi düzenle' : 'Yeni görev'}
      description={isEdit ? 'Görev bilgilerini güncelle.' : 'Yıldızlı alanlar zorunludur.'}
    >
      {/* key: her açılışta formun temiz başlaması için */}
      <TaskForm key={task?.id ?? 'new'} task={task} onSubmit={onSubmit} onCancel={onClose} />
    </Modal>
  );
}
