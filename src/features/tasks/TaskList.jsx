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
    ? (data || []).filter((t) => isToday(t.start_time))
    : data;

  if (isLoading) return <TaskListSkeleton />;
  if (isError) return <ErrorState onRetry={refetch} />;
  if (!tasks?.length) return <EmptyState />;

  return (
    <div className={styles.list}>
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TaskCard
              task={task}
              onToggle={(id, val) =>
                toggleTask.mutate({ id, isCompleted: val })
              }
              onDelete={(id) => deleteTask.mutate(id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
