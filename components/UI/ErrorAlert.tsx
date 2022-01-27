import classes from "./ErrorAlert.module.css";

export type ErrorAlertProps = {
  children: React.ReactNode;
};

function ErrorAlert(props: ErrorAlertProps) {
  return <div className={classes.alert}>{props.children}</div>;
}

export default ErrorAlert;
