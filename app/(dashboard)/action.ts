"use server";

export type SubTask = {
  uuid: string;
  task: string;
  title: string;
  description?: string;
  status: string;
};

export type Task = {
  uuid: string;
  title: string;
  description?: string;
  status: string;
  sub_tasks: SubTask[];
};

type ApiTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type NewTodo = {
  title: string;
  status: "todo";
  deleted: boolean;
};
export type Todo = {
  id: number;
  title: string;
  status: string;
  deleted: boolean;
};

export const loadTasks = async () => {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : null;
};

export const saveTodos = async (todos: Todo[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("tasks", JSON.stringify(todos));
};

export const getTodos = async (): Promise<
  {
    id: number;
    title: string;
    status: "todo";
    deleted: boolean;
  }[]
> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: ApiTodo[] = await response.json();

  return todos.slice(0, 10).map((todo) => ({
    id: todo.id,
    title: todo.title,
    status: "todo",
    deleted: false,
  }));
};

export const addTodo = async (newTodo: NewTodo) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });
  return response.json();
};

import { cookies } from "next/headers";

export async function saveCookie(access_token: string) {
  const cookiestore = await cookies();
  cookiestore.set("access_token", access_token);
}

export async function getAccessToken(): Promise<string> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    throw new Error("Authentication token not found");
  }

  return token;
}
