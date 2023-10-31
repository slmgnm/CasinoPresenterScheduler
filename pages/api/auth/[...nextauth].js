import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../prisma/client";

const adapter = PrismaAdapter(prisma);

export const authOptions = {
  // Configure one or more authentication providers

  DefaultAdapter: adapter,
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google" && profile.email_verified) {
        const allowedEmails = ["saleemghanem@gmail.com", "user2@example.com", "user3@example.com"];
        return allowedEmails.includes(profile.email);
      }
      return true; 
    },
  },
};

export default NextAuth(authOptions);