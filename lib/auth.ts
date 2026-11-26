import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db/drizzle"; 
 import * as schema from "@/lib/db/schema"; 
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    baseURL : process.env.BETTER_AUTH_URL,
    emailAndPassword: {
        enabled: true, // On active les comptes par email et mot de passe
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema, // Ajoute ton schéma de DB
    }),
    plugins: [nextCookies()], // Permet de sauvegarder les cookies
})
