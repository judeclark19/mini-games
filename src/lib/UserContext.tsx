import { User } from "firebase/auth";
import { Dispatch, SetStateAction, createContext } from "react";

interface UserContextType {
  loggedInUser: User | null;
  setLoggedInUser: Dispatch<SetStateAction<User | null>>;
}

const defaultContext: UserContextType = {
  loggedInUser: null,
  setLoggedInUser: () => {},
};

const UserContext = createContext(defaultContext);

export default UserContext;
