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
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.username || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
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

        return {
          id: user.id,
          name: user.name!,
          email: user.username!,
          image: user.image,
        };
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
  },
};
