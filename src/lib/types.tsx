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
};

export type ScoreDoc = {
  userId: string;
  gameId: string;
  score: number;
  id: string;
};
