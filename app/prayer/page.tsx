import { redirect } from "next/navigation";
import { getSession } from "../actions/session";
import PrayerUI from "./PrayerUI";
import PrayerAdded from "./PrayerAdded";

 export default  async function PrayerPage() {
    const session = await getSession();
        if (!session?.id) {
            redirect("/connection?form=login&error=not-authenticated");}
    return(
        <div className="min-h-screen bg-[#FDFCF9]">
        <PrayerUI userId={session.id} />
        <PrayerAdded userId={session.id} />
        </div>
)
 }