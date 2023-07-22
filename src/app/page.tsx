"use client";

import type { NextPage } from "next";
import Head from "next/head";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [scores, setScores] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, gamesResponse, scoresResponse] =
          await Promise.all([
            fetch("/api/users"),
            fetch("/api/games"),
            fetch("/api/scores"),
          ]);

        const usersData = await usersResponse.json();
        const gamesData = await gamesResponse.json();
        const scoresData = await scoresResponse.json();

        setUsers(usersData);
        setGames(gamesData);
        setScores(scoresData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>title</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>list of users</h1>
        {loading ? (
          <p>loading</p>
        ) : (
          <div className={styles.grid}>
            {users.map((user) => {
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
  );
};
export default Home;
