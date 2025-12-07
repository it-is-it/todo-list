import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../../action";
import { toast } from "sonner";

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
      console.log("Task updated:", data);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      if (
        typeof error === "object" &&
        error !== null &&
        "detail" in error &&
        typeof (error as { detail?: unknown }).detail === "string"
      ) {
        toast((error as { detail: string }).detail);
        return;
      }

      toast("Failed to update task");
    },
  });
}

//for put
// const updateTask = useUpdateTask("PUT");

// updateTask.mutate({
//   taskId: "task.uuid",
//   updateData: { title: "Fully Updated Task", status: "DONE" },
// });
