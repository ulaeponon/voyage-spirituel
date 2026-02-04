"use server";
import { getSession } from "./session";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";


export default async function updateName(formData: FormData) {
   const session = await getSession();

if (!session?.id) {
  throw new Error("Utilisateur non authentifié");
}

   const name = formData.get("name") as string;
   const image = formData.get("image") as string;
   if (!name || name.trim().length<2) {
    redirect("/profil?error=invalid-name");
   }
   try {
     const headerList = await headers();
     await auth.api.updateUser({
      body: {
        name,
        image
      },
      headers: headerList,
    });
   
   } catch (error) {
     if (error instanceof Error && error.message === "NEXT_REDIRECT") {
       throw error;
     }
     console.error("Erreur lors de la mise à jour du nom:", error);
     redirect("/profil?error=update-failed");
   }
}

