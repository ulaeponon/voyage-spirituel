"use client";

import signup, { login } from "../actions/connection";
import useAuthForm from "./useAuthForm";

 export default function connectionPage(){
    const {mode,form,updateForm,changeMode,} = useAuthForm()
    
    return(
        <div>
           <form action={mode === "login" ? login : signup}>
{mode === "signup" &&(
    <input
    name="name" placeholder="Nom" value={form.name ?? ""}
    onChange={(e)=> updateForm("name", e.target.value)}/>
)}
 <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => updateForm("email", e.target.value)}
      />
      <input
        name="password"
        type="password"
        placeholder="Mot de passe"
        value={form.password}
        onChange={(e) => updateForm("password", e.target.value)}
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
        />
      )}
      <button type="submit">
        {mode === "login" ? "Login" : "Signup"}
      </button>

      <button type="button" onClick={changeMode}>
        Switch
      </button>
           </form>
        </div>

    )
 }