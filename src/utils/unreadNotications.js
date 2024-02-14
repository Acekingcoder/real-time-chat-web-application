export const unreadNoticationsFunc = (notifications) => {
  return notifications.filter((n) => n.isRead === false);
};
