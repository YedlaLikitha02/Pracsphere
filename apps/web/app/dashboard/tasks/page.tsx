// File: apps/web/app/dashboard/tasks/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import TaskManager from "../../../components/TaskManager";

export default async function TasksPage() {
  const session = await getServerSession(authOptions);

  // Protect the route
  if (!session) {
    redirect("/login");
  }

  // Render the same TaskManager component
  return <TaskManager />;
}