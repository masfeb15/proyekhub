import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import DashboardCard from "@/components/layout/DashboardCard";

export default function Dashboard() {
  return (
    <div className="flex bg-slate-100">
      <Sidebar />

      <main className="flex-1 min-h-screen">
        <Header />

        <div className="p-8 grid grid-cols-4 gap-6">
          <DashboardCard
            title="Total Projects"
            value="12"
          />

          <DashboardCard
            title="On Track"
            value="9"
          />

          <DashboardCard
            title="Warning"
            value="2"
          />

          <DashboardCard
            title="Critical"
            value="1"
          />
        </div>
      </main>
    </div>
  );
}