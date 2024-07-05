import { ObjectId } from "mongoose";
import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role?: string;
      team?: string;
      avatar?: string;
      employee?: ObjectId;
    } & DefaultSession["user"];
  }
  interface User {
    id: string;
    role?: string;
    team?: string;
    avatar?: string;
    employee?: ObjectId;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
    team?: string;
    avatar?: string;
    employee?: ObjectId;
  }
}
