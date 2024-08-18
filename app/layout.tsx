import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";
import { Card, Theme } from "@radix-ui/themes";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import LoginForm from "./components/LoginForm";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <>
      <html lang="en">
        <body className={inter.variable}>
          <main>
            <Theme accentColor="blue" grayColor="slate">
              <div className="flex justify-between">
                <SideBar />
                <div className="w-full h-full">
                  <div className="flex flex-col h-full p-5">
                    <NavBar />
                    <Card className="min-h-[40rem]">{children}</Card>
                  </div>
                </div>
              </div>
            </Theme>
          </main>
        </body>
      </html>
    </>
  );
}
