"use client";

import { useDeleteSubTask } from "../../hooks/useDeleteSubTask";
import { useArchivedSubTasks } from "../../hooks/useStatusSubTask";
import { useState } from "react";
import { useUpdateSubtaskPatch } from "../../hooks/useUpdateSubtask";

interface SubTask {
  uuid: string;
  title: string;
  description?: string;
  status: string;
}

export default function TrashTask() {
  const { archived, isLoading } = useArchivedSubTasks();
  const deleteSubtask = useDeleteSubTask();
  const [isRestoring] = useState<Record<string, boolean>>({});
  const updateSubtask = useUpdateSubtaskPatch();

  function handleDelete(taskId: string) {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteSubtask.mutate(taskId);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="p-4">
      {archived.length === 0 ? (
        <p className="text-gray-500 pt-4">No archived subtasks available.</p>
      ) : (
        (archived as SubTask[]).map((sub: SubTask) => (
          <div
            key={sub.uuid}
            className="p-2 border rounded-lg m-3 bg-red-50 text-red-900 flex justify-between items-center"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{sub.title}</p>
              {sub.description && (
                <p className="text-sm text-gray-700 mt-1">{sub.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  updateSubtask.mutate({
                    subId: sub.uuid,
                    updateData: { status: "TODO" }, // restore
                  })
                }
                disabled={isRestoring[sub.uuid]}
                className="px-3 py-1 border border-green-600 text-green-600 rounded hover:bg-green-50 disabled:opacity-50"
              >
                {isRestoring[sub.uuid] ? "Restoring..." : "Restore"}
              </button>
              <button
                onClick={() => handleDelete(sub.uuid)}
                disabled={deleteSubtask.isPending}
                className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 disabled:opacity-50"
              >
                {deleteSubtask.isPending ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
