import { useContext } from "react";
import { Notification } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import NotificationContext from "../../store/NotificationContext";

export type NotificationProps = {
  title: string;
  message: string;
  status: string;
};

function NotificationElement(props: NotificationProps) {
  const notificationCtx = useContext(NotificationContext);

  const { title, message, status } = props;

  switch (status) {
    case "success":
      return (
        <Notification
          icon={<FontAwesomeIcon icon={faCheckCircle} />}
          color="teal"
          title={title}
          onClose={notificationCtx.hideNotification}
        >
          {message}
        </Notification>
      );
    case "error":
      return (
        <Notification
          icon={<FontAwesomeIcon icon={faTimesCircle} />}
          color="red"
          title={title}
          onClose={notificationCtx.hideNotification}
        >
          {message}
        </Notification>
      );
    case "pending":
      return (
        <Notification
          loading
          title={title}
          disallowClose
          onClose={notificationCtx.hideNotification}
        >
          {message}
        </Notification>
      );
    default:
      break;
  }
}

export default NotificationElement;
