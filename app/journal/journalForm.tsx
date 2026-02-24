"use client";
import { useState } from "react"
import { saveJournalEntry } from "../actions/journalEntry";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

 export default function JournalForm() {
    const [journalEntry, setJournalEntry] = useState<string>("")
    const [selectedEmotion, setSelectedEmotion] = useState<
  | "JOIE"
  | "TRISTE"
  | "EN_COLERE"
  | "ANXIEUSE"
  | "FATIGUEE"
  | "RECONNAISSANTE"
  | "EN_PAIX"
  | "DISTRAITE"
  | "MOTIVEE"
  | "STRESSEE"
>("EN_PAIX");
    const router = useRouter();
    const handleSaveEntry = async () => {
        await saveJournalEntry(journalEntry, selectedEmotion);
         setJournalEntry("");
         router.refresh(); // Rafraîchir la page après sauvegarde
    }
    return(
      <>
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
            <h2 className="text-xl font-semibold text-[#2F2F2F]"> Écris ton moment</h2>
            <textarea className="w-full h-48 resize-none rounded-xl border border-gray-200 bg-[#FDFCF9] p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D6B98C] transition"  
             placeholder="Ecris ce que tu ressens aujourd'hui..." value={journalEntry} onChange={(e) => setJournalEntry(e.target.value)}></textarea>
           <div className="flex justify-end">
      <button
        className=" px-6 py-2 rounded-full bg-[#D6B98C] text-black text-sm font-medium transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
        onClick={handleSaveEntry}
        disabled={!journalEntry.trim()}
      >
        Sauvegarder
      </button>
    </div>

        </div>
        </>
    )
 }