"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      {/* Animated Blobs */}
      <div className="absolute -top-20 -left-20 h-64 w-64 animate-[animate-blob_10s_ease-in-out_infinite] rounded-full bg-purple-300 opacity-30 mix-blend-multiply blur-xl filter animation-delay-200 dark:bg-purple-700" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 animate-[animate-blob_12s_ease-in-out_infinite] rounded-full bg-blue-300 opacity-30 mix-blend-multiply blur-xl filter animation-delay-500 dark:bg-blue-700" />
      <div className="absolute top-1/4 left-1/4 h-56 w-56 animate-[animate-blob_15s_ease-in-out_infinite] rounded-full bg-pink-300 opacity-30 mix-blend-multiply blur-xl filter animation-delay-800 dark:bg-pink-700" />

      <header className="absolute top-0 z-10 flex w-full items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link className="text-2xl font-bold text-gray-900 dark:text-gray-50" href="#">
            Xperience
          </Link>
        </motion.div>
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="/jobs">
            Jobs
          </Link>
          <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
            About
          </Link>
          <Link className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" href="#">
            Contact
          </Link>
          <Button asChild>
            <Link href="/auth/login">Login</Link>
          </Button>
        </motion.nav>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 md:text-6xl lg:text-7xl"
        >
          Find Your Next Opportunity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl"
        >
          Connecting talented students with leading companies for internships, co-ops, and full-time positions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex gap-4"
        >
          <Button size="lg" asChild>
            <Link href="/auth/register">Join as Student</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/auth/register">Join as Company</Link>
          </Button>
        </motion.div>
      </main>
    </div>
  )
}
