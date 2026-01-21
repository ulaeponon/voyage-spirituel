
import { useState } from "react";

type AuthMode = "signup" | "login";

export default function useAuthForm () {
const [mode, setMode] = useState<AuthMode>("login");

const [form, setForm] = useState ({
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
})
const updateForm =(key:keyof typeof form, value: string) => {
setForm((prev)=>({...prev, [key]:value}))
}
const changeMode = () =>{
    setMode((prev) =>(prev === "login"? "signup": "login"));
    setForm({ name:"",email:"", password:"", confirmPassword: "" });
}
const validateForm = () =>{
    if(!form.email || !form.password){
       return " Email et Mot de passe requis " 
    }
    if (mode === "signup"){
        if(!form.confirmPassword){
            return "Confirmation requise";
        }
        if(form.password !== form.confirmPassword){
            return "Les mots de passe ne correspondent pas";
        }
    }
    return null;
}

return {
    mode,
    form,
   updateForm,
   changeMode,
    validateForm,
   
}

};
