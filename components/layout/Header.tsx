export default function Header() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8">
      <h1 className="text-xl font-bold">
        Dashboard
      </h1>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-300" />

        <div>
          <p className="font-medium">
            Admin
          </p>

          <p className="text-sm text-slate-500">
            admin@proyekhub.id
          </p>
        </div>
      </div>
    </header>
  );
}