import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 })
  }

  try {
    const decodedToken: unknown = jwt.verify(token, process.env.JWT_SECRET || "fallback-secret")

    const db = await getDb()
    const users = db.collection("users")

    const user = await users.findOne(
      { _id: new ObjectId(decodedToken.userId) },
      { projection: { password: 0 } }, // Exclude password
    )

    if (!user) {
      return NextResponse.json({ isAuthenticated: false }, { status: 401 })
    }

    return NextResponse.json({ isAuthenticated: true, user }, { status: 200 })
  } catch (error) {
    console.error("Token validation failed:", error)
    // Clear the invalid token cookie
    const response = NextResponse.json({ isAuthenticated: false }, { status: 401 })
    response.cookies.delete("token")
    return response
  }
}

export async function POST(request: NextRequest) {
  try {
    const { field, value, type } = await request.json()
    const db = await getDb()
    const users = db.collection("users")

    let query: any = {}
    let message = ""
    let isValid = true

    console.log(`Validating field: ${field}, value: ${value}, type: ${type}`)

    if (field === "email") {
      query = { email: value.toLowerCase().trim() }
      const existingUser = await users.findOne(query)
      if (existingUser) {
        isValid = false
        message = "This email is already in use."
      }
    } else if (field === "phone") {
      const normalizedPhone = value.replace(/[^\d+]/g, "")
      query = {
        $or: [
          { "profile.phone": normalizedPhone },
          { "profile.phone": value }, // Also check original value
        ],
      }
      const existingUser = await users.findOne(query)
      if (existingUser) {
        isValid = false
        message = "This phone number is already in use."
      }
    } else if (field === "companyName" && type === "company") {
      query = {
        type: "company",
        "profile.companyName": { $regex: new RegExp(`^${value}$`, "i") },
      }
      const existingCompany = await users.findOne(query)
      if (existingCompany) {
        isValid = false
        message = "A company with this name is already registered."
      }
    } else {
      isValid = false
      message = "Invalid field for validation."
    }

    console.log(`Validation result for ${field}: ${isValid ? "Valid" : "Invalid"} - ${message}`)
    return NextResponse.json({ isValid, message }, { status: 200 })
  } catch (error) {
    console.error("Validation API error:", error)
    return NextResponse.json({ isValid: false, message: "Internal server error during validation." }, { status: 500 })
  }
}
