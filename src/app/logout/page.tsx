"use client";

import { signOutFirebase } from "@/firebase/clientApp";
import UserContext from "@/lib/UserContext";
import { useContext, useEffect } from "react";

function LogoutPage() {
  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    signOutFirebase();
    setLoggedInUser(null);
  }, []);

  return <div>You have been logged out</div>;
}

export default LogoutPage;
