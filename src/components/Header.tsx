import { User } from "firebase/auth";
import React from "react";

function Header({ loggedInUser }: { loggedInUser: User }) {
  return <>{loggedInUser && <h1>Logged in as {loggedInUser.email}</h1>}</>;
}

export default Header;
