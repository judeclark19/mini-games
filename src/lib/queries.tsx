type Endpoint =
  | "/api/users"
  | "/api/games"
  | "/api/scores"
  | `/api/games/${string}`;

export const fetchData = async (endpoint: Endpoint) => {
  const response = await fetch(endpoint);
  const data = await response.json();
  return data;
};
