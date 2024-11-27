import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import { ObjectId } from "mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import connectDB from "@/lib/mongodb";
import User from "@/models/user";

// Extend the default User interface to include _id

interface ExtendedUser extends NextAuthUser {
  id: string;
  _id?: ObjectId;
}

export const authOptions: NextAuthOptions = {
  providers: [
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
            id: user._id.toString(), // Explicitly convert to string
            email: user.email,
          } as ExtendedUser;
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Ensure token.sub is always a string
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        // Ensure user.id is always a string
        token.sub = user.id;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/login" },
};

export default NextAuth(authOptions);
