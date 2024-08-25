import { Grid, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";

import SideBar from "@/app/SideBar";

import QueryClientProvider from "./QueryClientProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";

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
                className="bg-slate-100"
                style={{ gridTemplateColumns: "18rem  1fr" }}
              >
                <SideBar
                  name={session?.user?.name!}
                  email={session?.user?.email!}
                  public_id={session?.user?.image! || "default_profile_vtwkjs"}
                />
                {children}
              </Grid>
            </Theme>
          </QueryClientProvider>
        </main>
      </body>
    </html>
  );
}
