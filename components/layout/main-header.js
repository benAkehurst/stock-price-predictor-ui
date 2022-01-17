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
            Welcome user
            <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        ) : (
          <div>
            Click to sign into your user account <br />
            <button onClick={() => signIn()}>Sign in</button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default MainHeader;
