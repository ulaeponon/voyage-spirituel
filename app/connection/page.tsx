"use client";

import signup, { login } from "../actions/connection";
import useAuthForm from "./useAuthForm";

export default function ConnectionPage() {
  const { mode, form, updateForm, changeMode } = useAuthForm();

  return (
    <main className="min-h-screen bg-[url('/images/image-cover.png.png')] bg-cover bg-center bg-no-repeat relative">
      
      {/* Overlay doux */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

      {/* Contenu centré */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        
        {/* Carte sweep */}
        <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-xl overflow-hidden">
          
          {/* Header */}
          <div className="px-6 pt-8 text-center">
            <h1 className="text-xl font-semibold text-gray-800">
              Bienvenue
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Commence ton voyage intérieur
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-8 mt-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => mode !== "login" && changeMode()}
              className={`pb-1 transition ${
                mode === "login"
                  ? "border-b-2 border-indigo-400 text-gray-900"
                  : "text-gray-400"
              }`}
            >
              Connexion
            </button>
            <button
              type="button"
              onClick={() => mode !== "signup" && changeMode()}
              className={`pb-1 transition ${
                mode === "signup"
                  ? "border-b-2 border-indigo-400 text-gray-900"
                  : "text-gray-400"
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Formulaire */}
          <form
            action={mode === "login" ? login : signup}
            className="px-6 pt-6 pb-8 space-y-4"
          >
            {mode === "signup" && (
              <input
                name="name"
                placeholder="Nom"
                value={form.name ?? ""}
                onChange={(e) => updateForm("name", e.target.value)}
                className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-indigo-400"
              />
            )}

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => updateForm("email", e.target.value)}
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-indigo-400"
            />

            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={form.password}
              onChange={(e) => updateForm("password", e.target.value)}
              className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-indigo-400"
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
                className="w-full border-b border-gray-300 py-2 text-sm focus:outline-none focus:border-indigo-400"
              />
            )}

            <button
              type="submit"
              className="w-full mt-6 bg-indigo-400 text-white py-3 rounded-full text-sm font-medium hover:bg-indigo-500 transition"
            >
              {mode === "login"
                ? "Entrer"
                : "Commencer le voyage"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

//  export default function connectionPage(){
//     const {mode,form,updateForm,changeMode,} = useAuthForm()
    
//     return(
//      <main className="min-h-screen bg-[url('/images/image-cover.png.png')] bg-cover bg-center bg-no-repeat relative">
// <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />
//  {/* Contenu centré */}
//       <div className="relative z-10 min-h-screen flex items-center justify-center px-4"/>
//         {/* Carte sweep */}
//         <div className="w-full max-w-sm bg-white rounded-[2.5rem] shadow-xl overflow-hidden"/>
          
//           {/* Header texte */}
//           <div className="px-6 pt-8 text-center">
//             <h1 className="text-xl font-semibold text-gray-800">
//               Bienvenue
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Commence ton voyage intérieur
//             </p>
//           </div>

//           {/* Tabs */}
//           <div className="flex justify-center gap-8 mt-6 text-sm font-medium">
//             <button
//               type="button"
//               onClick={() => mode !== "login" && changeMode()}
//               className={`pb-1 transition ${
//                 mode === "login"
//                   ? "border-b-2 border-indigo-400 text-gray-900"
//                   : "text-gray-400"
//               }`}
//             >
//               Connexion
//             </button>
//             <button
//               type="button"
//               onClick={() => mode !== "signup" && changeMode()}
//               className={`pb-1 transition ${
//                 mode === "signup"
//                   ? "border-b-2 border-indigo-400 text-gray-900"
//                   : "text-gray-400"
//               }`}
//             >
//               Inscription
//             </button>
//           </div>
//         <div>
//            <form action={mode === "login" ? login : signup}>
// {mode === "signup" &&(
//     <input
//     name="name" placeholder="Nom" value={form.name ?? ""}
//     onChange={(e)=> updateForm("name", e.target.value)}/>
// )}
//  <input
//         name="email"
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => updateForm("email", e.target.value)}
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="Mot de passe"
//         value={form.password}
//         onChange={(e) => updateForm("password", e.target.value)}
//       />
      
//       {mode === "signup" && (
//         <input
//           name="confirmPassword"
//           type="password"
//           placeholder="Confirmer le mot de passe"
//           value={form.confirmPassword}
//           onChange={(e) =>
//             updateForm("confirmPassword", e.target.value)
//           }
//         />
//       )}
//       <button type="submit">
//         {mode === "login" ? "Login" : "Signup"}
//       </button>

//       <button type="button" onClick={changeMode}>
//         Switch
//       </button>
//            </form>
//         </div>
// </main>
//     )
//  }

