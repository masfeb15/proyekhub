import AppLayout from "@/components/layout/AppLayout";
import DashboardCard from "@/components/dashboard/DashboardCard";

export default function DashboardPage() {
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
    </AppLayout>
  );
}