import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">ProjectHub</h1>
      </div>

      <nav className="p-4 space-y-2">

        <button className="flex items-center gap-3 w-full rounded-lg bg-slate-800 px-4 py-3">
          <LayoutDashboard size={18} />
          Dashboard
        </button>

        <button className="flex items-center gap-3 w-full rounded-lg px-4 py-3 hover:bg-slate-800">
          <FolderKanban size={18} />
          Projects
        </button>

        <button className="flex items-center gap-3 w-full rounded-lg px-4 py-3 hover:bg-slate-800">
          <BarChart3 size={18} />
          Progress
        </button>

        <button className="flex items-center gap-3 w-full rounded-lg px-4 py-3 hover:bg-slate-800">
          <FileText size={18} />
          Reports
        </button>

        <button className="flex items-center gap-3 w-full rounded-lg px-4 py-3 hover:bg-slate-800">
          <Settings size={18} />
          Settings
        </button>

      </nav>
    </aside>
  );
}