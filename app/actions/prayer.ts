"use server";

import { db } from "@/lib/db/drizzle";

import getPrayerFromMood from "@/lib/prayerService";


export async function getTodayPrayer(userID:string) {
   return await getPrayerFromMood(db, userID);
}