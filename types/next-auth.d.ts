// types/next-auth.d.ts

import { Restriction } from "@prisma/client";
import NextAuth from "next-auth";
import { DefaultSession, DefaultToken } from "next-auth";

// Extend the DefaultSession interface
declare module "next-auth" {
  interface User {
    restrictions: Restriction;
    assignedSiteCode: string;
    username: string;
  }
  interface Session {
    user: {
      id?: string; // Add user ID if it's optional
      name?: string;
      username: string;
      image?: string;
      role?: Restriction;
      siteCode?: string;
    } & DefaultSession["user"];
  }

  interface Token {
    id?: string; // Add token ID if it's optional
    role?: string;
    siteCode?: string;
  }
}
