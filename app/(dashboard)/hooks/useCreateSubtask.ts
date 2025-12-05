import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../action";

type SubtaskData = {
  task: string | number;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";
  description: string;
};

export function useCreateSubtask() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, SubtaskData>({
    mutationFn: async (taskData: SubtaskData) => {
      const access_token = await getAccessToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sub-tasks/create/`,
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
        console.log("CREATE ERROR:", data);

        throw data;
      }

      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
