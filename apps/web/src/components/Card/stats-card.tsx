import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  color: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  color,
}: StatCardProps) => {
  const isPositive = changeType === "positive";

  // Función simple para convertir 'text-color-500' a 'bg-color-500' con opacidad
  // Si usas Tailwind, esto es un truco rápido.
  const bgClass = color
    .replace("text-", "bg-")
    .replace("600", "100")
    .replace("500", "100");

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm border border-neutral-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`rounded-full p-3 ${bgClass} bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div
          className={`flex items-center text-sm font-medium ${isPositive ? "text-emerald-600" : "text-red-600"}`}
        >
          {isPositive ? (
            <TrendingUp className="mr-1 h-4 w-4" />
          ) : (
            <TrendingDown className="mr-1 h-4 w-4" />
          )}
          {change}
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-neutral-500">{title}</p>
        <h3 className="text-2xl font-bold text-neutral-900 mt-1">{value}</h3>
      </div>
    </div>
  );
};
