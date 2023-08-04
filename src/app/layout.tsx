"use client";

import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import TanstackQuery from "./tanstackQuery";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useEffect, useState } from "react";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import UserContext from "@/lib/UserContext";

const inter = Inter({ subsets: ["latin"] });
const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     console.log("user", user); // console logs User object, all fields populated
  //     console.log("user.email", user?.email); // logs expected
  //     console.log("user.displayName", user?.displayName); // logs null (?????? why)

  //     setLoggedInUser(user);
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main>
          <StyledComponentsRegistry>
            <TanstackQuery>
              <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
                <Header />
                USER: {loggedInUser?.displayName}
                <div className="children">
                  <div>{children}</div>
                </div>
                <Footer />
              </UserContext.Provider>
            </TanstackQuery>
          </StyledComponentsRegistry>
        </main>
      </body>
    </html>
  );
}
