"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export async function logout() {
  await auth.api.signOut();
  redirect("/");
}
