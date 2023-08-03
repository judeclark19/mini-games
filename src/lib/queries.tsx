import {
  signInWithEmail,
  signInWithGoogle,
  signUpWithEmail,
} from "@/firebase/clientApp";

type Endpoint =
  | "/api/users"
  | "/api/games"
  | "/api/scores"
  | `/api/users/${string}`
  | `/api/games/${string}`
  | `/api/scores/${string}`;

export const fetchData = async (endpoint: Endpoint) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};

export const registerGoogle = async () => {
  return await signInWithGoogle();
};

export const registerEmail = async ({
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

export const loginEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return await signInWithEmail(email, password);
};
