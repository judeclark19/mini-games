import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { NextApiRequest } from "next";

export async function GET(
  _: NextApiRequest,
  { params }: { params: { id: string } }
) {
  try {
    const gameRef = doc(firestore, "games", params.id);
    const gameSnapshot = await getDoc(gameRef);
    if (gameSnapshot.exists()) {
      const gameData = gameSnapshot.data();

      return new Response(
        JSON.stringify({ id: gameSnapshot.id, ...gameData }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Game with the given ID does not exist" }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error fetching data:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
