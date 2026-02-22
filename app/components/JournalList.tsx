"use client";

import { useState } from "react";

type JournalEntry = {
    id: string;
    content: string| null;
    emotion: string| null;
    createdAt: Date;
}
type JournalListProps = {
    entries: JournalEntry[];
}
 export default function JournalList({ entries }: JournalListProps) {
  const [openId, setOpenId] = useState<string | null>(null);
    return (
        <div className="journal-list">
            {entries.map((entry) => (
               <div
  key={entry.id}
  onClick={() =>
    setOpenId(openId === entry.id ? null : entry.id)
  }
 className=" bg-white rounded-2xl shadow-sm p-6 mb-5 cursor-pointer transition hover:shadow-md hover:-translate-y-px">
  <p className="text-xs text-gray-400">
    {new Date(entry.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
  </p>

  {entry.emotion && (
   <span className=" inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#F3E8D9] text-[#8C6F4E]  ">
      {entry.emotion}
    </span>
  )}
<div className="mt-4 text-gray-700 leading-relaxed">
  {openId === entry.id ? (
    <p className="mt-2 text-gray-700">{entry.content}</p>
  ) : (
    <p className="mt-2">
      {entry.content?.slice(0, 120)}...
    </p>
  )}
   </div>
</div>

    ))}
        </div>
    );
 }