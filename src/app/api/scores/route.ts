import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";

export async function GET() {
  try {
    const scoresRef = collection(firestore, "scores");
    const scoresSnapshot = await getDocs(scoresRef);
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
