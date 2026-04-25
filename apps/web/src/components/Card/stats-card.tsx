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
    <div className="rounded-lg bg-white px-lg py-md shadow-subtle border border-neutral-200 hover:shadow-medium transition-all duration-200">
      <div className="flex items-center justify-between gap-md mb-md">
        <div className={`rounded-base p-md ${bgClass} bg-opacity-20`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div
          className={`flex items-center text-body-sm font-medium gap-xs ${isPositive ? "text-success" : "text-error"}`}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {change}
        </div>
      </div>
      <div>
        <p className="text-body-sm font-medium text-neutral-500">{title}</p>
        <h3 className="text-heading-md font-bold text-neutral-900 mt-md">
          {value}
        </h3>
      </div>
    </div>
  );
};
