import { redirect } from "next/navigation";
import { getSession } from "../actions/session";
import PrayerUI from "./PrayerUI";

 export default  async function PrayerPage() {
    const session = await getSession();
        if (!session?.id) {
            redirect("/connection?form=login&error=not-authenticated");}
    return(
        <PrayerUI userId={session.id} />
)
 }