import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../services/categoriesService";

export function useCategories(userId) {
  return useQuery({
    queryKey: ["categories", userId],
    queryFn: () => getCategories(userId),
    enabled: !!userId,
  });
}
