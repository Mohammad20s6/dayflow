import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  createCategory,
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
