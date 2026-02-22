"use client";
import { BookOpen, Flame, HomeIcon, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar (){

    const pathname = usePathname();
     const linkClass = (path: string) =>
    pathname === path
      ? "flex items-center gap-2 font-semibold text-blue-600"
      : "flex items-center gap-2 text-gray-600";
    return (<nav>
<ul>
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