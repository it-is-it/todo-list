"use client";
import { useParams } from "next/navigation";
import { useTasks } from "../../hooks/useTasks";
import SubtaskList from "../../components/SubtaskList";
import SubtaskForm from "../../components/SubtaskForm";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import Header from "../../components/Header";

interface Task {
  uuid: string;
  title: string;
  description?: string;
  sub_tasks?: Array<{
    uuid: string;
    title: string;
    status: string;
  }>;
}

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";

export default function TaskDetailPage() {
  const { id } = useParams<{ id: string }>();
  const taskId = Array.isArray(id) ? id[0] : id || "";
  const { data, isLoading, isError } = useTasks();
  const updateTask = useUpdateTask();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks</p>;

  const task = data?.results?.find((t: Task) => t.uuid === taskId);

  if (!task) return <p className="text-blue-400">Task not found</p>;

  return (
    <>
      <Header title={`Task : ${task.title}`} />
      <div className="p-2">
        <div className="flex flex-row justify-between pr-10 items-center pb-4 pl-2">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold mb-2">{task.title}</h1>
            <p className="text-gray-600 mb-4">{task.description}</p>
          </div>
          <select
            value={task.status as string}
            onChange={(e) =>
              updateTask.mutate({
                taskId: id,
                updateData: {
                  status: e.target.value as TaskStatus,
                },
              })
            }
            className="px-2 py-1 rounded border text-xs bg-white"
          >
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Completed</option>
          </select>
        </div>

        <SubtaskForm taskId={taskId} />
        <SubtaskList taskId={taskId} />

        {/* {task.sub_tasks?.length > 0 ? (
        <ul className="list-disc ml-5 space-y-1">
        {task.sub_tasks.map((sub) => (
          <li key={sub.uuid}>
              <span className="font-medium">{sub.title}</span> –{" "}
              <span className="text-sm text-gray-500">{sub.status}</span>
              </li>
              ))}
        </ul>
        ) : (
          <p className="text-sm text-gray-500">No subtasks found.</p>
      )} */}
      </div>
    </>
  );
}
