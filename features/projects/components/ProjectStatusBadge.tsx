type Props = {
  status: string;
};

export default function ProjectStatusBadge({
  status,
}: Props) {
  const colors: Record<string, string> = {
    RUNNING: "bg-green-100 text-green-700",

    TENDER: "bg-yellow-100 text-yellow-700",

    COMPLETED: "bg-blue-100 text-blue-700",

    DRAFT: "bg-gray-100 text-gray-700",

    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        colors[status] ??
        "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}