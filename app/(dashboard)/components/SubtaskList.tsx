"use client";

import { Circle, Clock, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { useParams } from "next/navigation";
import { useUpdateSubtaskPatch } from "../hooks/useUpdateSubtask";
import { EllipsisVerticalIcon, Trash } from "lucide-react";

type SubtaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";

interface Subtask {
  uuid: string;
  title: string;
  status: SubtaskStatus;
}

interface Task {
  uuid: string;
  sub_tasks: Subtask[];
  // Add other properties as needed
}

interface SubtaskListProps {
  taskId: string;
}
export default function SubtaskList({ taskId }: SubtaskListProps) {
  const { id } = useParams();
  const { data } = useTasks();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [filter, setFilter] = useState("TODO");

  //just for checking the subtask id
  // const maintask = data?.results?.find((t) => t.uuid === taskId);
  // const subTasks = maintask?.sub_tasks || [];
  // subTasks.forEach((sub) => {
  //   console.log("Subtask ID:", sub);
  // });

  const updateSubtask = useUpdateSubtaskPatch();

  const task = data?.results?.find((t: Task) => t.uuid === id);
  if (!task) return <p className="text-blue-400">Task not found</p>;

  const allSubTasks = task.sub_tasks || [];
  const subTasks = allSubTasks.filter((s: Subtask) => s.status === filter);

  // subTasks.forEach((sub: Subtask) => {
  //   console.log("Subtask:", sub);
  // });

  const statusStyles = {
    TODO: "bg-blue-100 text-blue-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    DONE: "bg-green-100 text-green-800",
    ARCHIVED: "bg-gray-200 text-gray-500 line-through",
  };

  // const toggleStatus = (sub: Subtask) => {
  //   const freshSub = task.sub_tasks.find((s: Subtask) => s.uuid === sub.uuid);

  //   if (!freshSub) {
  //     console.error("Subtask not found!");
  //     return;
  //   }

  //   console.log(freshSub);

  //   const newStatus = freshSub.status === "DONE" ? "TODO" : "DONE";

  //   updateSubtask.mutate({
  //     subId: freshSub.uuid,
  //     taskId: id,
  //     updateData: { status: newStatus },
  //   });
  // };

  const moveToTrash = (sub: Subtask) => {
    updateSubtask.mutate({
      subId: sub.uuid,
      updateData: { status: "ARCHIVED" },
    });
  };

  //count
  const todoCount = task.sub_tasks.filter(
    (s: Subtask) => s.status === "TODO"
  ).length;
  const inProgressCount = task.sub_tasks.filter(
    (s: Subtask) => s.status === "IN_PROGRESS"
  ).length;
  const doneCount = task.sub_tasks.filter(
    (s: Subtask) => s.status === "DONE"
  ).length;

  console.log("data", data?.results);

  return (
    <div>
      <div className="flex gap-2 my-4 border-b border-gray-200">
        <button
          onClick={() => setFilter("TODO")}
          className={`flex items-center w-[200px] gap-1 justify-center p-3 text-sm font-medium ${
            filter === "TODO"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Circle className="h-5 w-5 text-blue-400" /> Todo ({todoCount})
        </button>

        <button
          onClick={() => setFilter("IN_PROGRESS")}
          className={`flex items-center w-[200px] gap-1 justify-center p-3 text-sm font-medium ${
            filter === "IN_PROGRESS"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Clock className="h-5 w-5 text-yellow-400" /> In Progress (
          {inProgressCount})
        </button>

        <button
          onClick={() => setFilter("DONE")}
          className={`flex items-center w-[200px] gap-1 justify-center p-3 text-sm font-medium ${
            filter === "DONE"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <CheckCircle className="h-5 w-5 text-green-400" /> Completed (
          {doneCount})
        </button>
      </div>

      <div className="divide-y">
        {subTasks.length === 0 ? (
          <p className="text-gray-500 text-sm">No subtasks in this category.</p>
        ) : (
          subTasks.map((sub: Subtask) => (
            <div
              key={sub.uuid}
              className={`flex items-center gap-4 shadow p-2 rounded ${
                statusStyles[sub.status as keyof typeof statusStyles]
              }`}
            >
              <input
                type="checkbox"
                checked={sub.status === "DONE"}
                onChange={() =>
                  updateSubtask.mutate({
                    subId: sub.uuid,
                    updateData: {
                      status: sub.status === "DONE" ? "TODO" : "DONE",
                    },
                  })
                }
                className="h-5 w-5"
              />

              <span className="flex-1">{sub.title}</span>

              <select
                value={sub.status as string}
                onChange={(e) =>
                  updateSubtask.mutate({
                    subId: sub.uuid,
                    updateData: { status: e.target.value as SubtaskStatus },
                  })
                }
                className="px-2 py-1 rounded border text-xs bg-white"
              >
                <option value="TODO">Todo</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Completed</option>
              </select>

              <div className="relative ml-auto">
                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === sub.uuid ? null : sub.uuid)
                  }
                  className="p-2"
                >
                  <EllipsisVerticalIcon className="h-6 w-6" />
                </button>

                {openMenuId === sub.uuid && (
                  <div className="absolute top-[30px] right-5 w-40 bg-white shadow-lg rounded-md border border-gray-200 flex flex-col z-10">
                    <div
                      className="flex items-center gap-2 p-2 text-gray-600 hover:bg-gray-100 rounded-b-md cursor-pointer"
                      onClick={() => {
                        moveToTrash(sub);
                        setOpenMenuId(null);
                      }}
                    >
                      <Trash className="h-5 w-5" />
                      <span>Move to Trash</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
