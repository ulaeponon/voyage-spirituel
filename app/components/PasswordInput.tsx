"use client";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
type PasswordInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
  error?: string;
};
export default function PasswordInput({ value, onChange, placeholder, name, error }: PasswordInputProps) {
const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
  setShowPassword(previous => !previous);
};
 return(<div className="relative">
    <input
    name={name}
    type={showPassword ? "text" : "password"}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full bg-gray-100 rounded-2xl px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${error ? "border border-red-500" : ""}`}
    />
    <button
      type="button"
      onClick={togglePasswordVisibility}
      aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      {showPassword ? <Eye /> : <EyeOff />}
    </button>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
 </div>)
}