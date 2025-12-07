import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../../action";

interface EditTaskParams {
  taskId: string;
  editData: { title: string; description: string };
}

type EditResponse = { success: true } | { error: string };

export function useEditTask() {
  const queryClient = useQueryClient();

  return useMutation<EditResponse, unknown, EditTaskParams>({
    mutationFn: async ({ taskId, editData }: EditTaskParams) => {
      const access_token = await getAccessToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/edit/${taskId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(editData),
        }
      );
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        return {
          error: data.detail || "Failed to update task",
        };
      }

      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}

// interface UpdateTaskParams {
//   taskId: string;
//   updateData: Record<string, unknown>;
// }

// export function useEditTaskPatch(method = "PATCH") {
//   const queryClient = useQueryClient();

//   return useMutation<unknown, unknown, UpdateTaskParams>({
//     mutationFn: async ({ taskId, updateData }: UpdateTaskParams) => {
//       const token = localStorage.getItem("accessToken");

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/edit/${taskId}`,
//         {
//           method,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(updateData),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw data;
//       return data;
//     },

//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//     },
//     onError: (error) => {
//       console.error("Task update error:", error);
//     },
//   });
// }
