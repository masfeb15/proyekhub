import Link from "next/link";

import ProjectStatusBadge from "./ProjectStatusBadge";
import { Project } from "../types/project";
import { Eye, Pencil, Trash2 } from "lucide-react";

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
            <th className="p-3 text-center">Action</th>
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
              <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">

                    <Link
                    href={`/projects/${project.id}`}
                    className="rounded p-2 hover:bg-slate-100">
                    <Eye size={18} />
                    </Link>

                    <button
                    className="rounded p-2 hover:bg-slate-100">
                    <Pencil size={18} />
                    </button>

                    <button
                    className="rounded p-2 text-red-600 hover:bg-red-50"
                    >
                    <Trash2 size={18} />
                    </button>

                    </div>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}