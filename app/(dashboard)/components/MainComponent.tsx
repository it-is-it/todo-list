"use client";

import { Trash } from "lucide-react";
import { useState, FormEvent, ChangeEvent } from "react";

type TaskStatus = "todo" | "in-progress" | "completed";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  deleted: boolean;
}

export default function MainComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("todo");

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newTask: Task = {
      id: Date.now(),
      title,
      status: "todo" as TaskStatus,
      deleted: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
  };

  const updateStatus = (id: number, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const trashTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, deleted: true } : task))
    );
  };

  const visibleTasks = tasks.filter(
    (task) => !task.deleted && task.status === filter
  );

  const todoCount = tasks.filter(
    (t) => !t.deleted && t.status === "todo"
  ).length;
  const inProgressCount = tasks.filter(
    (t) => !t.deleted && t.status === "in-progress"
  ).length;
  const completedCount = tasks.filter(
    (t) => !t.deleted && t.status === "completed"
  ).length;

  return (
    <main className="flex-1 overflow-auto">
      <div className="p-4 border-b">
        <form onSubmit={handleAdd} className="relative">
          <input
            type="text"
            placeholder="Add task to 'inbox'"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute left-3 top-2.5 w-5 h-5 rounded-full border-2 border-gray-300"></div>
        </form>
      </div>

      <div className="flex border-b">
        <button
          onClick={() => setFilter("todo")}
          className={`flex-1 py-3 text-center text-sm font-medium ${
            filter === "todo"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          To Do ({todoCount})
        </button>
        <button
          onClick={() => setFilter("in-progress")}
          className={`flex-1 py-3 text-center text-sm font-medium ${
            filter === "in-progress"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          In Progress ({inProgressCount})
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`flex-1 py-3 text-center text-sm font-medium ${
            filter === "completed"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      <div className="divide-y">
        {visibleTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-400">
            <p>No tasks to do</p>
          </div>
        ) : (
          visibleTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 hover:bg-gray-50 flex items-center"
            >
              <input
                type="checkbox"
                checked={task.status === "completed"}
                onChange={() => {
                  updateStatus(
                    task.id,
                    task.status === "completed" ? "todo" : "completed"
                  );
                }}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
              />
              <span
                className={`flex-1 ${
                  task.status === "completed"
                    ? "line-through text-gray-400"
                    : ""
                }`}
              >
                {task.title}
              </span>
              {task.status !== "in-progress" && (
                <button
                  onClick={() => updateStatus(task.id, "in-progress")}
                  className="px-2 py-1 mr-5 text-xs border rounded hover:bg-gray-100"
                >
                  In Progress
                </button>
              )}
              <div className="flex items-center space-x-2">
                {task.status === "in-progress" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    In Progress
                  </span>
                )}
                {task.status === "completed" && (
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Done
                  </span>
                )}
                <button
                  onClick={() => trashTask(task.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
