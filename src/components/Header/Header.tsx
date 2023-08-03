"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/firebase/clientApp";
import {
  HeaderContent,
  HeaderLeft,
  HeaderRight,
  LoggedInUser,
  LoginButton,
  StyledHeader,
} from "./Header.styles";
import GamesListDropdown from "./GamesListDropdown";
import Link from "next/link";

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
        <HeaderLeft>
          <h1>Mini Games</h1>
          <h3>An exercise in TypeScript and Next.js v13</h3>
        </HeaderLeft>
        <HeaderRight>
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
          {!loggedInUser && (
            <Link href={`/login`} className="actionButton">
              Log In or Sign Up
            </Link>
          )}
        </HeaderRight>
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
