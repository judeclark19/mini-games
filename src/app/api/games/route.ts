import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp"; // Your Firebase configuration import
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const gamesRef = collection(firestore, "games");
    const gamesSnapshot = await getDocs(gamesRef);
    const games = gamesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(games), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST new game

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const gamesRef = collection(firestore, "games");

    await addDoc(gamesRef, body);

    return new Response(JSON.stringify({ success: "game added", body }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating new game:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
