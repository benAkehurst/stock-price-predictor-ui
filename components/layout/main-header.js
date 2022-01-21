import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import classes from "./main-header.module.css";

function MainHeader() {
  const { data: session } = useSession();
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Stock Price Predictor</Link>
      </div>
      <div className={classes.navLinks}>
        <nav className={classes.navigation}>
          {session ? (
            <button className={classes.button}>
              <Link href="/myaccount">My Account</Link>
            </button>
          ) : null}
        </nav>
        {session ? (
          <div>
            <button className={classes.button} onClick={() => signOut()}>
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <button className={classes.button} onClick={() => signIn()}>
              Sign in
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default MainHeader;
