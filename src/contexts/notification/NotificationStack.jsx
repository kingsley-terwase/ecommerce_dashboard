import { useTheme } from "@mui/material";
import NotificationItem from "./NotificationItem";

/**
 * @param {object} props
 * @param {import('@/types/global.d').Notification[]} props.notifications
 * @param {function(number):void} props.remove
 * @param {number} props.peekSize
 */
export default function NotificationStack({ notifications, remove, peekSize = 3 }) {
  const theme = useTheme();

  return (
    <div className="notification-container" style={{ zIndex: theme.zIndex.modal + 1 }}>
      {notifications.map((n, index) => {
        const visibleIndex = Math.min(index, peekSize - 1);

        return (
          <NotificationItem
            key={n.id}
            notification={n}
            onClose={() => remove(n.id)}
            style={{
              transform: `translateY(${visibleIndex * 16}px) scale(${1 - visibleIndex * 0.04})`,
              zIndex: notifications.length - index,
              opacity: index >= peekSize ? 0.8 : 1,
            }}
          />
        );
      })}
    </div>
  );
}
