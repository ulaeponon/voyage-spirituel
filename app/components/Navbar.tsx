"use client";
import { BookOpen, Flame, HomeIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar (){

    const pathname = usePathname();
    const linkClass = (path: string) =>
  pathname === path
    ? "flex items-center justify-center w-12 h-12 rounded-full bg-[#d4be95] text-[#102c48] transition-all duration-300"
    : "flex items-center justify-center w-12 h-12 rounded-full text-white/70 hover:text-white transition-all duration-300";
    return (
    <nav className="fixed bottom-6 left_1/2 translate-x-1/2 z-50">
<ul className="flex items-center gap-8 bg-[#102c48]/95 backdrop-blur-md px-8 py-4 rounded-full shadow-xl border border-white/10">
    <li>
        <Link href="/" className={linkClass("/")}>
        <HomeIcon size={18}/>
        </Link>
    </li>
    <li>
        <Link href="/journal" className={linkClass("/journal")}>
        <BookOpen size={18} />
        </Link>
    </li>

    <li>
        <Link href="/prayer" className={linkClass("/prayer")}>
        <Flame size={18} />
        </Link>
    </li>
    <li>
        <Link href="/profil" className={linkClass("/profil")}>
        <UserCircle size={18} />
        </Link>
    </li>
</ul>
    </nav>);
}