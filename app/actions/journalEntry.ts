"use server";

import { journalEntry } from "@/lib/db/schema";
import { getSession } from "./session";
import { db } from "@/lib/db/drizzle";

 export async function saveJournalEntry(entry: string,
    emotion: 
    | "JOIE"
    | "TRISTE"
    | "EN_COLERE"
    | "ANXIEUSE"
    | "FATIGUEE"
    | "RECONNAISSANTE"
    | "EN_PAIX"
    | "DISTRAITE"
    | "MOTIVEE"
    | "STRESSEE") {
    console.log("Saving journal entry:", entry);

    const session = await getSession();
      if (!session?.id) {    
         throw new Error("Utilisateur non authentifié");}
if (!entry || entry.trim() === "") {
    throw new Error("Le contenu de l'entrée de journal ne peut pas être vide.");
  }
         await db.insert(journalEntry)
  .values({
    userId: session.id,
    emotion,
    content: entry,
  });
 }