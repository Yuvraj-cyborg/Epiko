"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import LoginButton from "@/components/login-button" // your actual login logic
import { Bot } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Chat", href: "/chat" },
  ]

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-4 px-8 py-3 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full shadow-lg shadow-black/5 dark:shadow-black/20 w-[600px] justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center bg-black rounded-full">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lm text-Black">Epiko</span>
          </Link>

        {/* Navigation Pills */}
        <div className="flex items-center gap-3">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <motion.div
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
                onHoverStart={() => setHoveredItem(item.name)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {pathname === item.href && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-full border border-white/30 dark:border-white/20"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {hoveredItem === item.name && pathname !== item.href && (
                  <motion.div
                    className="absolute inset-0 bg-white/10 dark:bg-white/5 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
                <span className="relative z-10 text-silver-500 dark:text-silver-500">
                  {item.name}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Right: Theme + Login */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-9 h-9 rounded-full bg-white/10 dark:bg-white/5 hover:bg-white/20 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 flex items-center justify-center relative transition"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>

          {/* Login */}
          <LoginButton />
        </div>
      </motion.div>
    </div>
  )
}
