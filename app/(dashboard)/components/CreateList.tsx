"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Circle,
  Clock,
  CheckCircle,
  Trash,
  EllipsisVerticalIcon,
} from "lucide-react";
import { addTodo, getTodos, saveTodos } from "../action";

export type Todo = {
  id: number;
  title: string;
  status: string;
  deleted: boolean;
};

export type NewTodo = {
  title: string;
};

export default function CreateList() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("todo");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const { data, error, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (newTodo) => {
      const todoWithStatus = {
        ...newTodo,
        id: Date.now(),
        status: "todo",
        deleted: false,
      };
      queryClient.setQueryData<Todo[]>(["todos"], (oldData) => {
        const updated = [todoWithStatus, ...(oldData || [])];
        saveTodos(updated);
        return updated;
      });
      setTitle("");
    },
  });

  const updateStatus = (id: number, status: string) => {
    queryClient.setQueryData<Todo[]>(["todos"], (oldData = []) => {
      const updated = (oldData || []).map((t) =>
        t.id === id ? { ...t, status } : t
      );
      saveTodos(updated);
      return updated;
    });
  };

  const trashTask = (id: number) => {
    queryClient.setQueryData<Todo[]>(["todos"], (oldData) => {
      const updated = (oldData || []).map((t) =>
        t.id === id ? { ...t, deleted: true } : t
      );
      saveTodos(updated);
      return updated;
    });
  };

  const handleAddTodo = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (title.trim()) {
      mutation.mutate({ title, status: "todo", deleted: false });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const visibleTasks = (data || []).filter(
    (t) => !t.deleted && t.status === filter
  );

  const todoCount = (data || []).filter(
    (t) => !t.deleted && t.status === "todo"
  ).length;
  const inProgressCount = (data || []).filter(
    (t) => !t.deleted && t.status === "in-progress"
  ).length;
  const completedCount = (data || []).filter(
    (t) => !t.deleted && t.status === "completed"
  ).length;

  return (
    <div className="overflow-auto max-w-auto border-gray-50 border-y">
      <div className=" mb-4">
        <form onSubmit={handleAddTodo} className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="+ Add task to 'inbox'"
            className="w-full p-2 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={mutation.isPending}
          >
            Add
          </button>
        </form>
      </div>

      <div className="pl-4 ">
        <div className="flex gap-2 my-4 border-b border-gray-200">
          <button
            onClick={() => setFilter("todo")}
            className={`flex items-center w-[200px] gap-1 justify-center p-3 text-center text-sm font-medium ${
              filter === "todo"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Circle className="h-5 w-5 text-blue-400" /> Todo ({todoCount})
          </button>
          <button
            onClick={() => setFilter("in-progress")}
            className={`flex items-center w-[200px] justify-center gap-1 p-3 text-center text-sm font-medium ${
              filter === "in-progress"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Clock className="h-5 w-5 text-yellow-400" /> In Progress (
            {inProgressCount})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`flex items-center w-[200px] gap-1 justify-center p-3 text-center text-sm font-medium ${
              filter === "completed"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <CheckCircle className="h-5 w-5 text-green-400" /> Completed (
            {completedCount})
          </button>
        </div>

        <div className="divide-y">
          {visibleTasks.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p>No tasks to do</p>
            </div>
          ) : (
            visibleTasks.slice(0, 10).map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 shadow p-2 rounded
          ${
            item.deleted
              ? "bg-gray-200 line-through text-gray-500"
              : item.status === "todo"
              ? "bg-blue-100 text-blue-800"
              : item.status === "in-progress"
              ? "bg-yellow-100 text-yellow-800"
              : item.status === "completed"
              ? "bg-green-100 text-green-800"
              : ""
          }`}
              >
                <input
                  type="checkbox"
                  checked={item.status === "completed"}
                  onChange={() => {
                    updateStatus(
                      item.id,
                      item.status === "completed" ? "todo" : "completed"
                    );
                  }}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                />
                <span
                  className={`flex-1 ${
                    item.status === "completed"
                      ? "line-through text-gray-400"
                      : ""
                  }`}
                >
                  {item.title}
                </span>

                {!item.deleted && (
                  <>
                    <select
                      value={item.status}
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className="mx-4 px-2 py-1 rounded border  mr-5 text-xs  hover:bg-gray-100 "
                    >
                      <option value="todo">Todo</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>

                    <div className="relative ml-auto ">
                      <button
                        className="hover:text-accent-400 transition-colors flex items-center gap-4 pr-5"
                        onClick={() =>
                          setOpenMenuId(openMenuId === item.id ? null : item.id)
                        }
                      >
                        <EllipsisVerticalIcon className="h-8 w-8 text-primary-100 bg-slate-200 rounded-full p-2" />
                      </button>

                      {openMenuId === item.id && (
                        <div className="absolute top-[30px] right-5 w-60 bg-white shadow-lg rounded-md border border-gray-200 flex flex-col z-10">
                          <div
                            className="flex items-center gap-2 p-4 text-gray-600 hover:bg-gray-100 rounded-b-md cursor-pointer"
                            onClick={() => {
                              trashTask(item.id);
                              setOpenMenuId(null);
                            }}
                          >
                            <Trash className="h-5 w-5" />
                            <span>Move to Trash</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
