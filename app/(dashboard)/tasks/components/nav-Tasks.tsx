"use client";

import {
  Menu,
  MoreHorizontal,
  Pencil,
  PlusIcon,
  Trash2,
  X,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTasks } from "@/app/(dashboard)/tasks/hooks/useTasks";
import { useState } from "react";
import TaskForm from "@/app/(dashboard)/tasks/components/TaskForm";
import { useDeleteTask } from "@/app/(dashboard)/tasks/hooks/useDeleteTask";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface Subtask {
  uuid: string;
  task: string;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface Task {
  uuid: string;
  user: number;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";
  description: string;
  sub_tasks: Subtask[];
  created_at?: string;
  updated_at?: string;
}

export function NavTasks() {
  const { data } = useTasks();
  const { isMobile } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const deleteTask = useDeleteTask();

  function handleDelete(taskId: string) {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutate(taskId, {
        onSuccess: () => {
          toast.success("Task deleted");
          router.push("/");
        },
        onError: () => {
          toast.error("Failed to delete task");
        },
      });
    }
  }

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>
        <div
          className="flex justify-between items-center w-48"
          onClick={openModal}
        >
          <div className="flex flex-row items-center justify-start">
            <Menu className="h-4 w-4 mr-1" />{" "}
            <span className="text-semibold text-lg">Tasks</span>
          </div>
          <div>
            <PlusIcon className="h-4 w-4" />
          </div>
        </div>
      </SidebarGroupLabel>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={closeModal}
            >
              <X className="w-5 h-5" />
            </button>

            <TaskForm closeModal={closeModal} />
          </div>
        </div>
      )}
      <SidebarMenu>
        {data?.results?.map((item: Task) => (
          <SidebarMenuItem key={item.uuid}>
            <SidebarMenuButton asChild>
              <Link href={`/tasks/${item.uuid}`} title={item.title}>
                {item.title}
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="text-muted-foreground"
                >
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-32 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  onClick={() => {
                    setEditingTask(item);
                    setShowEditForm(true);
                  }}
                >
                  <Pencil className="text-muted-foreground" />
                  <span className="w-full text-left hover:bg-gray-100">
                    Edit
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete(item.uuid)}>
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      {showEditForm && editingTask && (
        <div
          className="fixed inset-0 bg-opacity-30 flex items-center justify-center z-50 max-w-auto"
          onClick={() => setShowEditForm(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
              onClick={() => setShowEditForm(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <TaskForm
              closeModal={() => setShowEditForm(false)}
              task={editingTask}
              mode="edit"
            />
          </div>
        </div>
      )}
    </SidebarGroup>
  );
}
