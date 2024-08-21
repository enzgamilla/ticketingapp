import { Card, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import { useSession } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  return (
    <html lang="en">
      <body className={inter.variable}>
        <main>
          <Theme accentColor="blue" grayColor="slate">
            <div className="flex justify-between bg-slate-100">
              <SideBar />
              <div className="w-full h-full">
                <div className="flex flex-col h-full">
                  <NavBar name={session?.user?.name!} />
                  {children}
                </div>
              </div>
            </div>
          </Theme>
        </main>
      </body>
    </html>
  );
}
