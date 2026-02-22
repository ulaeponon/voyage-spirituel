import savedPassword from "@/app/actions/savedPassword";
import { getSession } from "@/app/actions/session";


export default async function SecurityPage() {
    const session = await getSession();

    if (!session) return null;
    return(
        <main className="min-h-screen flex flex-col p-6">
            <form action={savedPassword } className="flex-1 space-y-6">
<div>
          <label className="block mb-2 font-medium">Mot de passe actuel</label>
          <input
            type="password"
            name="currentPassword"
            className="w-full rounded-xl bg-gray-100 px-4 py-3"
            required
          />
        </div>


        <div>
          <label className="block mb-2 font-medium">
            Nouveau mot de passe
          </label>
          <input
            type="password"
            name="newPassword"
            className="w-full rounded-xl bg-gray-100 px-4 py-3"
            required
          />
        </div>
          <button
          type="submit"
          className="rounded-xl bg-black text-white px-4 py-3"
        >
          Mettre à jour
        </button>
            </form>
        </main>
    )
}