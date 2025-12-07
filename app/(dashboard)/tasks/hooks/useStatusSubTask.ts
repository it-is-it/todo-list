import { useTasks } from "./useTasks";

interface SubTask {
  uuid: string;
  title: string;
  status: string;
}

interface Task {
  uuid: string;
  title: string;
  sub_tasks?: SubTask[];
}

export function useArchivedSubTasks() {
  const { data, isLoading } = useTasks();

  if (isLoading || !data) return { archived: [], isLoading: true };

  const archived = (data.results || [])
    .flatMap((task: Task) => task.sub_tasks || [])
    .filter((sub: SubTask) => sub.status === "ARCHIVED");

  return { archived, isLoading: false };
}

export function useDoneSubTasks() {
  const { data, isLoading } = useTasks();

  if (isLoading) return { done: [], isLoading: true };

  const done = data?.results
    .flatMap((task: Task) => task.sub_tasks)
    .filter((sub: SubTask) => sub.status === "DONE");

  return { done, isLoading: false };
}

export function useTodoSubTasks() {
  const { data, isLoading } = useTasks();

  if (isLoading) return { done: [], isLoading: true };

  const done = data.results
    .flatMap((task: Task) => task.sub_tasks)
    .filter((sub: SubTask) => sub.status === "TODO");

  return { done, isLoading: false };
}
