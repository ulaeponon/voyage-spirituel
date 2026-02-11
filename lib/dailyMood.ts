
import { journalEntry} from "./db/schema"
import { and, eq, sql } from "drizzle-orm"


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