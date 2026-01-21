import { ReactNode } from "react";
import { getSession } from "../actions/session";
import { dailyMood } from "@/lib/dailyMood";
import { db } from "@/lib/db/drizzle";
import { redirect } from "next/navigation";

export  default async function MoodLayout({children,}:{children: ReactNode}){
    const session = await getSession();
    if (!session?.id) {
        redirect('/connection');
    };
    const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
 const hasMood = await dailyMood(db,
    {userId: session.id, date: today} );
 if (hasMood){
    redirect('/');
 }
 return(<>{children}</>);
}