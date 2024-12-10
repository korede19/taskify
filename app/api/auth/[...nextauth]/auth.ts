import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { ObjectId } from "mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

interface ExtendedUser extends NextAuthUser {
  id: string;
  _id?: ObjectId;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Invalid credentials");

        await connectDB();
        const user = await User.findOne({ email: credentials.email });

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user._id.toString(),
            email: user.email,
          } as ExtendedUser;
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) {
          throw new Error("No email found in Google profile");
        }

        await connectDB();

        try {
          let user = await User.findOne({ email: profile.email });

          if (!user) {
            user = new User({
              email: profile.email,
              name: profile.name,
              image: profile.image, // Add profile picture if available
              provider: "google",
            });

            await user.save();
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      // Optional: Add more user details from token to session
      if (token.email) {
        session.user.email = token.email;
      }
      if (token.name) {
        session.user.name = token.name;
      }

      return session;
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google") {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }

      if (user) {
        token.sub = user.id;
      }

      return token;
    },
  },
  pages: {
    signIn: "/login", // Optional: Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
};

export default NextAuth(authOptions);
