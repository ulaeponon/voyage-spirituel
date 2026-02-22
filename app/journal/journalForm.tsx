"use client";
import { useState } from "react"
import { saveJournalEntry } from "../actions/journalEntry";
import { useRouter } from "next/navigation";

 export default function JournalForm() {
    const [journalEntry, setJournalEntry] = useState<string>("")
    const router = useRouter();
    const handleSaveEntry = async () => {
        await saveJournalEntry(journalEntry);
         setJournalEntry("");
         router.refresh(); // Rafraîchir la page après sauvegarde
    }
    return(
        <main className="p-4">
            <h1 className="text-2xl font-bold">Journal Page</h1>
            <textarea className="w-full h-64 mt-4 p-2 border rounded" placeholder="Ecris ce que tu ressens aujourd'hui..." value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)}></textarea>
            <button className="mt-4 bg-blue-500 text-white p-2 rounded" onClick={handleSaveEntry} disabled={!journalEntry.trim()}>Sauvegarder</button>
        </main>
    )
 }