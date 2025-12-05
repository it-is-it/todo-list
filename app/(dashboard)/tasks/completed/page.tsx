"use client";

import Header from "../../components/Header";
import { useDoneSubTasks } from "../../hooks/useDoneSubTask";
import { useUpdateSubtaskPatch } from "../../hooks/useUpdateSubtask";

interface SubTask {
  uuid: string;
  title: string;
  status: string;
  description?: string;
  task_id?: string;
}

export default function CompletedPage() {
  const { done, isLoading } = useDoneSubTasks();
  const updateSubtask = useUpdateSubtaskPatch();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Header title="Completed" />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Completed Tasks</h1>
        {done.length === 0 ? (
          <p className="text-gray-500">No completed subtasks found.</p>
        ) : (
          (done as SubTask[]).map((sub: SubTask) => (
            <div
              key={sub.uuid}
              className="p-2 border rounded-lg mb-3 bg-green-50 text-gray-900 flex justify-between items-center"
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

              <div>
                <p className="font-semibold">{sub.title}</p>
                <p className="text-sm text-green-700">{sub.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
