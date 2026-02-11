
import { journalEntry } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "../actions/session";
import { db } from "@/lib/db/drizzle";
import JournalForm from "./journalForm";


 export default async function JournalPage() {
    const session = await getSession();
        if (!session?.id) {
            throw new Error("Utilisateur non authentifié");}    
    
   
    const entries = await db
  .select()
  .from(journalEntry)
  .where(eq(journalEntry.userId, session.id));

    return(
    <div>
        <JournalForm/>
     <div>
            <h1>Mes entrées de journal</h1>
            { entries.length === 0 ? (
                <p>Aucune entrée de journal disponible.</p>
            ) : (
                entries.map(entry => (
                    <div key={entry.id}>
                        <p>{entry.content}</p>
                    </div>
                ))
            )}
        </div>
        </div>
    )
 }