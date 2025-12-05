"use client";
import { useState, FormEvent } from "react";
import { useCreateSubtask } from "../hooks/useCreateSubtask";

type SubtaskStatus = "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";

interface SubtaskFormProps {
  taskId: string | number;
}

export default function SubtaskForm({ taskId }: SubtaskFormProps) {
  const [title, setTitle] = useState("");
  const createSubtask = useCreateSubtask();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createSubtask.mutate({
      task: taskId,
      title: title,
      status: "TODO" as SubtaskStatus,
      description: "hello",
    });

    setTitle("");
  };

  return (
    <div className="pl-0 mb-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          placeholder="+ Add subtask here"
          className="w-full p-2 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-4 focus:ring-gray-200 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </form>
    </div>
  );
}
