
import { journalEntry } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "../actions/session";
import { db } from "@/lib/db/drizzle";
import JournalForm from "./journalForm";


 export default async function JournalPage() {
    const session = await getSession();
        if (!session?.id) {
            throw new Error("Utilisateur non authentifié");}    
    
   
  const allEntries = await db
  .select()
  .from(journalEntry)
  .where(eq(journalEntry.userId, session.id))
  .orderBy(desc(journalEntry.createdAt));

const entriesWithContent = allEntries.filter(
  (entry) => entry.content && entry.content.trim() !== ""
);
    return(
    <div>
        <JournalForm/>
    <h1>Mes entrées de journal</h1>

{entriesWithContent.length === 0 && (
  <p>Aucune entrée de journal disponible.</p>
)}

{entriesWithContent.length > 0 && (
  <div>
    {entriesWithContent.map((entry) => (
      <div key={entry.id}>
        <p>{entry.content}</p>
      </div>
    ))}
  </div>
)}
        </div>
    )
 }