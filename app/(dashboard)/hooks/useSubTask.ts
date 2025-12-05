import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../action";

export function useSubtasks(
  taskId: string,
  limit: number = 10,
  offset: number = 0
) {
  return useQuery({
    queryKey: ["subtasks", taskId],
    queryFn: async () => {
      const access_token = await getAccessToken();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${taskId}/subtasks/?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch subtasks");
      }

      return res.json();
    },
  });
}
