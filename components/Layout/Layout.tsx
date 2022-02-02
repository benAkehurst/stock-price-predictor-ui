import { Fragment, useContext } from "react";
import classes from "./Layout.module.css";
import MainHeader from "./MainHeader";
import NotificationElement from "../UI/NotificationElement";
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
        <div className={classes.notificationWrapper}>
          <NotificationElement
            title={activeNotification.title}
            message={activeNotification.message}
            status={activeNotification.status}
          />
        </div>
      )}
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
