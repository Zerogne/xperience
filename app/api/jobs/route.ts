import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const db = await getDb()
    const jobsCollection = db.collection("jobs")

    const jobs = await jobsCollection.find({}).toArray()

    return NextResponse.json(jobs, { status: 200 })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await getDb()
    const jobsCollection = db.collection("jobs")
    const usersCollection = db.collection("users")

    const body = await request.json()
    const {
      title,
      companyName,
      location,
      jobType,
      salary,
      description,
      applicationDeadline,
      companyId, // Assuming companyId is passed from the authenticated company user
    } = body

    if (!title || !companyName || !location || !jobType || !description || !companyId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newJob = {
      title,
      companyName,
      location,
      jobType,
      salary: salary || null,
      description,
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : null,
      companyId: new ObjectId(companyId),
      postedAt: new Date(),
      applicants: [], // Array to store student IDs who applied
    }

    const result = await jobsCollection.insertOne(newJob)

    // Optionally, update the company's jobPostings array
    await usersCollection.updateOne({ _id: new ObjectId(companyId) }, { $push: { jobPostings: result.insertedId } })

    return NextResponse.json({ message: "Job posted successfully", job: newJob }, { status: 201 })
  } catch (error) {
    console.error("Error posting job:", error)
    return NextResponse.json({ error: "Failed to post job" }, { status: 500 })
  }
}
