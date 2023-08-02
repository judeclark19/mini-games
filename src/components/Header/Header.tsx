"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/clientApp";
import { HeaderContent, StyledHeader } from "./Header.styles";

function Header() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  useEffect(() => {
    // Set up the onAuthStateChanged listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      if (user) {
        // User is signed in
        setLoggedInUser(user);
      } else {
        // User is signed out
        setLoggedInUser(null);
      }
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <StyledHeader>
      <HeaderContent>
        <h1>Mini Games</h1>
        <div>
          {/* the right */}
          <div>
            {loggedInUser
              ? `Logged in as ${loggedInUser.email}`
              : `Playing as Guest`}
          </div>
        </div>
        {/* {loggedInUser && (
        <StyledHeader>Logged in as {loggedInUser.email}</StyledHeader>
      )} */}
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
