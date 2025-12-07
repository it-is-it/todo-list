import { useQuery } from "@tanstack/react-query";

export function useFilteredTasks(
  status: string,
  limit: number = 10,
  offset: number = 0
) {
  return useQuery({
    queryKey: ["tasks", status],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/filter/${status}/?limit=${limit}&offset=${offset}`
      );
      return res.json();
    },
    staleTime: 60 * 1000,
  });
}
