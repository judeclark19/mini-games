"use client";

import { User, onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth, signOutFirebase } from "@/firebase/clientApp";
import {
  HeaderContent,
  HeaderLeft,
  HeaderRight,
  LoggedInUser,
  StyledHeader,
} from "./Header.styles";
import GamesListDropdown from "./GamesListDropdown";
import Link from "next/link";
import UserContext from "@/lib/UserContext";

function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

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
            {/* username here */}
            {loggedInUser ? (
              <>
                Logged in as <span>{loggedInUser.displayName}</span>
              </>
            ) : (
              <>
                Playing as <span>Guest</span>
              </>
            )}
          </LoggedInUser>

          <Link
            onClick={() => {
              signOutFirebase();
              setLoggedInUser(null);
            }}
            href={loggedInUser ? "/" : "/login"}
            // href={"/"}
            className="actionButton"
          >
            {/* log out */}
            {loggedInUser ? "Log Out" : "Log In or Sign Up"}
          </Link>
        </HeaderRight>
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
