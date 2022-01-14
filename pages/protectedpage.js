import { getSession } from "next-auth/react";
import React from "react";
function protectedpage() {
  return (
    <div>
      <h1>Protected Page</h1>
    </div>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    context.res.writeHead(302, { Location: "/" });
    context.res.end();
    return {};
  }
  return {
    props: {
      user: session.user,
    },
  };
}
export default protectedpage;
