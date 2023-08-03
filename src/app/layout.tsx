import StyledComponentsRegistry from "@/lib/registry";
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Nunito_Sans } from "next/font/google";
import TanstackQuery from "./tanstackQuery";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });
const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Games: Home",
  description: "A personal project of @judeclark19",
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
              <div className="children">
                <div>{children}</div>
              </div>
              <Footer />
            </TanstackQuery>
          </StyledComponentsRegistry>
        </main>
      </body>
    </html>
  );
}
