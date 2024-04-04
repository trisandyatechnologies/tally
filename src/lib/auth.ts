import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

async function getUserByEmailOrPhone(
  phone?: string,
  email?: string
): Promise<User | null> {
  try {
    const user = await prisma.user.findMany({
      where: {
        OR: [{ email }, { phone }],
      },
    });
    return user[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

async function createUser(
  firmname: string,
  owner: string,
  address: string,
  gstNo: string,
  email: string,
  phone: string,
  password: string
): Promise<User | null> {
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 5);
  }
  try {
    const user = await prisma.user.create({
      data: {
        email,
        firmname,
        owner,
        address,
        gstNo,
        phone,
        password: hashedPassword,
      },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        firmname: { type: "text" },
        owner: { type: "text" },
        address: { type: "text" },
        gstNo: { type: "text" },
        email: { type: "text" },
        phone: { type: "text" },
        password: { type: "password" },
        name: { type: "text" },
        isRegister: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { firmname,owner,address,gstNo, password, email, phone, isRegister } = credentials;
        if (!(email || phone) || !password) {
          return null;
        }

        const user = await getUserByEmailOrPhone( phone,email);

        if (isRegister === "true") {
          if (user?.email || user?.phone) {
            // User already registered
            return null;
          }
          const userInserted = await createUser(firmname, owner, address, gstNo, email, phone, password);
          return userInserted;
        }

        // If no user or no password configured earlier
        if (user && user.password) {
          const passwordsMatched = await bcrypt.compare(
            password,
            user?.password
          );
          
          if (passwordsMatched) {
            const { password: _, ...restUser } = user;
            return restUser;
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, profile, user }) {
      if (user) {
        // From Credentials
        token.user = user;
      }

      return token;
    },
    session: async ({ session, token, user }) => {
      session.user = {
        ...(token.user ?? {}),
        ...user,
        ...session.user,
      };
      return session;
    },
    redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
};
