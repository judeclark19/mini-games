import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import TanstackQuery from "./tanstackQuery";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ["latin"] });
const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PROJECT",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunitoSans.className}>
        <main>
          <StyledComponentsRegistry>
            <TanstackQuery>
              <Header />
              {children}
            </TanstackQuery>
          </StyledComponentsRegistry>
        </main>
      </body>
    </html>
  );
}
