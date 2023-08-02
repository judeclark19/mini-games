import { Timestamp } from "firebase/firestore";

export type UserDoc = {
  username: string;
  email: string;
  id: string;
  createdAt: Timestamp;
};

export type GameDoc = {
  title: string;
  id: string;
  slug: string;
};

// I wrote these out because otherwise I don't know how I would get the game title onto the SingleGamePage metadata because a page with metadata can't fetch
export const gameSlugToId: Record<string, string> = {
  "tic-tac-toe": "J2yPhZKiOLvCURWabmyw",
  "memory-match": "XLQjMj0LqJwH6KWpOvM8",
  "rock-paper-scissors": "lFwTdlfwWdowEhE3MWq4",
  "2048": "tEtb87IGDXfMVdH6akJ9",
};

export const gameSlugToTitle: Record<string, string> = {
  "tic-tac-toe": "Tic Tac Toe",
  "memory-match": "Memory Match",
  "rock-paper-scissors": "Rock Paper Scissors",
  "2048": "2048",
};

export type ScoreDoc = {
  userId: string;
  gameId: string;
  score: number;
  id: string;
};
