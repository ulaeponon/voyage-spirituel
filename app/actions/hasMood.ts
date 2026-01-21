"use server"
import { dailyMood } from "@/lib/dailyMood";
import { getSession } from "./session"
import { db } from "@/lib/db/drizzle";
import { redirect } from "next/navigation";
import { journalEntry } from "@/lib/db/schema";
import { Emotions } from "@/lib/emotions";



export const  mood = async (formData: FormData) => {
    const emotion = formData.get("emotion") as Emotions;
    
    const session = await getSession();
    if (!session?.id) {
        throw new Error("Utilisateur non authentifié");
    }
 const userId = session.id;
  const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
  
  const choosenMood = await dailyMood(db, {userId, date:today});

 if (choosenMood){
    redirect('/');

 }
  await db.insert(journalEntry)
  .values({
    userId: userId,
    emotion: emotion,
    entryDate: today,
  });
  redirect('/');
}