import React, { useEffect } from "react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";

export type NotificationType = "success" | "error" | "info" | "warning";

export interface ToastProps {
  id: string;
  message: string;
  type: NotificationType;
  onClose: (id: string) => void;
  duration?: number;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    bgColor: "bg-success/10",
    textColor: "text-success",
    borderColor: "border-success",
    closeButtonColor: "hover:bg-success/20",
  },
  error: {
    icon: AlertCircle,
    bgColor: "bg-error/10",
    textColor: "text-error",
    borderColor: "border-error",
    closeButtonColor: "hover:bg-error/20",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-warning/10",
    textColor: "text-warning",
    borderColor: "border-warning",
    closeButtonColor: "hover:bg-warning/20",
  },
  info: {
    icon: Info,
    bgColor: "bg-info/10",
    textColor: "text-info",
    borderColor: "border-info",
    closeButtonColor: "hover:bg-info/20",
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const config = typeConfig[type];
  const IconComponent = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  return (
    <div
      className={`animate-fade-up flex items-center gap-md px-lg py-md rounded-base border ${config.bgColor} ${config.borderColor} shadow-subtle backdrop-blur-sm`}
      role="alert"
      aria-live="polite"
    >
      <IconComponent className={`h-5 w-5 flex-shrink-0 ${config.textColor}`} />
      <p className={`flex-1 text-body-sm font-medium ${config.textColor}`}>
        {message}
      </p>
      <button
        onClick={() => onClose(id)}
        className={`flex-shrink-0 p-1 rounded transition-colors duration-200 ${config.textColor} ${config.closeButtonColor}`}
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export interface ToastContainerProps {
  toasts: ToastProps[];
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = "top-right",
}) => {
  const positionClasses = {
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  };

  return (
    <div
      className={`fixed ${positionClasses[position]} z-[9999] w-full max-w-xs space-y-sm pointer-events-none`}
      role="region"
      aria-label="Notificaciones"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
};
