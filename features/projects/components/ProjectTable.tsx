import Link from "next/link";

import ProjectStatusBadge from "./ProjectStatusBadge";
import { Project } from "../types/project";

type Props = {
  projects: Project[];
};

export default function ProjectTable({ projects }: Props) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border bg-white">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Project</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-right">Contract</th>
          </tr>
        </thead>

        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-3">
                {project.project_code}
              </td>

              <td className="p-3">
                <Link
                  href={`/projects/${project.id}`}
                  className="font-medium text-blue-600 hover:underline"
                >
                  {project.project_name}
                </Link>
              </td>

              <td className="p-3">
                <ProjectStatusBadge
                  status={project.status}
                />
              </td>

              <td className="p-3 text-right">
                Rp{" "}
                {Number(project.current_contract_value).toLocaleString(
                  "id-ID"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}