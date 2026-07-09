import Link from "next/link";
import AppLayout from "@/components/layout/AppLayout";
import { createClient } from "@/lib/supabase/server";
import ProjectStatusBadge from "@/features/projects/components/ProjectStatusBadge";
import ProjectTable from "@/features/projects/components/ProjectTable";

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select(`
      id,
      project_code,
      project_name,
      status,
      current_contract_value,
      start_date,
      finish_date
    `)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <AppLayout>
        <p>Error : {error.message}</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold">
        Projects
      </h1>

      <div className="flex items-center justify-between">

  <h1 className="text-3xl font-bold">
    Projects
  </h1>

  <Link
    href="/projects/new"
    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
  >
    + New Project
  </Link>

</div>
    </AppLayout>
  );
}