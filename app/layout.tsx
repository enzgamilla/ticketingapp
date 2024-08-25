import { Card, Grid, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";

import SideBar from "./SideBar";

import QueryClientProvider from "./QueryClientProvider";
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
          <QueryClientProvider>
            <Theme accentColor="blue" grayColor="slate">
              <Grid
                columns="2"
                height="100vh"
                className="bg-slate-50"
                style={{ gridTemplateColumns: "18rem  1fr" }}
              >
                <SideBar />
                <Card className="p-3 m-5">{children}</Card>
              </Grid>
            </Theme>
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
