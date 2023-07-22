import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { NextRequest } from "next/server";

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

// POST new score

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const scoresRef = collection(firestore, "scores");

    addDoc(scoresRef, { ...body, createdAt: new Date() })
      .then((docRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    return new Response(JSON.stringify({ success: "score added", body }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating new game:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
