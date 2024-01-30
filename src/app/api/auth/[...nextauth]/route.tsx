import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { localApiURL } from "@config/config";
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          const auth = await fetch(`${localApiURL}/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: email,
              password: password,
            }),
          });

          const user = await auth.json();
          if (!user) {
            return null;
          } else {
            if (!user.data) {
              return null;
            } else {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.name = user.data.name;
        token.email = user.data.email;
        token.token = user.token;
        token.role = "admin";
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.accessToken = token.token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
