"use server";

import OpenAI from "openai";

const openai= new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function generatePrayer(userId: string) {
    try {
 const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
        { role:"system",
            content:  "Tu es un assistant spirituel chrétien doux et encourageant. Tu écris des prières introspectives pour des femmes cherchant paix, confiance et guidance divine.",
         },
        { role: "user",
            content:  "Génère une prière du jour courte (150-200 mots), inspirante et profonde.",
 }],
 });
const prayer =
  completion.choices[0]?.message?.content ??
  "Que Dieu t'accompagne aujourd'hui dans chacune de tes décisions.";
return prayer;
}
catch (error) {
    console.error("Erreur lors de la génération de la prière:", error);
return "Une erreur est survenue lors de la génération."
}}