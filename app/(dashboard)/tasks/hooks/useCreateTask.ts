import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../../action";

interface TaskData {
  title: string;
  description: string;
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: TaskData) => {
      const access_token = await getAccessToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/create/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(taskData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("create task error", data);
        throw data;
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
