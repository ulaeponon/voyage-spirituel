"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";
import { db } from "@/lib/db/drizzle";
import { user } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function updateEmail(formData: FormData) {
   const session = await getSession();

    if (!session?.id) {
      throw new Error("Utilisateur non authentifié");
    }

     const email = formData.get("email") as string;
    if (!email || !email.includes("@")) {
        redirect("/profil?error=invalid-email");
    }

    try {
      console.log("Avant mise à jour - session.id:", session.id, "nouvel email:", email);
      
      const result = await db
        .update(user)
        .set({ email })
        .where(eq(user.id, session.id));
      
    
    } catch (error) {
      if (error instanceof Error && error.message === "NEXT_REDIRECT") {
        throw error;
      }
      console.error("Erreur lors de la mise à jour de l'email:", {
        message: error instanceof Error ? error.message : String(error),
        error
      });
      redirect("/profil?error=update-failed");
    }
}