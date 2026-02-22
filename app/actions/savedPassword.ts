"use server";
import { redirect } from "next/navigation";
import { updatePassword } from "./updatePassword";
import { getSession } from "./session";

export default async function savedPassword(formData: FormData) {
  const session = await getSession();
  
  if (!session?.id) {
    redirect("/connection?error=unauthorized");
  }
  
  try {
    await updatePassword(formData);
  } catch (error) {
    redirect("/profil/security?error=update-failed");
  }
}