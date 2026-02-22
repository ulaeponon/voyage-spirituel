"use client";

import { useState } from "react";

 export default function JournalList(entries: { date: string; content: string }[]) {
  const [openId, setOpenId] = useState<string | null>(null);
    return (
        <div className="journal-list">
            
        </div>
    );
 }