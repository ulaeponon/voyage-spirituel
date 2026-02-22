
import { journalEntry} from "./db/schema"
import { and, eq, sql } from "drizzle-orm"
import { Emotions } from "./emotions"


type DailyMoodProps = {
    userId: string,
    date:string    
}
export const dailyMood = async (db:any, {userId, date}:DailyMoodProps):Promise<boolean> => {

const result = await db
    .select({id: journalEntry.id})
    .from(journalEntry)
    .where(
        and(eq(journalEntry.userId, userId),
        sql`DATE(${journalEntry.createdAt}) = ${date}`
    )).limit(1);

    return result.length > 0 ;
}

export default async function getDailyEmotion(db:any, userId:string, date:string):Promise<Emotions | null> {
const moodRResult = await db
.select({emotion: journalEntry.emotion})
.from(journalEntry)
.where(
    and(eq(journalEntry.userId, userId),
    sql`DATE(${journalEntry.createdAt}) = ${date}`
)).limit(1);
return moodRResult.length > 0 ? moodRResult[0].emotion : null;
}