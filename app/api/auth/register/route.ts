import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb } from "@/lib/mongodb" // Import getDb
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, type, profile } = body

    if (!email || !password || !type || !profile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const db = await getDb() // Use getDb to get the database instance
    const users = db.collection("users")

    // Check for duplicate email across all users
    const existingEmailUser = await users.findOne({ email })
    if (existingEmailUser) {
      return NextResponse.json(
        {
          error: "Email already registered",
          field: "email",
          message: "This email address is already associated with an account",
        },
        { status: 400 },
      )
    }

    // Check for duplicate phone number
    const phoneNumber = type === "student" ? profile.phone : profile.phone
    if (phoneNumber) {
      const existingPhoneUser = await users.findOne({
        $or: [
          { "profile.phone": phoneNumber },
          { "profile.phone": phoneNumber.replace(/\s+/g, "") }, // Check without spaces
          { "profile.phone": phoneNumber.replace(/[^\d+]/g, "") }, // Check digits and + only
        ],
      })

      if (existingPhoneUser) {
        return NextResponse.json(
          {
            error: "Phone number already registered",
            field: "phone",
            message: "This phone number is already associated with an account",
          },
          { status: 400 },
        )
      }
    }

    // For companies, also check company name uniqueness
    if (type === "company" && profile.companyName) {
      const existingCompany = await users.findOne({
        type: "company",
        "profile.companyName": { $regex: new RegExp(`^${profile.companyName}$`, "i") },
      })

      if (existingCompany) {
        return NextResponse.json(
          {
            error: "Company name already registered",
            field: "companyName",
            message: "A company with this name is already registered",
          },
          { status: 400 },
        )
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Normalize phone number for storage
    const normalizedProfile = {
      ...profile,
      phone: phoneNumber ? phoneNumber.replace(/[^\d+]/g, "") : undefined,
    }

    // Create user document
    const userData = {
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      type,
      profile: normalizedProfile,
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

    const result = await users.insertOne(userData)

    // Return user data without password
    const { password: _, ...userWithoutPassword } = userData

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: result.insertedId,
        email: userData.email,
        type: userData.type,
      },
      process.env.JWT_SECRET || "fallback-secret",
      { expiresIn: "7d" },
    )

    const response = NextResponse.json(
      {
        message: "User created successfully",
        user: { ...userWithoutPassword, _id: result.insertedId },
        token, // Include token in response for client-side context if needed (though not strictly used by AuthProvider for storage)
      },
      { status: 201 },
    )

    // Set HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
