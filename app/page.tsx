import Image from "next/image";
import { getSession } from "./actions/session";
import { db } from "@/lib/db/drizzle";
import { journalEntry } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import {  emotionUI } from "@/lib/emotions";


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
    eq(journalEntry.entryDate, today)
  ));
  if(!entry){
    return null;
  }
  const {label, icon}= emotionUI[entry.emotion];
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Hello </h1>
        <p>Aujourd'hui, tu te sens</p>
        <span>{icon}</span>
        <strong>{label}</strong>
      </main>
    </div>
  );
}
