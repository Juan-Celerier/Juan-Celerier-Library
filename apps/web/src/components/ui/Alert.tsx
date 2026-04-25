import React from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export type AlertType = "info" | "success" | "warning" | "error";

export interface AlertProps {
  type: AlertType;
  title?: string;
  message: string;
  onDismiss?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

const alertConfig = {
  info: {
    icon: Info,
    bgColor: "bg-info/10",
    textColor: "text-info",
    borderColor: "border-info",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-success/10",
    textColor: "text-success",
    borderColor: "border-success",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-warning/10",
    textColor: "text-warning",
    borderColor: "border-warning",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-error/10",
    textColor: "text-error",
    borderColor: "border-error",
  },
};

/**
 * Componente Alert para mostrar mensajes y notificaciones
 */
export const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onDismiss,
  actions,
  className = "",
}) => {
  const config = alertConfig[type];
  const IconComponent = config.icon;

  return (
    <div
      className={`rounded-base border-l-4 flex gap-md p-lg ${config.bgColor} ${config.borderColor} ${className}`}
      role="alert"
    >
      <div className="flex-shrink-0">
        <IconComponent className={`h-5 w-5 ${config.textColor}`} />
      </div>

      <div className="flex-1">
        {title && (
          <h4
            className={`text-body-md font-semibold ${config.textColor} mb-xs`}
          >
            {title}
          </h4>
        )}
        <p className={`text-body-sm ${config.textColor} opacity-90`}>
          {message}
        </p>

        {actions && <div className="mt-md">{actions}</div>}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className={`flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors ${config.textColor}`}
          aria-label="Cerrar alerta"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

/**
 * Variantes predefinidas
 */

export const InfoAlert: React.FC<Omit<AlertProps, "type">> = (props) => (
  <Alert {...props} type="info" />
);

export const SuccessAlert: React.FC<Omit<AlertProps, "type">> = (props) => (
  <Alert {...props} type="success" />
);

export const WarningAlert: React.FC<Omit<AlertProps, "type">> = (props) => (
  <Alert {...props} type="warning" />
);

export const ErrorAlert: React.FC<Omit<AlertProps, "type">> = (props) => (
  <Alert {...props} type="error" />
);
