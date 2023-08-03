import { UserDoc } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "@/lib/queries";

function UsersList() {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return fetchData("/api/users");
    },
  });

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
