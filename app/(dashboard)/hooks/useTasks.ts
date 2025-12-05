import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../action";

export function useTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const access_token = await getAccessToken();
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw data;

      return data;
    },
    // staleTime: 1000 * 60,
  });
}
