"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-pink-200 dark:border-[#1a1a1a] bg-white/80 dark:bg-[#080808]/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500" fill="red" />
          <span className="text-xl font-bold text-red-600 dark:text-red-500">nosso dia</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-red-600 dark:hover:text-red-500 ${
              pathname === "/" ? "text-red-600 dark:text-red-500" : "text-gray-600 dark:text-[#e0e0e0]"
            }`}
          >
            home
          </Link>
          <Link
            href="/fotos"
            className={`text-sm font-medium transition-colors hover:text-red-600 dark:hover:text-red-500 ${
              pathname === "/fotos" ? "text-red-600 dark:text-red-500" : "text-gray-600 dark:text-[#e0e0e0]"
            }`}
          >
            memórias
          </Link>
          <Link
            href="/roleta"
            className={`text-sm font-medium transition-colors hover:text-red-600 dark:hover:text-red-500 ${
              pathname === "/roleta" ? "text-red-600 dark:text-red-500" : "text-gray-600 dark:text-[#e0e0e0]"
            }`}
          >
            roleta
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
