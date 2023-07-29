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
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, fetchGames } from "@/lib/queries";
import { GameDoc, UserDoc } from "@/lib/types";
import UserScoreList from "@/components/UserScoreList";
import UsersList from "@/components/UsersList";

const register = async ({
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

const Home: NextPage = () => {
  const queryClient = useQueryClient();

  const users = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  const newUser = useMutation(register, {
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
      <div className={styles.container}>
        <main className={styles.main}>
          {/* header */}
          <Header loggedInUser={loggedInUser} />
          <button onClick={signInWithGoogle}>Sign in with google</button>
          <>
            sign up with email
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const username = formData.get("username") as string;
                const email = formData.get("email") as string;
                const password = formData.get("password") as string;

                // signUpWithEmail(
                //   formData.get("username") as string,
                //   formData.get("email") as string,
                //   formData.get("password") as string
                // );
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
          {/* <h1>List of games</h1>
          {games.isLoading ? (
            <p>loading</p>
          ) : (
            <div className={styles.grid}>
              {games.data.map((game: GameDoc) => {
                const { title, id } = game;
                return (
                  <div key={id} className={styles.card}>
                    <h2>{title}</h2>
                  </div>
                );
              })}
            </div>
          )} */}
          {/* users */}
          <h1 className={styles.title}>list of users</h1>
          {users.isLoading ? (
            <p>loading</p>
          ) : (
            <UsersList />
            // <div className={styles.grid}>
            //   {users.data
            //     .sort((a: UserDoc, b: UserDoc) => {
            //       const dateA = new Date(a.createdAt.seconds * 1000);
            //       const dateB = new Date(b.createdAt.seconds * 1000);
            //       return dateB.getTime() - dateA.getTime();
            //     })
            //     .map((user: UserDoc) => {
            //       const { username, email, id } = user;
            //       return (
            //         <div key={id} className={styles.card}>
            //           <h2>{username}</h2>
            //           <p>{email}</p>
            //         </div>
            //       );
            //     })}
            // </div>
          )}
        </main>
      </div>
    </>
  );
};
export default Home;
