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
import { DropdownType, GameDoc } from "@/lib/types";

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
   console.log('games', games.data)

  const gamesOptions: DropdownType[] = games.data?.map((game: GameDoc) => ({
    title: game.title,
    id: game.id,
    href: `/games/${game.slug}`,
  }));

  const guestOptions: DropdownType[] = [
    {
      id: "login",
      title: "Log In",
      href: "/login",
    },
    {
      id: "signup",
      title: "Sign Up",
      href: "/signup",
    },
  ];

  const userOptions: DropdownType[] = [
    {
      id: "view-profile",
      title: "View Profile",
      href: "/profile",
    },
    {
      id: "edit-profile",
      title: "Edit Profile",
      href: "/profile/edit",
    },
    {
      id: "logout",
      title: "Log Out",
      href: "/logout",
    },
  ];

  return (
    <StyledHeader>
      <HeaderContent>
        <HeaderLeft>
          <h1>
            <Link href="/">Mini Games</Link>
          </h1>
          <h3>An exercise in TypeScript and Next.js v13</h3>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            data={gamesOptions}
            promptText={<span>Choose a game</span>}
          />
          <Dropdown
            data={loggedInUser ? userOptions : guestOptions}
            promptText={
              <LoggedInUser $isLoggedIn={!!loggedInUser}>
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
            }
          />
        </HeaderRight>
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
