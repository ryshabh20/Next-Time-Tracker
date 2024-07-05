"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

// ...

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const result = await signIn("credentials", formData);
    console.log("result", result);
  } catch (error: any) {
    if (error) {
      if (isRedirectError(error)) throw error;
      switch (error?.cause?.err["code"]) {
        case "credentials":
          return "Invalid credentials.";
      }
    }
    throw error;
  } finally {
    redirect("https://localhost:3000");
  }
}

export async function logout() {
  try {
    console.log("this ");
    await signOut();
    console.log("this ");
  } catch (error) {
    console.log("this ");

    if (isRedirectError(error)) throw error;
    console.log("this ");

    throw error;
  } finally {
    console.log("this ");

    redirect("https://localhost:3000");
  }
}

export async function HandleLogout() {
  console.log("Logout initiated");
  await signOut();
}
