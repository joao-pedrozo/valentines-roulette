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
        <div className="flex items-center gap- mr-2">
          <Heart className="h-6 w-6 text-red-500 mr-1" fill="red" />
          <span className="text-xl font-bold text-red-600 dark:text-red-500">us</span>
        </div>

        <nav className="flex items-center gap-3 md:gap-6">
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
            nós
          </Link>
          <Link
            href="/roleta"
            className={`text-sm font-medium transition-colors hover:text-red-600 dark:hover:text-red-500 ${
              pathname === "/roleta" ? "text-red-600 dark:text-red-500" : "text-gray-600 dark:text-[#e0e0e0]"
            }`}
          >
            roleta
          </Link>
          <Link
            href="/anel"
            className={`text-sm font-medium transition-colors hover:text-yellow-500 dark:hover:text-yellow-300 ${
              pathname === "/anel" ? "text-yellow-600 dark:text-yellow-300" : "text-gray-600 dark:text-[#e0e0e0]"
            }`}
          >
            aliança
          </Link>
          <Link
            href="/notas"
            className={`text-sm font-medium transition-colors hover:text-gray-600 dark:hover:text-gray-300 ${
              pathname === "/notas" ? "text-gray-600 dark:text-gray-300" : "text-gray-600 dark:text-[#e0e0e0]"
            }`}
          >
            notas
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
