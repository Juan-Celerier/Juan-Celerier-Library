import {
  type LucideIcon,
  TrendingUp,
  TrendingDown,
  ArrowRight,
} from "lucide-react";

export interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  color: string; // Recibirá 'blue', 'green', 'orange', 'red' (desde el apiClient)
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
  const isNegative = changeType === "negative";

  // Definimos los estilos según el color que viene de las stats
  const colorVariants: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-100/50",
    green: "bg-emerald-50 text-emerald-600 border-emerald-100/50",
    orange: "bg-amber-50 text-amber-600 border-amber-100/50",
    red: "bg-rose-50 text-rose-600 border-rose-100/50",
    neutral: "bg-gray-50 text-gray-600 border-gray-100/50",
  };

  // Seleccionamos la variante o usamos neutral por defecto
  const activeVariant = colorVariants[color] || colorVariants.neutral;

  const indicatorColor = isPositive
    ? "text-emerald-600 bg-emerald-50"
    : isNegative
      ? "text-rose-600 bg-rose-50"
      : "text-neutral-500 bg-neutral-50";

  const iconForChange = isPositive ? (
    <TrendingUp className="h-3.5 w-3.5" />
  ) : isNegative ? (
    <TrendingDown className="h-3.5 w-3.5" />
  ) : (
    <ArrowRight className="h-3.5 w-3.5" />
  );

  return (
    <div className="group relative overflow-hidden rounded-[1.5rem] bg-white p-6 shadow-sm border border-neutral-100 hover:shadow-xl hover:shadow-neutral-200/40 transition-all duration-300 hover:-translate-y-1">
      {/* Decoración sutil de fondo al hacer hover */}
      <div
        className={`absolute -right-4 -top-4 h-24 w-24 rounded-full opacity-0 group-hover:opacity-10 transition-opacity ${activeVariant.split(" ")[0]}`}
      />

      <div className="relative flex items-start justify-between mb-6">
        {/* Contenedor del Icono */}
        <div className={`rounded-2xl p-3 border ${activeVariant}`}>
          <Icon className="h-6 w-6" />
        </div>

        {/* Badge de tendencia */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase tracking-tight border border-current border-opacity-10 ${indicatorColor}`}
        >
          {iconForChange}
          {change}
        </div>
      </div>

      <div className="relative">
        <p className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
          {title}
        </p>
        <div className="flex items-baseline gap-2 mt-1">
          <h3 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
            {value}
          </h3>
          {/* Opcional: un pequeño texto descriptivo si lo necesitas */}
        </div>
      </div>
    </div>
  );
};
