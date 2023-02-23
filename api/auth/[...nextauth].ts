import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;
if (!clientId || !clientSecret) throw new Error("Missing env vars");

export default NextAuth({
  providers: [
    GithubProvider({
      clientId,
      clientSecret,
    }),
  ],
});
