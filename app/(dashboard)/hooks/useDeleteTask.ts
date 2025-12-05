import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../action";

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: string) => {
      const access_token = await getAccessToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/delete/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Delete failed");
      }

      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (error) => {
      console.error("Task delete error:", error.message);
    },
  });
}
