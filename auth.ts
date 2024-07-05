import getUserFromDb from "./server-actions/getUser";
import NextAuth, { User } from "next-auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );
          let user = await getUserFromDb(email, password);
          if (!user) {
            return null;
          }
          console.log("this ran well");
          console.log(user._doc);
          return user;
        } catch (error: any) {
          console.log(error);
          if (error instanceof ZodError) {
            return null;
          } else {
            return null;
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      console.log(user);
      console.log("jwt ran well");
      if (user) {
        token.id = user.id as any;
        token.role = user.role;
        token.team = user.team;
        token.avatar = user.avatar;
        token.employee = user.employee;
      }
      console.log("set token well");
      return token;
    },
    session({ session, token }) {
      console.log("in session");
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.team = token.team;
        session.user.avatar = token.avatar;
        session.user.employee = token.employee;
      }

      return session;
    },
  },
});
