import { useTasks } from "./useTasks";

export function useDoneSubTasks() {
  const { data, isLoading } = useTasks();

  if (isLoading) return { done: [], isLoading: true };

  const done = data.results
    .flatMap((task) => task.sub_tasks)
    .filter((sub) => sub.status === "TODO");

  return { done, isLoading: false };
}
