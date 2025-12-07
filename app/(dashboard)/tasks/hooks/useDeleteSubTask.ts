import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../../action";

export function useDeleteSubTask() {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, string>({
    mutationFn: async (subTaskId: string) => {
      const access_token = await getAccessToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sub-task/delete/${subTaskId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || "Failed to delete subtask");
      }
      return true;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },

    onError: (error: Error) => {
      console.error("Failed to delete subtask", error);
    },
  });
}
