import { useNotification } from "@/contexts/notification";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

/**
 * @param {Object} props
 * @param {import("react").ReactNode} props.children
 */
export default function AuthMiddleware({ children }) {
  const { token } = useAuthStore.getState();
  const notify = useNotification();

  useEffect(() => {
    if (!token) {
      notify.info("Login to continue!");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
  }, [token, window.location.pathname]);

  return children;
}
