import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { NextApiRequest } from "next";

export async function GET(
  request: NextApiRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const scoresRef = collection(firestore, "scores");
    const q = query(scoresRef, where("userId", "==", params.userId));
    const scoresSnapshot = await getDocs(q);
    const scores = scoresSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(scores), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
