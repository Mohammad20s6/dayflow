import { useSelector } from "react-redux";
import { useTasks, useDeleteTask, useToggleTaskComplete } from "./tasksQueries";
import TaskCard from "./TaskCard";
import styles from "./TaskList.module.css";

export default function TaskList({ userId }) {
  const filters = useSelector((s) => s.ui.filters);

  const { data: tasks, isLoading, isError } = useTasks(userId, filters);

  const deleteTask = useDeleteTask(userId);
  const toggleTask = useToggleTaskComplete(userId);

  if (isLoading) {
    return (
      <div className={styles.state} role="status">
        <span className={styles.spinner} />
        <span>جاري تحميل مهامك...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.stateError} role="alert">
        <span className={styles.errorIcon}>!</span>

        <div>
          <strong>تعذر تحميل المهام</strong>
          <p>جرب تحديث الصفحة مرة أخرى.</p>
        </div>
      </div>
    );
  }

  if (!tasks?.length) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>✓</div>

        <div className={styles.emptyContent}>
          <strong>يومك هادئ حتى الآن</strong>
          <p>ما عندك مهام بهذا الفلتر. أضف أول مهمة وابدأ بتنظيم يومك.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={(id, value) =>
            toggleTask.mutate({
              id,
              isCompleted: value,
            })
          }
          onDelete={(id) => deleteTask.mutate(id)}
        />
      ))}
    </div>
  );
}
