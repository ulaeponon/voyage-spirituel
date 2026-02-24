 "use server";

import { db } from "@/lib/db/drizzle";
import { prayer } from "@/lib/db/schema";

 export async function addPrayer(userId:string, content:string, type:"USER" | "TEMPLATE" | "AI") {
    try {
        await db.insert(prayer).values({
            userId,
            content,
            type,
        });
    } catch (error) {
        console.error("Error adding prayer:", error);
        throw new Error("Failed to add prayer");
    }}