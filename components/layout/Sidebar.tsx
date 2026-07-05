import {
  LayoutDashboard,
  FolderKanban,
  ClipboardCheck,
  CalendarDays,
  BarChart3,
  FileText,
} from "lucide-react";

const menus = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: FolderKanban, label: "Projects" },
  { icon: ClipboardCheck, label: "Progress" },
  { icon: CalendarDays, label: "Schedule" },
  { icon: BarChart3, label: "BOQ" },
  { icon: FileText, label: "Reports" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-cyan-400">
          ProyekHub
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Construction Project OS
        </p>
      </div>

      <nav className="p-3">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <div
              key={menu.label}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 cursor-pointer transition"
            >
              <Icon size={20} />
              <span>{menu.label}</span>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}