import prisma from "@/prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: " email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User does not exsist");
        }

        const matchPass = await bcrypt.compare(
          credentials.password,
          user.hashedPassword!
        );

        if (!matchPass) {
          throw new Error("Your email & password does not match");
        }

        return { id: user.id, name: user.name!, email: user.email! };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, credentials }) {
      if (!user) {
        return "/auth/error?error=CredentialsSignin";
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.email;

      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.email = token.email || "";
      else session.user = { email: token.email || "" } as any;
      return session;
    },
  },
};
