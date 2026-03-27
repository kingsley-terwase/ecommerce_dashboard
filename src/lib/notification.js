/** @type {import('@/types/global.d').NotificationAPI | null} */
let notifier = null;

/**
 * Called by the provider to register the API
 * @param {import('@/types/global.d').NotificationAPI} api
 */
export function setNotifier(api) {
  notifier = api;
}

export const notification = {
  /**
   * @param {import('@/types/global.d').Notification["message"]} message
   * @param {import('@/types/global.d').NotificationOptions} [options]
   */
  success(message, options) {
    notifier?.success(message, options);
  },

  /**
   * @param {import('@/types/global.d').Notification["message"]} message
   * @param {import('@/types/global.d').NotificationOptions} [options]
   */
  error(message, options) {
    notifier?.error(message, options);
  },

  /**
   * @param {import('@/types/global.d').Notification["message"]} message
   * @param {import('@/types/global.d').NotificationOptions} [options]
   */
  warning(message, options) {
    notifier?.warning(message, options);
  },

  /**
   * @param {import('@/types/global.d').Notification["message"]} message
   * @param {import('@/types/global.d').NotificationOptions} [options]
   */
  info(message, options) {
    notifier?.info(message, options);
  },

  /**
   * @param {import('@/types/global.d').Notification["message"]} message
   * @param {import('@/types/global.d').NotificationOptions} [options]
   */
  notify(message, options) {
    notifier?.notify(message, "info", options);
  },
};
