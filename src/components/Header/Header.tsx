"use client";

import { useContext, useEffect, useState } from "react";
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
import ThreeDotsWave from "../ThreeDotsWave/ThreeDotsWave";

function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("loggedInUser changed", loggedInUser);
  }, [loggedInUser]);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        return onAuthStateChanged(auth, (user) => {
          console.log("auth state", auth);
          setLoggedInUser(user);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        console.log("Error setting session persistence:", error);
        setIsLoading(false);
      });
  }, []);

  const games = useQuery({
    queryKey: ["games"],
    queryFn: () => {
      return fetchData("/api/games");
    },
  });

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
          <div style={{ border: "2px solid red", minWidth: "230px", display: "flex", justifyContent: "end" }}>
            <Dropdown
              data={loggedInUser ? userOptions : guestOptions}
              promptText={
                <LoggedInUser $isLoggedIn={!!loggedInUser}>
                  {isLoading && <ThreeDotsWave />}
                  {!isLoading && loggedInUser && (
                    <>
                      Logged in as <span>{loggedInUser.displayName}</span>
                    </>
                  )}
                  {!isLoading && !loggedInUser && (
                    <>Playing as <span>Guest</span>
                    </>
                  )}
                </LoggedInUser>
              }
            />
          </div>
        </HeaderRight>
      </HeaderContent>
    </StyledHeader>
  );
}

export default Header;
