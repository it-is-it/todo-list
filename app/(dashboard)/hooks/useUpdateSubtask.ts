"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAccessToken } from "../action";

interface UpdateSubtaskParams {
  subId: string;
  updateData: {
    status: "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";
  };
}

export function useUpdateSubtaskPatch() {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateSubtaskParams>({
    mutationFn: async ({ subId, updateData }: UpdateSubtaskParams) => {
      const access_token = await getAccessToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sub-tasks/update/${subId}`,
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      alert(error?.message || "Subtask update failed!");
      console.error("Update subtask error:", error.message);
    },
  });
}

// interface UpdateSubtaskPutParams {
//   subId: string;
//   fullData: any;
// }

// export function useUpdateSubtaskPut() {
//   const queryClient = useQueryClient();

//   return useMutation<void, Error, UpdateSubtaskPutParams>({
//     mutationFn: async ({ subId, fullData }: UpdateSubtaskPutParams) => {
//       const token = localStorage.getItem("accessToken");

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/sub-tasks/update/${subId}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(fullData),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) throw data;

//       return data;
//     },

//     // onSuccess: (_, { taskId }) => {
//     //   queryClient.invalidateQueries(["task", taskId]);
//     //   queryClient.invalidateQueries(["tasks"]);
//     // },

//     onSuccess: () => {
//       alert("Subtask updated sucessfully");
//       queryClient.invalidateQueries({ queryKey: ["tasks"] });
//     },

//     onError: (error) => {
//       console.error("PUT update failed:", error.message);
//     },
//   });
// }
