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
import { useQuery } from "@tanstack/react-query";

const Home: NextPage = () => {
  // const [users, setUsers] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const users = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      return data;
    },
  });

  type User = {
    id: string;
    username: string;
    email: string;
  };

  console.log("new console log", users.data);

  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  useEffect(() => {
    // Set up the onAuthStateChanged listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const [
  //         // usersResponse,
  //         gamesResponse,
  //         scoresResponse,
  //       ] = await Promise.all([
  //         // fetch("/api/users"),
  //         fetch("/api/games"),
  //         fetch("/api/scores"),
  //       ]);

  //       // const usersData = await usersResponse.json();
  //       const gamesData = await gamesResponse.json();
  //       const scoresData = await scoresResponse.json();

  //       // setUsers(usersData);
  //       setGames(gamesData);
  //       setScores(scoresData);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          {/* <Header loggedInUser={loggedInUser} /> */}
          <button onClick={signInWithGoogle}>Sign in with google</button>
          <>
            sign up
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);

                signUpWithEmail(
                  formData.get("username") as string,
                  formData.get("email") as string,
                  formData.get("password") as string
                );
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
          {users.isLoading ? (
            <p>loading</p>
          ) : (
            <div className={styles.grid}>
              {users.data.map((user: User) => {
                const { username, email } = user;
                return (
                  // <p key={user.id}>{username}</p>
                  <div key={user.id} className={styles.card}>
                    <h2>{username}</h2>
                    <p>{email}</p>
                    <h3>Scores:</h3>
                    <ul>
                      {scores.map((score) => {
                        const { userId, gameId, score: userScore } = score;
                        if (userId === user.id) {
                          return (
                            <li key={score.id}>
                              <p>
                                Game:
                                {
                                  // find the game name by id
                                  games.find((game) => game.id === gameId).title
                                }
                              </p>
                              <p>Score: {userScore}</p>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
};
export default Home;
