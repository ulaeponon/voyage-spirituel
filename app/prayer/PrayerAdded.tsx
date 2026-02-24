"use client";

import { useState } from "react";
import { addPrayer } from "../actions/addPrayer";
import { useRouter } from "next/navigation";

type Props = {
  userId: string;
};

export default function PrayerAdded({ userId }: Props) {
  const [myPrayer, setMyPrayer] = useState<string>("");
  const router = useRouter();
  const handleSavedAddedPrayer = async () => {
    await addPrayer(userId, myPrayer, "USER");
    setMyPrayer("");
    router.refresh();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
      <h2 className="text-xl font-semibold text-[#2F2F2F]"> Ajoute ta prière du jour</h2>
      <textarea
        className="w-full h-48 resize-none rounded-xl border border-gray-200 bg-[#FDFCF9] p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D6B98C] transition"
        placeholder="Ecris ta prière du jour..."
        value={myPrayer}
        onChange={(e) => setMyPrayer(e.target.value)}
      ></textarea>
      <div className="flex justify-end">
        <button
          className=" px-6 py-2 rounded-full bg-[#D6B98C] text-black text-sm font-medium transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleSavedAddedPrayer}
          disabled={!myPrayer.trim()}
        >
          je sauvearde ma priere
        </button>
      </div>
    </div>
  );
}