"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/clientApp";
import {
  HeaderContent,
  HeaderRight,
  LoggedInUser,
  LoginButton,
  StyledHeader,
} from "./Header.styles";
import GamesListDropdown from "./GamesListDropdown";

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
        <HeaderRight>
          {/* the right */}
          <GamesListDropdown />
          <LoggedInUser>
            {loggedInUser ? (
              `Logged in as ${loggedInUser.email}`
            ) : (
              <>
                Playing as <span>Guest</span>
              </>
            )}
          </LoggedInUser>
          {!loggedInUser && <LoginButton>Log In or Sign Up</LoginButton>}
        </HeaderRight>
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
