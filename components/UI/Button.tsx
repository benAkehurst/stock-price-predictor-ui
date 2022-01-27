import Link from "next/link";

import classes from "./Button.module.css";

export type ButtonProps = {
  link?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: any;
};

function Button(props: ButtonProps) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
