import savedProfil from "@/app/actions/savedProfil";
import { getSession } from "@/app/actions/session";
import Link from "next/link";

export default async function InformationsPage() {
  const session = await getSession();

  if (!session) return null;

  return (
    <main className="min-h-screen flex flex-col p-6">
      <h1 className="text-xl font-semibold mb-8">
        Informations personnelles
      </h1>

      <form action={savedProfil}className="flex-1 space-y-6">
        <div>
          <label className="block mb-2 font-medium">Prénom</label>
          <input
            type="text"
            name="name"
            defaultValue={session.name ?? ""}
            className="w-full rounded-xl bg-gray-100 px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={session.email ?? ""}
            className="w-full rounded-xl bg-gray-100 px-4 py-3"
          />
        </div>

        <div className="mt-auto flex gap-4">
         <Link href="/profil" className="flex-1 text-center rounded-full bg-gray-200 py-3">
         Annuler</Link>

          <button
            type="submit"
            className="flex-1 rounded-full bg-indigo-900 text-white py-3"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </main>
  );
}
