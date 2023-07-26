import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/clientApp"; // Your Firebase configuration import
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userRef = doc(firestore, "users", params.id);
    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      //   return { id: userSnapshot.id, ...userData };
      return new Response(
        JSON.stringify({ id: userSnapshot.id, ...userData }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return null; // User with the given ID does not exist
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    // return { error: "Internal server error" };
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}
