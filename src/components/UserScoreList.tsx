import { fetchGamesById, fetchScoresByUserId } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function UserScoreList({ userId }: { userId: string }) {
  const scores = useQuery({
    queryKey: ["scores", userId],
    queryFn: () => fetchScoresByUserId(userId),
  });

  return (
    <div>
      <h1>Score List</h1>
      {scores.isLoading && <p>loading</p>}
      {scores.data && scores.data.length > 0 && (
        <div>
          {scores.data.map((score: any) => {
            const { score: scoreValue, id } = score;
            return (
              <div key={id}>
                <p>Game: {score.gameId}</p>
                <p>Score: {scoreValue}</p>
              </div>
            );
          })}
        </div>
      )}

      {scores.data && scores.data.length === 0 && (
        <p>This user has not played any games</p>
      )}
    </div>
  );
}

export default UserScoreList;
