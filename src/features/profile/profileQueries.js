import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../../services/profileService";

export function useProfile(userId) {
  return useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: Boolean(userId),
  });
}

export function useUpdateProfile(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates) => updateProfile(userId, updates),

    onSuccess: (updatedProfile) => {
      queryClient.setQueryData(["profile", userId], updatedProfile);
    },
  });
}

export function useUploadAvatar(userId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file) => uploadAvatar(userId, file),

    onSuccess: async (avatarUrl) => {
      // نحدث profile في قاعدة البيانات.
      const updatedProfile = await updateProfile(userId, {
        avatar_url: avatarUrl,
      });

      // نحدث React Query مباشرة بدون انتظار refetch.
      queryClient.setQueryData(["profile", userId], updatedProfile);
    },
  });
}
