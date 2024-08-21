import { Card, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";

import NavBar from "./NavBar";
import SideBar from "./SideBar";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/authOptions";

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
    <html lang="en">
      <body className={inter.variable}>
        <main>
          <Theme accentColor="blue" grayColor="slate">
            <div className="flex justify-between bg-slate-100">
              <SideBar />
              <div className="w-full h-full">
                <div className="flex flex-col">
                  <NavBar
                    name={session?.user?.name || "Guest"}
                    public_id={session?.user?.image || "default_profile_vtwkjs"}
                    email={session?.user?.email!}
                  />
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
