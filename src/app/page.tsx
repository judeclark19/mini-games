"use client";

import type { NextPage } from "next";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {
  signInWithGoogle,
  signUpWithEmail,
  signOutFirebase,
  auth,
  signInWithEmail,
} from "@/firebase/clientApp";
import Header from "@/components/Header";
import { User, onAuthStateChanged } from "firebase/auth";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, fetchGames } from "@/lib/queries";
import UsersList from "@/components/UsersList";

const registerEmail = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  return await signUpWithEmail(username, email, password);
};

const registerGoogle = async () => {
  return await signInWithGoogle();
};

const Home: NextPage = () => {
  const queryClient = useQueryClient();

  const users = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const newUser = useMutation(registerEmail, {
    onSuccess: () => {
      console.log("SUCCESS");
      queryClient.invalidateQueries(["users"]);
    },
  });

  const newGoogleUser = useMutation(registerGoogle, {
    onSuccess: () => {
      console.log("SUCCESS");
      queryClient.invalidateQueries(["users"]);
    },
  });

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
    <>
      landing page
      {/* <Header loggedInUser={loggedInUser} />
      <button
        onClick={() => {
          newGoogleUser.mutate();
        }}
      >
        Sign in with google
      </button>
      <>
        sign up with email
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const username = formData.get("username") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            newUser.mutate({ username, email, password });
          }}
        > <Header loggedInUser={loggedInUser} />
      <button
        onClick={() => {
          newGoogleUser.mutate();
        }}
      >
        Sign in with google
      </button>
      <>
        sign up with email
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const username = formData.get("username") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            newUser.mutate({ username, email, password });
          }}
        >
          <input type="text" placeholder="username" name="username" />
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit">submit</button>
        </form>
        log in
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            signInWithEmail(
              formData.get("email") as string,
              formData.get("password") as string
            );
          }}
        >
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit">submit</button>
        </form>
        <button onClick={signOutFirebase}>Sign out</button>
      </>

      <h1 className={styles.title}>list of users</h1>
      {users.isLoading ? <p>loading</p> : <UsersList />}
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);

            signInWithEmail(
              formData.get("email") as string,
              formData.get("password") as string
            );
          }}
        >
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button type="submit">submit</button>
        </form>
        <button onClick={signOutFirebase}>Sign out</button>
      </>

      <h1 className={styles.title}>list of users</h1>
      {users.isLoading ? <p>loading</p> : <UsersList />} */}
    </>
  );
};
export default Home;
