import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../action";

type UpdateTaskData = {
  status: "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";
};

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      updateData,
    }: {
      taskId: string;
      updateData: UpdateTaskData;
    }) => {
      const access_token = await getAccessToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/update/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(updateData),
        }
      );
      const data = await res.json();
      if (!res.ok) throw data;

      return data;
    },
    onSuccess: (data) => {
      console.log("✅ Task updated:", data);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      console.error("❌ Failed to update task:", error);
    },
  });
}

//for put
// const updateTask = useUpdateTask("PUT");

// updateTask.mutate({
//   taskId: "task.uuid",
//   updateData: { title: "Fully Updated Task", status: "DONE" },
// });
