"use client";

import { useContext, useEffect } from "react";
import { auth, signOutFirebase } from "@/firebase/clientApp";
import {
  HeaderContent,
  HeaderLeft,
  HeaderRight,
  LoggedInUser,
  StyledHeader,
} from "./Header.styles";
import Link from "next/link";
import UserContext from "@/lib/UserContext";
import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
} from "firebase/auth";
import Dropdown from "../Dropdown/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/queries";
import { GameDoc } from "@/lib/types";

function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  console.log("loggedInUser", loggedInUser);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Local persistence enabled");

        return onAuthStateChanged(auth, (user) => {
          setLoggedInUser(user);
        });
      })
      .catch((error) => {
        console.log("Error setting session persistence:", error);
      });
  }, []);

  const games = useQuery({
    queryKey: ["games"],
    queryFn: () => {
      return fetchData("/api/games");
    },
  });

  const gamesOptions = games.data?.map((game: GameDoc) => ({
    ...game,
    href: `/games/${game.id}`,
  }));

  return (
    <StyledHeader>
      <HeaderContent>
        <HeaderLeft>
          <h1>Mini Games</h1>
          <h3>An exercise in TypeScript and Next.js v13</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown data={gamesOptions} promptText="Choose a game" />
          <LoggedInUser>
            {loggedInUser ? (
              <>
                Logged in as <Link href="/">{loggedInUser.displayName}</Link>
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
            className="actionButton"
          >
            {loggedInUser ? "Log Out" : "Log In or Sign Up"}
          </Link>
        </HeaderRight>
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
