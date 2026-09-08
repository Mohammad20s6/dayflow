import { CheckCircle2, ListTodo } from "lucide-react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";
import { useTasks, useDeleteTask, useToggleTaskComplete } from "./tasksQueries";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { isToday } from "../../utils/date";
import TaskCard from "./TaskCard";
import TaskListSkeleton from "../../components/tasks/TaskListSkeleton";
import EmptyState from "../../components/tasks/EmptyState";
import ErrorState from "../../components/tasks/ErrorState";
import styles from "./TaskList.module.css";
export default function TaskList({ userId, onlyToday = false }) {
  const filters = useSelector((s) => s.ui.filters);
  const rawSearch = useSelector((s) => s.ui.searchQuery);
  const search = useDebouncedValue(rawSearch, 300);
  const { data, isLoading, isError, refetch } = useTasks(userId, {
    ...filters,
    search,
  });
  const deleteTask = useDeleteTask(userId);
  const toggleTask = useToggleTaskComplete(userId);
  const tasks = onlyToday
    ? (data || []).filter((task) => isToday(task.start_time))
    : data || [];
  if (isLoading) {
    return (
      <div className={styles.loadingWrap}>
        {" "}
        <TaskListSkeleton />{" "}
      </div>
    );
  }
  if (isError) {
    return (
      <div className={styles.stateCard}>
        {" "}
        <ErrorState onRetry={refetch} />{" "}
      </div>
    );
  }
  if (!tasks.length) {
    return (
      <div className={styles.stateCard}>
        {" "}
        <EmptyState />{" "}
      </div>
    );
  }
  return (
    <div className={styles.container}>
      {" "}
      <div className={styles.listMeta}>
        {" "}
        <div className={styles.metaIcon}>
          {" "}
          {onlyToday ? <CheckCircle2 size={15} /> : <ListTodo size={15} />}{" "}
        </div>{" "}
        <span>
          {" "}
          {tasks.length} {tasks.length === 1 ? "مهمة" : "مهام"}{" "}
        </span>{" "}
      </div>{" "}
      <div className={styles.list}>
        {" "}
        <AnimatePresence initial={false}>
          {" "}
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className={styles.item}
            >
              {" "}
              <TaskCard
                task={task}
                onToggle={(id, value) =>
                  toggleTask.mutate({ id, isCompleted: value })
                }
                onDelete={(id) => deleteTask.mutate(id)}
              />{" "}
            </motion.div>
          ))}{" "}
        </AnimatePresence>{" "}
      </div>{" "}
    </div>
  );
}
