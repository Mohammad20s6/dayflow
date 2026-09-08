import { Check, Trash2, Pencil, Clock3 } from "lucide-react";

import { useDispatch } from "react-redux";
import { openEditTaskModal } from "../ui/uiSlice";

import styles from "./TaskCard.module.css";

export default function TaskCard({ task, onToggle, onDelete }) {
  const dispatch = useDispatch();

  const start = new Date(task.start_time);
  const end = new Date(task.end_time);

  const formatTime = (date) =>
    date.toLocaleTimeString("ar", {
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });

  const timeLabel = `${formatTime(start)} - ${formatTime(end)}`;

  const categoryColor = task.categories?.color || "var(--sky)";

  return (
    <article
      className={`${styles.card} ${task.is_completed ? styles.completed : ""}`}
      style={{
        "--category-color": categoryColor,
      }}
    >
      <div className={styles.categoryRail} />

      <button
        type="button"
        className={styles.checkBtn}
        onClick={() => onToggle(task.id, !task.is_completed)}
        aria-label={task.is_completed ? "إلغاء إكمال المهمة" : "إكمال المهمة"}
        aria-pressed={task.is_completed}
      >
        <span className={styles.checkIcon}>
          {task.is_completed && <Check size={14} strokeWidth={3} />}
        </span>
      </button>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <span className={styles.categoryDot} aria-hidden="true" />

          <span className={styles.title}>{task.title}</span>
        </div>

        <div className={styles.meta}>
          <span className={styles.time}>
            <Clock3 size={12} strokeWidth={2} />

            <span>{timeLabel}</span>
          </span>

          {task.categories?.name && (
            <span className={styles.categoryName}>{task.categories.name}</span>
          )}
        </div>
      </div>

      <div className={styles.status}>
        {task.is_completed ? "مكتملة" : "قيد التنفيذ"}
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={`${styles.actionBtn} ${styles.editBtn}`}
          onClick={() => dispatch(openEditTaskModal(task.id))}
          aria-label="تعديل المهمة"
          title="تعديل المهمة"
        >
          <Pencil size={15} strokeWidth={2.2} />
        </button>

        <button
          type="button"
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={() => onDelete(task.id)}
          aria-label="حذف المهمة"
          title="حذف المهمة"
        >
          <Trash2 size={15} strokeWidth={2.2} />
        </button>
      </div>
    </article>
  );
}
