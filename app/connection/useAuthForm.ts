
import { useState } from "react";

type AuthMode = "signup" | "login";

type FormState = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export default function useAuthForm() {
    const [mode, setMode] = useState<AuthMode>("login");
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const updateForm = (key: keyof FormState, value: string) => {
        setForm((prev) => ({ ...prev, [key]: value }));
        if (error) setError(null);
    };

    const changeMode = () => {
        setMode((prev) => (prev === "login" ? "signup" : "login"));
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
        setError(null);
    };

   const validateForm = () => {
  if (!form.email || !form.password) {
    return "email-password-required";
  }

  if (mode === "signup") {
    if (!form.name) 
        return "name-required";
    if (!form.confirmPassword) 
        return "confirm-required";
    if (form.password.length < 6) 
        return "password-too-short";
    if (form.password !== form.confirmPassword)
      return "password-mismatch";
  }

  return null;
};

    return {
        mode,
        form,
        error,
        setError,
        updateForm,
        changeMode,
        validateForm,
    };
}
