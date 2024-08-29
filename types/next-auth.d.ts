// types/next-auth.d.ts

import NextAuth from "next-auth";
import { DefaultSession, DefaultToken } from "next-auth";

// Extend the DefaultSession interface
declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // Add user ID if it's optional
      name?: string;
      email?: string;
      image?: string;
    } & DefaultSession["user"];
  }

  interface Token {
    id?: string; // Add token ID if it's optional
  }
}
