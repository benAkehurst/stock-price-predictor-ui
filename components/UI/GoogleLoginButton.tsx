import { signIn } from "next-auth/react";
import classes from "./GoogleLoginButton.module.css";

export default function GoogleLoginButton() {
  return (
    <button
      className={classes.googleLoginButton}
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </button>
  );
}
