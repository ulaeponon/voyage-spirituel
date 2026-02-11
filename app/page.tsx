
import { getSession } from "./actions/session";
import { db } from "@/lib/db/drizzle";
import { action, bibleVerse, goals, journalEntry } from "@/lib/db/schema";
import { and, eq, sql } from "drizzle-orm";
import {  emotionUI } from "@/lib/emotions";
import { redirect } from "next/navigation";



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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Hello </h1>
        <p>Aujourd'hui, tu te sens</p>
        <span>{icon}</span>
        <strong>{label}</strong>
      </main>
      <section>
  <h2>Pour t’accompagner aujourd’hui</h2>
{message ? (
    <>
      <p>“{message.content}”</p>
      <small>
        {message.book} {message.chapter}:{message.verse}
      </small>
    </>
  ) : (
    <p>
      Prends un moment de calme et de réflexion pour bien commencer ta journée.
    </p>
  )}
</section>
<section>
  <h2>Objectifs du jour & actions pour les atteindre</h2>
  <p>{goalsOfDay.length >0 ? `${goalsOfDay.length} objectif(s)en cours `:"Aucun objectif pour l'instant"}</p>
{nextAction ? (
<div>
  <p> Prochaine action :</p>
  <strong>{nextAction.title}</strong>
</div>
):(<p>
  Aucune action planifiée pour aujourd'hui
</p>)
}
</section>
    </div>
  );
}
