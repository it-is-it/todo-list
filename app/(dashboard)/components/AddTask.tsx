"use client";
import { useState } from "react";
import { Plus, List, X } from "lucide-react";
import TaskForm from "./TaskForm";

export default function TaskHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div
        className="flex items-center justify-between py-2 px-2 text-gray-700 hover:bg-gray-100"
        onClick={openModal}
      >
        <div className="flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Tasks</span>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <List className="h-5 w-5" />
        </button>
      </div>

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
    </div>
  );
}
