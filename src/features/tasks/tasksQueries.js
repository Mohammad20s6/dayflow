import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskComplete,
} from "../../services/tasksService";

export function useTasks(userId, filters) {
  return useQuery({
    queryKey: ["tasks", userId, filters],
    queryFn: () => getTasks({ userId, ...filters }),
    enabled: !!userId,
  });
}

export function useCreateTask(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task) => createTask({ ...task, user_id: userId }),
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });
      const previous = queryClient.getQueriesData({
        queryKey: ["tasks", userId],
      });

      const optimisticTask = {
        id: `temp-${Date.now()}`,
        user_id: userId,
        is_completed: false,
        categories: null,
        ...newTask,
      };

      queryClient.setQueriesData({ queryKey: ["tasks", userId] }, (old) =>
        old
          ? [...old, optimisticTask].sort(
              (a, b) => new Date(a.start_time) - new Date(b.start_time),
            )
          : old,
      );

      return { previous };
    },
    onError: (err, vars, context) => {
      context?.previous?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] }),
  });
}

export function useUpdateTask(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateTask(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });
      const previous = queryClient.getQueriesData({
        queryKey: ["tasks", userId],
      });

      queryClient.setQueriesData({ queryKey: ["tasks", userId] }, (old) =>
        old ? old.map((t) => (t.id === id ? { ...t, ...updates } : t)) : old,
      );

      return { previous };
    },
    onError: (err, vars, context) => {
      context?.previous?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] }),
  });
}

export function useDeleteTask(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteTask(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });
      const previous = queryClient.getQueriesData({
        queryKey: ["tasks", userId],
      });
      queryClient.setQueriesData({ queryKey: ["tasks", userId] }, (old) =>
        old ? old.filter((t) => t.id !== id) : old,
      );
      return { previous };
    },
    onError: (err, id, context) => {
      context?.previous?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] }),
  });
}

export function useToggleTaskComplete(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isCompleted }) => toggleTaskComplete(id, isCompleted),
    onMutate: async ({ id, isCompleted }) => {
      await queryClient.cancelQueries({ queryKey: ["tasks", userId] });
      const previous = queryClient.getQueriesData({
        queryKey: ["tasks", userId],
      });
      queryClient.setQueriesData({ queryKey: ["tasks", userId] }, (old) =>
        old
          ? old.map((t) =>
              t.id === id ? { ...t, is_completed: isCompleted } : t,
            )
          : old,
      );
      return { previous };
    },
    onError: (err, vars, context) => {
      context?.previous?.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] }),
  });
}
