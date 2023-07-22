import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp";
import { NextApiRequest } from "next";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const usersRef = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersRef);
    const users = usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return new Response(JSON.stringify(users), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST new user

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);
    const usersRef = collection(firestore, "users");

    addDoc(usersRef, { ...body, createdAt: new Date() })
      .then((docRef) => {
        console.log("Document has been added successfully");
      })
      .catch((error) => {
        console.log(error);
      });

    return new Response(JSON.stringify({ success: "user added", body }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating new user:", error);

    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
