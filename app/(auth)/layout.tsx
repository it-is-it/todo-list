import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Dyno List",
  description:
    "Access your Dyno List account or sign up to manage tasks with a simple, intuitive interface. Perfect for individuals, startups, and small teams.",
  keywords: [
    "Dyno List login",
    "task manager login",
    "minimal todo app",
    "team productivity login",
    "sign in task tracker",
    "simple task management",
    "startup productivity tool",
    "to-do app sign in",
    "collaborative task manager",
    "easy task planning",
    "login Dyno List",
    "Notion alternative",
    "Todoist alternative",
    "manage team tasks",
  ],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-100 flex min-h-svh flex-col items-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-md mt-12">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardContent>{children}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
