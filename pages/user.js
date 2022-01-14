import React from "react";
import { useSession } from "next-auth/react";
function user() {
  const { data: session } = useSession();
  if (!session) {
    return <p>You are not logged in.</p>;
  }
  return <h1>you are logged in</h1>;
}
export default user;
