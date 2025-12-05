// "use client";
// import { useTasks } from "../hooks/useTasks";
// import Link from "next/link";
// import { useDeleteTask } from "../hooks/useDeleteTask";
// import { EllipsisVerticalIcon } from "lucide-react";
// // import { useEditTask } from "../hooks/useEditTask";
// import { useState, useEffect, useRef } from "react";
// import TaskForm from "./TaskForm";

// interface Task {
//   uuid: string;
//   title: string;
//   description?: string;
//   // status?: string;
//   sub_tasks?: any[];
// }

// export default function TaskList() {
//   const { data, isLoading, isError, error } = useTasks();
//   const [openMenuId, setOpenMenuId] = useState<string | null>(null);
//   const [showEditForm, setShowEditForm] = useState<boolean>(false);
//   const [editingTask, setEditingTask] = useState<Task | null>(null);
//   const deleteTask = useDeleteTask();
//   const menuRef = useRef<HTMLDivElement>(null);

//   console.log("Fetched tasks:", data);

//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (
//         menuRef.current &&
//         event.target instanceof Node &&
//         !menuRef.current.contains(event.target)
//       ) {
//         setOpenMenuId(null);
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   function handleDelete(taskId: string): void {
//     if (confirm("Are you sure you want to delete this task?")) {
//       deleteTask.mutate(taskId);
//     }
//   }

//   function handleUpdateStatus(task: Task): void {
//     // Implementation for updating task status
//     console.log("Update status for task:", task.uuid);
//   }

//   // function handleEdit()

//   if (isLoading) return <p>Loading tasks...</p>;
//   if (isError) return <p className="text-red-300">{JSON.stringify(error)}</p>;

//   return (
//     <div className="mt-1 pr-1">
//       <ul className="space-y-1 text-sm list-none">
//         {data?.results?.map((task: Task) => (
//           <li
//             className="list-none ml-4 flex flex-row justify-between w-[120px] bg-slate-200 rounded-md"
//             key={task.uuid}
//           >
//             <Link
//               href={`/tasks/${task.uuid}`}
//               className="block text-gray-700 w-full truncate p-1"
//             >
//               {task.title}
//             </Link>
//             <div
//               ref={openMenuId === task.uuid ? menuRef : null}
//               className="relative"
//             >
//               <button
//                 onClick={() =>
//                   setOpenMenuId(openMenuId === task.uuid ? null : task.uuid)
//                 }
//                 className="hover:bg-slate-300 rounded-2xl"
//               >
//                 <EllipsisVerticalIcon className="h-8 w-8 text-primary-100 p-2" />
//               </button>

//               {openMenuId === task.uuid && (
//                 <div className="absolute left-0 w-40 bg-white z-1000">
//                   <button
//                     onClick={() => {
//                       setEditingTask(task);
//                       setShowEditForm(true);
//                     }}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Edit
//                   </button>

//                   {showEditForm && (
//                     <TaskForm closeModal={() => setShowEditForm(false)} />
//                   )}

//                   <button
//                     onClick={() => handleUpdateStatus(task)}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Update
//                   </button>

//                   <button
//                     onClick={() => handleDelete(task.uuid)}
//                     className="w-full text-left px-4 py-2 hover:bg-red-100"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
