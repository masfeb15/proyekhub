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

      <div className="mt-8 overflow-hidden rounded-xl border bg-white">

        <ProjectTable
          projects={projects ?? []}
        />

      </div>
    </AppLayout>
  );
}