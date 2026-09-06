import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "motion/react";

import { useTasks, useDeleteTask, useToggleTaskComplete } from "./tasksQueries";

import TaskCard from "./TaskCard";
import TaskListSkeleton from "../../components/tasks/TaskListSkeleton";
import EmptyState from "../../components/tasks/EmptyState";
import ErrorState from "../../components/tasks/ErrorState";

import styles from "./TaskList.module.css";

export default function TaskList({ userId }) {
  const filters = useSelector((state) => state.ui.filters);

  const {
    data: tasks,
    isLoading,
    isError,
    refetch,
  } = useTasks(userId, filters);

  const deleteTask = useDeleteTask(userId);
  const toggleTask = useToggleTaskComplete(userId);

  if (isLoading) {
    return <TaskListSkeleton />;
  }

  if (isError) {
    return <ErrorState onRetry={refetch} />;
  }

  if (!tasks?.length) {
    return <EmptyState />;
  }

  return (
    <div className={styles.list}>
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            layout
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              marginBottom: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
          >
            <TaskCard
              task={task}
              onToggle={(id, value) =>
                toggleTask.mutate({
                  id,
                  isCompleted: value,
                })
              }
              onDelete={(id) => deleteTask.mutate(id)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
