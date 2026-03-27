import {
  CheckmarkCircleRegular,
  InfoRegular,
  WarningRegular,
  DismissRegular,
  ErrorCircleRegular,
} from "@fluentui/react-icons";

/**
 * @param {object} props
 * @param {import('@/types/global.d').Notification} props.notification
 * @param {function():void} props.onClose
 * @param {React.CSSProperties} props.style
 */
export default function NotificationItem({ notification, onClose, style }) {
  const { message, variant } = notification;

  const icons = {
    success: <CheckmarkCircleRegular />,
    error: <ErrorCircleRegular />,
    warning: <WarningRegular />,
    info: <InfoRegular />,
  };

  return (
    <div className={`notification notification-${variant}`} style={style}>
      <div className="notification-left">
        <div className={`notification-icon notification-icon-${variant}`}>{icons[variant]}</div>

        <div className="notification-text">
          <span className={`notification-tag notification-tag-${variant}`}>{variant}</span>
          <span className="notification-message">{message}</span>
        </div>
      </div>

      <button className="notification-close" onClick={onClose}>
        <DismissRegular />
      </button>
    </div>
  );
}
