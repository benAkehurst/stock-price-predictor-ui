import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import classes from './main-header.module.css';

function MainHeader() {
  const { data: session } = useSession();
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link href="/">Stock Price Predictor</Link>
      </div>
      <nav className={classes.navigation}>
        {session ? (
          <div>
            <Link href="/myaccount">My Account</Link>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div>
            Sign In - <button onClick={() => signIn()}>Sign in</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default MainHeader;
