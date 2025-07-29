"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Users, Building2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StudentRegistration } from "@/components/auth/student-registration"
import { CompanyRegistration } from "@/components/auth/company-registration"

export default function RegisterPage() {
  const searchParams = useSearchParams()
  const [userType, setUserType] = useState<"student" | "company" | null>(null)

  useEffect(() => {
    const type = searchParams.get("type") as "student" | "company"
    if (type) {
      setUserType(type)
    }
  }, [searchParams])

  if (!userType) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8 dark:bg-gray-950">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-900">
          <h1 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-50">Register</h1>
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="company">Company</TabsTrigger>
            </TabsList>
            <TabsContent value="student">
              <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Xperience</h1>
                <p className="text-gray-600">Looking for internships, volunteer work, or part-time opportunities</p>
              </div>

              <div className="space-y-4">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-200"
                  onClick={() => setUserType("student")}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle>I'm a Student</CardTitle>
                    <CardDescription>
                      Looking for internships, volunteer work, or part-time opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="secondary">Find Internships</Badge>
                      <Badge variant="secondary">Build CV</Badge>
                      <Badge variant="secondary">Get Reviews</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </TabsContent>
            <TabsContent value="company">
              <div className="text-center mb-8">
                <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Join Xperience</h1>
                <p className="text-gray-600">Looking to hire talented students for internships and projects</p>
              </div>

              <div className="space-y-4">
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-200"
                  onClick={() => setUserType("company")}
                >
                  <CardHeader className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Building2 className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle>I'm a Company</CardTitle>
                    <CardDescription>Looking to hire talented students for internships and projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Badge variant="secondary">Post Jobs</Badge>
                      <Badge variant="secondary">Find Talent</Badge>
                      <Badge variant="secondary">Manage Applications</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-blue-600 hover:text-blue-700">
                    Sign in
                  </Link>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <Tabs defaultValue="student" className="w-full max-w-2xl">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
        </TabsList>
        <TabsContent value="student">
          <StudentRegistration />
        </TabsContent>
        <TabsContent value="company">
          <CompanyRegistration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
