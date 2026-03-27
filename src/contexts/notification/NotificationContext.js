import { createContext } from "react";

const NotificationContext = createContext(
  /** @type {import('@/types/global.d').NotificationAPI | null} */ (null),
);

export default NotificationContext;
