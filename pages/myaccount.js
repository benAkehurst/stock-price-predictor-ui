import React from 'react';
import { useSession } from 'next-auth/react';
function Profile() {
  const { data: session } = useSession();
  if (!session) {
    return <p>You are not logged in.</p>;
  }
  return <h1>My Account</h1>;
}
export default Profile;
