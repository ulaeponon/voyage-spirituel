import { redirect } from "next/navigation";
import { getSession } from "../actions/session";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default async function profilPage(){
const session =  await getSession();
if(!session?.id){
  redirect("/connection");
}
  return(
    <>
    <Navbar />
    <main className="min-h-screen flex flex-col p-6 text-zinc-900 dark:text-zinc-100">
      <h1 className="text-xl font-semibold mb-8">Profil</h1>
      <p>Bienvenue sur votre page de profil.</p>

      <section className="rounded-xl bg-zinc-100 dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
        <Link href="/profil/information" className="block p-4 text-zinc-900 dark:text-zinc-100">
        Informations personnelles
        </Link>
         <Link
    href="/profil/security"
    className="block p-4 text-zinc-900 dark:text-zinc-100"
  >
    Sécurité
  </Link>
      </section>
    </main>
    </>
  )  
       
    
}