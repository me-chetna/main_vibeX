"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthButton } from "@/components/hackup/auth-button";

const LogoIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-primary"
  >
    <path
      d="M9.87868 7.43934L11.2929 6.02513L16.2678 11L11.2929 15.9749L9.87868 14.5607L13.4393 11L9.87868 7.43934Z"
      fill="currentColor"
    />
    <path
      d="M5.29289 7.43934L6.70711 6.02513L11.6819 11L6.70711 15.9749L5.29289 14.5607L8.85355 11L5.29289 7.43934Z"
      fill="currentColor"
    />
  </svg>
);

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 left-4 right-4 z-50 h-16 rounded-full bg-navbar-gradient p-[2px] shadow-[0_0_25px_#f9731640] md:left-6 md:right-6 md:top-6">
      <div className="relative h-full w-full overflow-hidden rounded-full bg-card/80 backdrop-blur-sm">
        <div className="pointer-events-none absolute -left-40 top-0 h-full w-40 animate-light-sweep bg-gradient-to-b from-yellow-300/0 via-orange-400/50 to-yellow-300/0 blur-xl" />
        <div className="relative z-10 flex h-full items-center justify-between px-2 sm:px-4 md:px-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2"
            prefetch={false}
          >
            <LogoIcon />
            <span className="text-xl font-bold md:text-2xl">VibeX</span>
          </Link>
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/hackup"
              className={`px-2 py-1 text-xs font-semibold transition-colors hover:text-foreground sm:text-sm md:text-base ${
                pathname.startsWith("/hackup")
                  ? "font-bold bg-gradient-to-r from-pink-400 via-red-500 to-orange-500 bg-clip-text text-transparent"
                  : "text-foreground/80"
              }`}
              prefetch={false}
            >
              HackUp
            </Link>
            <Link
              href="/vconnect"
              className={`px-2 py-1 text-xs font-semibold transition-colors hover:text-foreground sm:text-sm md:text-base ${
                pathname.startsWith("/vconnect")
                  ? "font-bold bg-gradient-to-r from-pink-400 via-red-500 to-orange-500 bg-clip-text text-transparent"
                  : "text-foreground/80"
              }`}
              prefetch={false}
            >
              VConnect
            </Link>
            <Link
              href="/quiz"
              className={`px-2 py-1 text-xs font-semibold transition-colors hover:text-foreground sm:text-sm md:text-base ${
                pathname.startsWith("/quiz")
                  ? "font-bold bg-gradient-to-r from-pink-400 via-red-500 to-orange-500 bg-clip-text text-transparent"
                  : "text-foreground/80"
              }`}
              prefetch={false}
            >
              Quiz
            </Link>
          </nav>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
