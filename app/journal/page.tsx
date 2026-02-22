import { journalEntry } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { getSession } from "../actions/session";
import { db } from "@/lib/db/drizzle";
import JournalForm from "./journalForm";
import JournalList from "../components/JournalList";


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
    <div className="min-h-screen bg-[#F9F7F3] px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-10">
        <JournalForm/>
    <h1 className="text-2xl font-semibold text-[#2F2F2F]">Mes entrées de journal</h1>

{entriesWithContent.length === 0 && (
  <p className="text-gray-500 text-sm">Aucune entrée de journal disponible.</p>
)}

<JournalList entries={entriesWithContent} />
      </div> 
       </div>
    )
 }