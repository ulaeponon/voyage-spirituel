"use client";

import { useState } from "react";
import { generatePrayer } from "../actions/prayer";

type Props = {
	userId: string;
};

export default function PrayerUI({ userId }: Props) {
    const [prayerText, setPrayerText] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const handleGeneratePrayer = async () => {
        setLoading(true);
        const prayer = await generatePrayer(userId);
        setPrayerText(prayer);
        setLoading(false);
    }
	return (
		<main className="min-h-screen p-6 space-y-6 bg-[#102c48]">
            <section  className="rounded-2xl bg-[#b2a9be]/20 p-6 shadow-lg text-white">
                <h1>Page de prière</h1>
                <button onClick={handleGeneratePrayer} disabled={loading}>{loading ? "Génération..." : "Générer une prière"}
</button>
                {prayerText && <p className="mt-4">{prayerText}</p>}
            </section>
            <section  className="rounded-2xl bg-[#b2a9be]/20 p-6 shadow-lg text-white" >
                <h2>Mes objectifs d'aujourd'hui</h2>
            </section>
        </main>
	);
}