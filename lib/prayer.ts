import { prayerTemplate } from "@/lib/db/schema";
import { Emotions } from "@/lib/emotions";
import { eq, sql} from "drizzle-orm";

export default async function getRandomPrayer(db:any, emotion:Emotions):Promise<string | null> {
    const result = await db
    .select({content: prayerTemplate.content})
    .from(prayerTemplate)
    .where(eq(prayerTemplate.emotion, emotion))
    .orderBy(sql`RANDOM()`)
    .limit(1);
    return result.length > 0 ? result[0].content : null;

}