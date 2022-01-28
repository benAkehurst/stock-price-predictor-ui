import { Fragment, useContext } from "react";

import MainHeader from "./MainHeader";
import Notification from "../UI/Notification";
import NotificationContext from "../../store/NotificationContext";

export type LayoutProps = {
  children: React.ReactNode;
};

function Layout(props: LayoutProps) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
