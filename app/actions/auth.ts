"use server"

import { getDb } from "@/lib/mongodb"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function registerUser(
  prevState: unknown,
  formData: FormData,
): Promise<{ success: boolean; message: string; error?: string }> {
  const type = formData.get("type") as string
  const email = (formData.get("email") as string)?.toLowerCase().trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!email || !password || !type) {
    return { success: false, message: "Missing required fields." }
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." }
  }

  try {
    const db = await getDb()
    const usersCollection = db.collection("users")

    // Check for duplicate email
    const existingEmailUser = await usersCollection.findOne({ email })
    if (existingEmailUser) {
      return {
        success: false,
        message: "This email address is already associated with an account.",
        error: "email_duplicate",
      }
    }

    let profile: Record<string, unknown> = {}
    let phoneNumber: string | undefined
    let companyName: string | undefined

    if (type === "student") {
      phoneNumber = formData.get("phone") as string
      profile = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        phone: phoneNumber ? phoneNumber.replace(/[^\d+]/g, "") : undefined,
        dateOfBirth: formData.get("dateOfBirth") ? new Date(formData.get("dateOfBirth") as string) : undefined,
        gender: formData.get("gender") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        province: formData.get("province") as string,
        country: formData.get("country") as string,
        postalCode: formData.get("postalCode") as string,
        education: formData.get("education") as string,
        major: formData.get("major") as string,
        gpa: formData.get("gpa") ? Number.parseFloat(formData.get("gpa") as string) : undefined,
        skills: (formData.get("skills") as string)
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        languages: (formData.get("languages") as string)
          ?.split(",")
          .map((l) => l.trim())
          .filter(Boolean),
        experience: formData.get("experience") as string,
        resumeUrl: formData.get("resumeUrl") as string,
        portfolioUrl: formData.get("portfolioUrl") as string,
        linkedinUrl: formData.get("linkedinUrl") as string,
        githubUrl: formData.get("githubUrl") as string,
        websiteUrl: formData.get("websiteUrl") as string,
        bio: formData.get("bio") as string,
      }
    } else if (type === "company") {
      phoneNumber = formData.get("phone") as string
      companyName = formData.get("companyName") as string
      profile = {
        companyName: companyName,
        industry: formData.get("industry") as string,
        companySize: formData.get("companySize") as string,
        website: formData.get("website") as string,
        contactPerson: formData.get("contactPerson") as string,
        position: formData.get("position") as string,
        phone: phoneNumber ? phoneNumber.replace(/[^\d+]/g, "") : undefined,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        province: formData.get("province") as string,
        description: formData.get("description") as string,
        founded: formData.get("founded") as string,
        specialties: (formData.get("specialties") as string)
          ?.split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        benefits: (formData.get("benefits") as string)
          ?.split(",")
          .map((b) => b.trim())
          .filter(Boolean),
        jobTypes: (formData.get("jobTypes") as string)
          ?.split(",")
          .map((j) => j.trim())
          .filter(Boolean),
        hiringFrequency: formData.get("hiringFrequency") as string,
      }

      // Check for duplicate company name
      const existingCompany = await usersCollection.findOne({
        type: "company",
        "profile.companyName": { $regex: new RegExp(`^${companyName}$`, "i") },
      })
      if (existingCompany) {
        return {
          success: false,
          message: "A company with this name is already registered.",
          error: "company_name_duplicate",
        }
      }
    }

    // Check for duplicate phone number (if provided)
    if (phoneNumber) {
      const existingPhoneUser = await usersCollection.findOne({
        $or: [
          { "profile.phone": phoneNumber },
          { "profile.phone": phoneNumber.replace(/\s+/g, "") }, // Check without spaces
          { "profile.phone": phoneNumber.replace(/[^\d+]/g, "") }, // Check digits and + only
        ],
      })
      if (existingPhoneUser) {
        return {
          success: false,
          message: "This phone number is already associated with an account.",
          error: "phone_duplicate",
        }
      }
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const userData = {
      email,
      password: hashedPassword,
      type,
      profile,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...(type === "student"
        ? {
            applications: [],
            savedJobs: [],
            reviews: [],
          }
        : {
            jobPostings: [],
            reviews: [],
          }),
    }

    const result = await usersCollection.insertOne(userData)

    // Generate JWT token and set as HTTP-only cookie
    const token = jwt.sign(
      {
        userId: result.insertedId,
        email: userData.email,
        type: userData.type,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    cookies().set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    })

    return { success: true, message: "User registered successfully!" }
  } catch (error: unknown) {
    console.error("Server Action registration error:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unexpected error occurred.",
    }
  }
}
