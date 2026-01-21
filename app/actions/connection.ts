"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default  async function signup (formData: FormData) {
     const name = formData.get("name") as string;
     const email = formData.get("email") as string;
     const password = formData.get("password") as string;

     if (!name || !email || !password) {
        redirect("/?form=signup&error=name-missing")
}
const response = await auth.api.signUpEmail({
    body:{
        name,
        email,
        password,
    },
    asResponse: true,
})
if(!response.ok){
    const errorData = await response.json();

     if (errorData.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
            console.error("Ce compte existe déjà");
            redirect("/?form=signup&error=USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL");
}
else if (errorData.code === "PASSWORD_TOO_SHORT") {
            console.error("Mot de passe trop court ");
            redirect("/?form=signup&error='PASSWORD_TOO_SHORT")

        }  else {
            console.error("Echec de l'inscription:", errorData.message);
            redirect("/?form=signup&error=generic");
        }}
redirect("/mood");
}

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    if (!email || !password) {
        redirect("/?form=login&error=missing-credentials");
    }
    const response = await auth.api.signInEmail({
        body: {
            email,  
            password,
        },
        asResponse: true,
    });
    if (!response.ok) {
        const errorData = await response.json();    
        if (errorData.code ===  "INVALID_EMAIL_OR_PASSWORD") {
            console.error("Identifiants invalides");
            redirect("/?form=login&error=invalid-credentials");
        } else {
            console.error("Echec de la connexion:", errorData.message);
            redirect("/?form=login&error=generic");
        }
}

 redirect("/mood");}