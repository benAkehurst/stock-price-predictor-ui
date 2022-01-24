import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import classes from "./MainHeader.module.css";
import GoogleLoginButton from "../UI/GoogleLoginButton";
import Button from "../UI/Button";

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
            <Button className={classes.button}>
              <Link href="/predictions">My Predictions</Link>
            </Button>
          ) : null}
        </nav>
        {session ? (
          <div>
            <Button className={classes.button} onClick={() => signOut()}>
              Sign out
            </Button>
          </div>
        ) : (
          <GoogleLoginButton />
        )}
      </div>
    </header>
  );
}

export default MainHeader;
