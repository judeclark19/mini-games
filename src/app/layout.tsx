"use client";

import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import { Inter, Nunito_Sans } from "next/font/google";
import TanstackQuery from "./tanstackQuery";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useState } from "react";
import { User } from "firebase/auth";
import UserContext from "@/lib/UserContext";

const inter = Inter({ subsets: ["latin"] });
const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main>
          <StyledComponentsRegistry>
            <TanstackQuery>
              <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
                <Header />
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
