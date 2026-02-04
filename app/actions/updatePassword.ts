"use server";

import { getSession } from "./session";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function updatePassword(formData: FormData) {
  const session = await getSession();

  if (!session?.id) {
    throw new Error("Utilisateur non authentifié");
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (!currentPassword || !newPassword || newPassword.length < 8) {
    redirect("/profil?error=invalid-password");
  }

  try {
    const headerList = await headers();
    await auth.api.changePassword({
      body: {
        currentPassword,
        newPassword,
        revokeOtherSessions: true
      },
      headers: headerList,
    });
    // redirect("/profil");
  } catch (error) {
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    console.error("Erreur lors de la mise à jour du mot de passe:", error);
    redirect("/profil?error=update-failed");
  }
}
