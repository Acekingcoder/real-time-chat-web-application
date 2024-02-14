import { Stack } from "react-bootstrap";
import avarter from "../../assets/avarter.svg";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNoticationsFunc } from "../../utils/unreadNotications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationAsRead } =
    useContext(ChatContext);

  const { latestMessage } = useFetchLatestMessage(chat);

  const unreadNotifications = unreadNoticationsFunc(notifications);

  console.log("unreadNotice", unreadNotifications);

  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );
  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }

    return shortText;
  };
  // console.log("Latest messages", latestMessage);
  // console.log("thisUserNotifications", thisUserNotifications);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length !== 0) {
          markThisUserNotificationAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avarter} height="35px" />
        </div>
        <div className="me-2">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">
            {latestMessage?.text && (
              <span>{truncateText(latestMessage?.text)}</span>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          {moment(latestMessage?.createdAt).calendar()}
        </div>
        <div
          className={
            thisUserNotifications?.length > 0 ? "this-user-notifications" : " "
          }
        ></div>
        <span className={isOnline ? "user-online" : ""}></span>
      </div>
    </Stack>
  );
};

export default UserChat;
