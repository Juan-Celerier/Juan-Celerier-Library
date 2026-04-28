import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { ToastType } from "../../components/common/Toast";
import Toast from "../../components/common/Toast";

interface Notification {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface NotificationContextType {
  showNotification: (
    message: string,
    type: ToastType,
    duration?: number,
  ) => void;
  hideNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (
    message: string,
    type: ToastType,
    duration = 5000,
  ) => {
    const id = Date.now().toString();
    const notification: Notification = {
      id,
      message,
      type,
      duration,
    };

    setNotifications((prev) => [...prev, notification]);

    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(() => {
        hideNotification(id);
      }, duration);
    }
  };

  const hideNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, hideNotification }}
    >
      {children}
      {/* Render toasts */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={notification.id}
            style={{
              transform: `translateY(${index * 10}px)`,
              zIndex: 50 - index,
            }}
          >
            <Toast
              message={notification.message}
              type={notification.type}
              onClose={() => hideNotification(notification.id)}
              duration={0}
            />
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
