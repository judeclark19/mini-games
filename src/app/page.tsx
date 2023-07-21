"use client";

import type { NextPage } from "next";
import Head from "next/head";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

import { firestore } from "../../firebase/clientApp";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const usersCollection = collection(firestore, "users");
const gamesCollection = collection(firestore, "games");
const scoresCollection = collection(firestore, "scores");

const Home: NextPage = () => {
  const [users, setUsers] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [games, setGames] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [scores, setScores] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    const usersQuery = query(usersCollection);
    const gamesQuery = query(gamesCollection);
    const scoresQuery = query(scoresCollection);

    const usersSnapshot = await getDocs(usersQuery);
    const gamesSnapshot = await getDocs(gamesQuery);
    const scoresSnapshot = await getDocs(scoresQuery);

    const usersResult: QueryDocumentSnapshot<DocumentData>[] = [];
    usersSnapshot.forEach((snapshot) => {
      usersResult.push(snapshot);
    });
    setUsers(usersResult);

    const gamesResult: QueryDocumentSnapshot<DocumentData>[] = [];
    gamesSnapshot.forEach((snapshot) => {
      gamesResult.push(snapshot);
    });
    console.log("gmaesresult", gamesResult[0].data());
    setGames(gamesResult);

    const scoresResult: QueryDocumentSnapshot<DocumentData>[] = [];
    scoresSnapshot.forEach((snapshot) => {
      scoresResult.push(snapshot);
    });
    console.log("scoresresult", scoresResult[0].data());
    setScores(scoresResult);
  };

  useEffect(() => {
    getData();
    // reset loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Todos app</title>
        <meta name="description" content="Next.js firebase todos app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>list of users</h1>

        <div className={styles.grid}>
          {loading ? (
            <div className={styles.card}>
              <h2>Loading</h2>
            </div>
          ) : users.length === 0 ? (
            <div className={styles.card}>
              <h2>No users</h2>
            </div>
          ) : (
            users.map((user) => {
              const { username, email } = user.data();
              return (
                // <p key={user.id}>{username}</p>
                <div key={user.id} className={styles.card}>
                  <h2>{username}</h2>
                  <p>{email}</p>
                  <h3>Scores:</h3>
                  <ul>
                    {scores.map((score) => {
                      const { userId, gameId, score: userScore } = score.data();
                      if (userId === user.id) {
                        return (
                          <li key={score.id}>
                            <p>
                              Game:{" "}
                              {
                                // find the game name by id
                                games.find((game) => game.id === gameId)?.data()
                                  .title
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
            })
          )}
        </div>
      </main>
    </div>
  );
};
export default Home;
