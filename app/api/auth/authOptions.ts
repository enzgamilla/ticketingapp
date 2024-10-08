import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Restriction } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.username || !credentials.password) return null;

        const user = await prisma.userAccount.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          throw new Error("User does not exsist");
        }

        if (!user.verification)
          throw new Error(
            "User is not activated. Please ask the administrator to activate your account."
          );

        const matchPass = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        if (!matchPass) {
          throw new Error("Your email & password does not match");
        }

        return user;
      },
    }),
  ],
  pages: {
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.restrictions;
        token.siteCode = user.assignedSiteCode;
        token.restrictions = user.restrictions;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string; // Retrieve user ID from the token
        session.user.siteCode = token.siteCode as string;
        session.user.role = token.restrictions as Restriction;
        session.user.username = token.username as string;
      }
      return session;
    },
    async signIn({ user, credentials }) {
      if (!user) {
        return "/auth/error?error=CredentialsSignin";
      }
      return true;
    },
  },
};
