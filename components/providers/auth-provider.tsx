"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

interface User {
  _id: string
  email: string
  type: "student" | "company" | "admin"
  profile: {
    _id: string
    name: string
    email: string
    type: "student" | "company" | "admin"
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (token: string) => void
  logout: () => void
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const checkAuth = useCallback(async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/validate")
      if (response.ok) {
        const data: { user: User } = await response.json()
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Authentication check failed:", error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const login = useCallback(
    (token: string) => {
      // In a real app, you might store the token in localStorage or a cookie
      // For this example, we'll just re-check auth which will read the HTTP-only cookie
      checkAuth()
      // Redirect based on user type after login
      if (user?.type === "student") {
        router.replace("/dashboard/student")
      } else if (user?.type === "company") {
        router.replace("/dashboard/company")
      } else if (user?.type === "admin") {
        router.replace("/admin")
      } else {
        // Default redirect if type is not immediately available or unknown
        router.replace("/dashboard/student")
      }
    },
    [checkAuth, router, user?.type],
  )

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      setUser(null)
      router.replace("/auth/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }, [router])

  return <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
