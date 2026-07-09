import AppLayout from "@/components/layout/AppLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { count: totalProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true });

  const { count: runningProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("status", "RUNNING");

  const { count: tenderProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("status", "TENDER");

  const { count: completedProjects } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("status", "COMPLETED");

  return (
    <AppLayout>
      <h2 className="text-3xl font-bold">
        Dashboard
      </h2>

      <p className="mt-2 text-slate-600">
        Selamat datang di ProjectHub
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Total Projects"
          value={String(totalProjects ?? 0)}
        />

        <DashboardCard
          title="Running"
          value={String(runningProjects ?? 0)}
        />

        <DashboardCard
          title="Tender"
          value={String(tenderProjects ?? 0)}
        />

        <DashboardCard
          title="Completed"
          value={String(completedProjects ?? 0)}
        />

      </div>
    </AppLayout>
  );
}