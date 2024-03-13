import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";

export const config = {
  trustHost: true,
  providers: [Google],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
