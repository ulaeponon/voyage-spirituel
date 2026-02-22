import getDailyEmotion from "./dailyMood";
import getRandomPrayer from "./prayer";

export default async function getPrayerFromMood(db:any, userID:string, ):Promise<string | null> {
   const date = new Date().toISOString().split('T')[0];
   const emotion = await getDailyEmotion(db, userID, date);
   if(!emotion) {
    return null;
   }
   const prayer = await getRandomPrayer(db, emotion);
   return prayer;
}