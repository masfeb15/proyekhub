"use client";

const menus = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Progress",
    href: "/progress",
    icon: BarChart3,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

import Link from "next/link";
import { usePathname } from "next/navigation";
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
      {menus.map((menu) => {
      const Icon = menu.icon;
      const pathname = usePathname();
      return (
      <Link
        href={menu.href}
        key={menu.title}
        className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition ${
        pathname === menu.href
        ? "bg-slate-800 text-white"
        : "hover:bg-slate-800 text-slate-300"
        }`}
        >
        <Icon size={18} />
        {menu.title}
      </Link>
      );
      })}
      </nav>
    </aside>
  );
}