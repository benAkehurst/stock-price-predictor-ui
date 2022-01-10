import Link from "next/link";

import classes from "./main-header.module.css";

function MainHeader() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Stock Price Predictor</Link>
      </div>
      <nav className={classes.navigation}></nav>
    </header>
  );
}

export default MainHeader;
