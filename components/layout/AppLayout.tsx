import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-slate-100">
      <Sidebar />

      <main className="flex-1 min-h-screen">
        <Header />

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}