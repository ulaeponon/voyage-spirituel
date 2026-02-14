"use client";

import { useRouter } from "next/navigation";
import { signup, login } from "../actions/connection";
import useAuthForm from "./useAuthForm";

export default function ConnectionPage() {
  const { mode, form,error,setError, updateForm, changeMode , validateForm } = useAuthForm();
const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    return;
  }

  const formData = new FormData(e.currentTarget);

  const result =
    mode === "login"
      ? await login(formData)
      : await signup(formData);

  if (result?.error) {
    setError(result.error);
    return;
  }

  if (result?.success) {
    router.push("/mood");
  }
};
const errorMessages: Record<string, string> = {
  "invalid-credentials": "Email ou mot de passe incorrect.",
  "user-exists": "Cet email est déjà utilisé.",
  "password-too-short": "Mot de passe trop court (min 6 caractères).",
  "missing-credentials": "Email et mot de passe requis.",
  "missing-fields": "Tous les champs sont obligatoires.",
  "email-password-required": "Email et mot de passe requis.",
  "name-required": "Le nom est requis.",
  "confirm-required": "Veuillez confirmer le mot de passe.",
  "password-mismatch": "Les mots de passe ne correspondent pas.",
  "generic": "Une erreur est survenue. Réessayez.",
};
  return (
    <main className="min-h-screen bg-[#F3F2F7]">
      <div className="relative h-[65vh] w-full overflow-hidden">
        <img
          src="/images/image-cover.png.png"
          alt="Voyage spirituel"
          className="h-full w-full object-cover "
        />

        <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/20 to-transparent" />
      </div>
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-white/20" />
 <div className="relative -mt-32 max-w-md mx-auto bg-white rounded-t-[40px] shadow-2xl px-8 pt-12 pb-12 min-h-[60vh]">
        
        <h2 className="text-3xl font-bold text-gray-900 text-center">
          Bienvenue
        </h2>

        <p className="text-base text-gray-500 text-center mt-3 mb-8">
          Commence ton voyage intérieur
        </p>
{/*switch connexion/inscription */}
        <div className="flex justify-center gap-10 mb-10 text-base font-medium">
         
          <button
            type="button"
            onClick={() => mode !== "login" && changeMode()}
            className={`pb-2 transition-colors ${ mode === "login" ? "text-gray-900": "text-gray-400"}`}>
            Connexion
            {mode === "login" && (
                <div className="h-1 w-full bg-indigo-500 mt-1 rounded-full" />
              )}
          </button>

          <button
            type="button"
            onClick={() => mode !== "signup" && changeMode()}
            className={`pb-2 transition-colors ${ mode === "signup"?  "text-gray-900" : "text-gray-400"}`} >
            Inscription
            {mode === "signup" && (
                <div className="h-1 w-full bg-indigo-500 mt-1 rounded-full" />
              )}
          </button>
        </div>

        {/*Affichage des erreurs */}
        {error && (
  <div className="mt-4 text-center text-red-500 text-sm animate-fadeIn">
    {errorMessages[error] ?? error}
  </div>
)}

        {/* FORMULAIRE */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {mode === "signup" && (
            <input
              name="name"
              placeholder="Nom"
              value={form.name ?? ""}
              onChange={(e) => updateForm("name", e.target.value)}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => updateForm("email", e.target.value)}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={(e) => updateForm("password", e.target.value)}
            className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />

          {mode === "signup" && (
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirmer le mot de passe"
              value={form.confirmPassword}
              onChange={(e) =>
                updateForm("confirmPassword", e.target.value)
              }
className="w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"            />
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-linear-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-2xl text-sm font-medium shadow-lg hover:scale-[1.02] active:scale-[0.98] transition"
          >
            {mode === "login" ? "Entrer" : "Commencer"}
          </button>
        </form>
      </div>
    </main>
  );
}

