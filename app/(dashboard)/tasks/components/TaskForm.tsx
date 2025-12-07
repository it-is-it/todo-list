"use client";
import { useState, FormEvent } from "react";
import { useCreateTask } from "../hooks/useCreateTask";
import type { Task } from "./nav-Tasks";
import { useEditTask } from "../hooks/useEditTask";
import { toast } from "sonner";

interface TaskFormProps {
  closeModal: () => void;
  task?: Task;
  mode?: "create" | "edit";
}

export default function TaskForm({
  closeModal,
  task,
  mode = "create",
}: TaskFormProps) {
  const isEditing = mode === "edit";

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const createTask = useCreateTask();
  const editTask = useEditTask();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing && task) {
      editTask.mutate(
        {
          taskId: task!.uuid,
          editData: {
            title,
            description,
          },
        },
        {
          onSuccess: (result) => {
            if ("error" in result) {
              toast(result.error);
              return;
            }
            closeModal();
          },
        }
      );
    } else {
      createTask.mutate(
        { title, description },
        {
          onSuccess: () => {
            closeModal();
            setTitle("");
            setDescription("");
          },
        }
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 w-full max-w-sm"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={isEditing ? "Update task title..." : "Enter task title..."}
        required
        maxLength={50}
        className="border p-2 rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder={
          isEditing ? "Update task description..." : "Enter task description..."
        }
        className="border p-2 rounded"
      />
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="border border-gray-300 rounded p-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-black rounded-md text-white py-2 px-5"
        >
          {isEditing ? " Edit " : "Create"}
        </button>
      </div>
    </form>
  );
}
