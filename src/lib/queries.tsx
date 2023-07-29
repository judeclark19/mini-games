export const fetchUsers = async () => {
  const response = await fetch("/api/users");
  const data = await response.json();
  return data;
};

export const fetchGames = async () => {
  const response = await fetch("/api/games");
  const data = await response.json();
  return data;
};

export const fetchGamesById = async (gameId: string) => {
  const response = await fetch(`/api/games/${gameId}`);
  const data = await response.json();
  return data;
};

export const fetchAllScores = async () => {
  const response = await fetch("/api/scores");
  const data = await response.json();
  return data;
};

export const fetchScoresByUserId = async (userId: string) => {
  const response = await fetch(`/api/scores/${userId}`);
  const data = await response.json();
  return data;
};
