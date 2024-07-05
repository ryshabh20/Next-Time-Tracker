import type { NextAuthConfig, User } from "next-auth";

interface authUser extends User {
  role: string;
}
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const path = nextUrl.pathname;
      const isPublicPath =
        path === "/login" ||
        path === "/signup" ||
        path === "/verifyemail" ||
        path === "/";
      const user = auth?.user as authUser;
      const isLoggedIn = !!user;

      if (!isPublicPath && !isLoggedIn) {
        // return Response.redirect(new URL("/login", nextUrl));
        return false;
      }
      if (isPublicPath && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      if (
        (nextUrl.pathname.startsWith("/clients/admin") ||
          nextUrl.pathname.startsWith("/projects/admin") ||
          nextUrl.pathname.startsWith("/employees/admin")) &&
        user.role !== "admin"
      ) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
