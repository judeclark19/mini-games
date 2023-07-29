import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase"; // replace with path to your Firebase initialization script
import { UserDoc } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/queries";

function UsersList() {
  //   const [users, setUsers] = useState<UserDoc[]>([]);

  //   useEffect(() => {
  //     const unsubscribe = onSnapshot(
  //       collection(firestore, "users"),
  //       (snapshot) => {
  //         let users: UserDoc[] = [];
  //         snapshot.forEach((doc) => {
  //           users.push(doc.data() as UserDoc);
  //         });
  //         users.sort((a, b) => {
  //           const dateA = new Date(a.createdAt.seconds * 1000);
  //           const dateB = new Date(b.createdAt.seconds * 1000);
  //           return dateB.getTime() - dateA.getTime();
  //         });
  //         setUsers(users);
  //       }
  //     );

  //     // cleanup function - when the component unmounts, unsubscribe from the snapshot
  //     return () => unsubscribe();
  //   }, []);
  const users = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  console.log("users fetched", users.data);

  return (
    <div>
      {users.data
        .sort((a: UserDoc, b: UserDoc) => {
          const dateA = new Date(a.createdAt.seconds * 1000);
          const dateB = new Date(b.createdAt.seconds * 1000);
          return dateB.getTime() - dateA.getTime();
        })
        .map((user: UserDoc) => {
          const { username, email, id } = user;
          return (
            <div key={id}>
              <h2>{username}</h2>
              <p>{email}</p>
            </div>
          );
        })}
    </div>
  );
}

export default UsersList;
