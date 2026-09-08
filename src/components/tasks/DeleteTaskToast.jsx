import { createPortal } from "react-dom";
import { AlertTriangle, Trash2, X } from "lucide-react";
import styles from "./DeleteTaskToast.module.css";

export default function DeleteTaskToast({ task, onConfirm, onCancel }) {
  const toastContent = (
    <div className={styles.overlay} onClick={onCancel} role="presentation">
      <div
        className={styles.toast}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-task-title"
        aria-describedby="delete-task-description"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={styles.accent} />

        <button
          type="button"
          className={styles.closeBtn}
          onClick={onCancel}
          aria-label="إغلاق"
          title="إغلاق"
        >
          <X size={16} strokeWidth={2.2} />
        </button>

        <div className={styles.header}>
          <div className={styles.iconWrapper} aria-hidden="true">
            <div className={styles.icon}>
              <AlertTriangle size={21} strokeWidth={2.2} />
            </div>
          </div>

          <div className={styles.content}>
            <h3 id="delete-task-title">حذف المهمة؟</h3>
            <p id="delete-task-description">
              هل أنت متأكد أنك تريد حذف هذه المهمة؟
            </p>
          </div>
        </div>

        {task?.title && (
          <div className={styles.taskName}>
            <div className={styles.taskIcon}>
              <Trash2 size={14} strokeWidth={2.2} />
            </div>

            <div className={styles.taskInfo}>
              <span className={styles.taskLabel}>المهمة المحددة</span>
              <span className={styles.taskTitle}>{task.title}</span>
            </div>
          </div>
        )}

        <div className={styles.warning}>
          <span className={styles.warningDot} />
          <span>لا يمكن التراجع عن هذا الإجراء.</span>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={onCancel}>
            إلغاء
          </button>

          <button
            type="button"
            className={styles.deleteBtn}
            onClick={onConfirm}
          >
            <Trash2 size={15} strokeWidth={2.3} />
            <span>حذف المهمة</span>
          </button>
        </div>
      </div>
    </div>
  );

  // حقن النافذة مباشرة داخل document.body لتتجاوز أي قيود CSS من العناصر الأب
  return createPortal(toastContent, document.body);
}
