"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";
import updateName from "./updateName";
import updateEmail from "./updateEmail";

export default async function savedProfil(formData: FormData) {
  const session = await getSession();
  
  if (!session?.id) {
    redirect("/connection?error=unauthorized");
  }
  
  try {
    await updateName(formData);
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    redirect("/profil/information?error=update-failed");
  }
  
  try {
    await updateEmail(formData);
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    redirect("/profil/information?error=update-failed");
  }
}