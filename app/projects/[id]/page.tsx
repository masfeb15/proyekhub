import AppLayout from "@/components/layout/AppLayout";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (!project) {
    return (
      <AppLayout>
        <p>Project tidak ditemukan.</p>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold">
        {project.project_name}
      </h1>

      <div className="mt-8 rounded-xl border bg-white p-6 space-y-4">

        <div>
          <strong>Code</strong>
          <p>{project.project_code}</p>
        </div>

        <div>
          <strong>Status</strong>
          <p>{project.status}</p>
        </div>

        <div>
          <strong>Contract</strong>
          <p>
            Rp{" "}
            {Number(project.current_contract_value).toLocaleString(
              "id-ID"
            )}
          </p>
        </div>

        <div>
          <strong>Address</strong>
          <p>{project.site_address}</p>
        </div>

      </div>
    </AppLayout>
  );
}