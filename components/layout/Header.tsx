export default function Header() {
  return (
    <header className="bg-white h-16 shadow px-8 flex items-center justify-between">
      <div>
        <h2 className="font-bold text-xl">
          Dashboard
        </h2>

        <p className="text-gray-500 text-sm">
          Welcome to ProyekHub
        </p>
      </div>

      <div className="font-medium">
        Admin
      </div>
    </header>
  );
}