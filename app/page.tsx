
import { getSession } from "./actions/session";
import { db } from "@/lib/db/drizzle";
import { action, bibleVerse, goals, journalEntry } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import {  emotionUI } from "@/lib/emotions";
import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";
import Link from "next/link";



export default  async function Home() {
  const session = await getSession();
  if (!session?.id) {
    return null;
  }
  const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD

  const [entry] = await db.select()
  .from(journalEntry)
  .where(
    and(
      eq(journalEntry.userId, session.id),
      sql`date(${journalEntry.createdAt}) = ${today}`
    )
  );
  if(!entry){
   redirect("/mood");
  }
  const [message] = await db
  .select()
  .from(bibleVerse)
  .where(
    and(
      eq(bibleVerse.emotion, entry.emotion),
      eq(bibleVerse.isActive, true)
    )
  )
  .limit(1);
  const {label, icon}= emotionUI[entry.emotion];
  const goalsOfDay = await db
  .select()
  .from(goals)
  .where(
    and(
      eq(goals.userId,session.id),
      eq( goals.status, "in_progress")
    ))
  const [nextAction]= await db.select()
  .from(action)
  .where(
    and(
      eq(action.userId, session.id),
      eq(action.status, "todo")
    )
  )
  .orderBy(action.dueDate)
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-linear-to-br from-[#102c48] via-[#8874a8] to-[#d4be95] font-sans">
      <main className="w-full max-w-md mx-auto px-6 py-10 pb-32 flex flex-col gap-10">
       <div className="rounded-3xl bg-white/20 backdrop-blur-md p-8 shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-[#493673]">Hello {session.name}</h1>
        <p className="text-sm text-[#493673]/70">Aujourd'hui, tu te sens</p>
        <div className="text-5xl my-4">
        <span>{icon}</span>
        </div>
        <strong className="text-2xl font-medium text-[#493673]">{label}</strong>
        </div>
      
      <Link href= "/prayer">
      <section className="rounded-3xl bg-white/25 backdrop-blur-md p-7 shadow-md  hover:bg-white/35 hover:shadow-lg hover:scale-[1.02] 
    transition-all duration-200 cursor-pointer border border-white/20">
  <h2 className="text-lg font-lg  text-[#493673] tracking-wide mb-4">Pour t’accompagner aujourd’hui</h2>
{message ? (
    <>
      <p className="italic text-[#102c48] leading-relaxed">“{message.content}”</p>
      <small  className="block mt-2 text-[#493673]/70">
        {message.book} {message.chapter}:{message.verse}
      </small>
    </>
  ) : (
    <p className="italic text-[#102c48]">
     " Prends un moment de calme et de réflexion pour bien commencer ta journée."
    </p>
  )}
</section>
</Link>
<Link href= "/prayer">
<section className="rounded-3xl bg-white/20 backdrop-blur-md p-7 shadow-md  hover:bg-white/35 hover:shadow-lg hover:scale-[1.02] 
    transition-all duration-200 cursor-pointer border border-white/20">
  <h2 className="text-lg font-medium text-[#493673] tracking-wide mb-4">Objectifs du jour & actions pour les atteindre</h2>
  <p className="text-[#102c48] mb-5 leading-relaxed">
    {goalsOfDay.length >0 ? `${goalsOfDay.length} objectif(s)en cours `:"Aucun objectif pour l'instant"}</p>
{nextAction ? (
<div className="bg-[#d4be95]/30 rounded-2xl p-4">
  <p className="text-sm text-[#493673]/70"> Prochaine action :</p>
  <strong className="text-[#493673]">{nextAction.title}</strong>
</div>
):(<p  className="text-[#493673]/70 italic">
  Aucune action planifiée pour aujourd'hui
</p>)
}
</section>
</Link>
 </main>
    </div>
   
    </>
  );
}
