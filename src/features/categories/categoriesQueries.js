import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoriesService";

export function useCategories(userId) {
  return useQuery({
    queryKey: ["categories", userId],
    queryFn: () => getCategories(userId),
    enabled: !!userId,
  });
}

export function useCreateCategory(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (category) => createCategory({ ...category, user_id: userId }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories", userId] }),
  });
}

export function useUpdateCategory(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }) => updateCategory(id, updates),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["categories", userId] }),
  });
}

export function useDeleteCategory(userId) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories", userId] });
      queryClient.invalidateQueries({ queryKey: ["tasks", userId] }); // المهام المرتبطة بتصير "بدون تصنيف"
    },
  });
}
