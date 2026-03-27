import { useState, useCallback, useEffect } from "react";
import NotificationStack from "./NotificationStack";
import NotificationContext from "./NotificationContext";
import { setNotifier } from "@/lib/notification";

let nextId = 0;

/**
 * @param {{children: React.ReactNode}} props
 */
export default function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(
    /** @type {import('@/types/global.d').Notification[]} */ ([]),
  );

  /**
   * Remove a notification by ID
   * @param {number} id
   */
  const remove = useCallback((/** @type {import("@/types/global.d").Notification["id"]} */ id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    /**
     * @param {string} message
     * @param {import('@/types/global.d').NotificationVariant} variant
     * @param {import('@/types/global.d').NotificationOptions} [options]
     */
    (message, variant = "info", options = {}) => {
      const { duration = 4000, priority = 0 } = options;

      const notification = {
        id: ++nextId,
        message,
        variant,
        duration,
        priority,
      };

      setNotifications((prev) => {
        const newArray = [...prev, notification];
        newArray.sort((a, b) => (b.priority || 0) - (a.priority || 0) || b.id - a.id);
        return newArray;
      });
    },
    [],
  );

  /** @type {import('@/types/global.d').NotificationAPI} */
  const value = {
    notify,
    success: (msg, options) => notify(msg, "success", options),
    error: (msg, options) => notify(msg, "error", options),
    warning: (msg, options) => notify(msg, "warning", options),
    info: (msg, options) => notify(msg, "info", options),
  };

  useEffect(() => {
    setNotifier(value);
  }, [value]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationStack notifications={notifications} remove={remove} peekSize={3} />
    </NotificationContext.Provider>
  );
}
