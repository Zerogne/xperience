// This script can be run to create indexes in your MongoDB database.
// For example, to ensure uniqueness for email, phone, and companyName.

// To run this script:
// 1. Ensure you have Node.js installed.
// 2. Make sure your MONGODB_URI is set in your .env.local file.
// 3. Run: node scripts/create-indexes.js

const mongoose = require("mongoose")
require("dotenv").config({ path: "../.env.local" }) // Adjust path as needed

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    type: { type: String, required: true, enum: ["student", "company", "admin"] },
    profile: {
      // Student Profile Fields
      firstName: { type: String },
      lastName: { type: String },
      phone: { type: String, unique: true, sparse: true }, // sparse: true allows nulls but enforces uniqueness for non-null values
      dateOfBirth: { type: Date },
      gender: { type: String },
      address: { type: String },
      city: { type: String },
      province: { type: String },
      country: { type: String },
      postalCode: { type: String },
      education: { type: String },
      major: { type: String },
      gpa: { type: Number },
      skills: { type: [String] },
      languages: { type: [String] },
      experience: { type: String },
      resumeUrl: { type: String },
      portfolioUrl: { type: String },
      linkedinUrl: { type: String },
      githubUrl: { type: String },
      websiteUrl: { type: String },
      bio: { type: String },
      // Company Profile Fields
      companyName: { type: String, unique: true, sparse: true }, // sparse: true allows nulls but enforces uniqueness for non-null values
      industry: { type: String },
      companySize: { type: String },
      website: { type: String },
      contactPerson: { type: String },
      position: { type: String },
      description: { type: String },
      founded: { type: String },
      specialties: { type: [String] },
      benefits: { type: [String] },
      jobTypes: { type: [String] },
      hiringFrequency: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    jobPostings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { strict: false },
) // strict: false allows for flexible schema for profile

const User = mongoose.models.User || mongoose.model("User", userSchema)

async function createIndexes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected for index creation.")

    // Ensure indexes are created for unique fields
    await User.collection.createIndex({ email: 1 }, { unique: true })
    console.log("Index on email created/ensured.")

    await User.collection.createIndex({ "profile.phone": 1 }, { unique: true, sparse: true })
    console.log("Index on profile.phone created/ensured.")

    await User.collection.createIndex({ "profile.companyName": 1 }, { unique: true, sparse: true })
    console.log("Index on profile.companyName created/ensured.")

    console.log("All specified indexes created successfully.")
  } catch (error) {
    console.error("Error creating indexes:", error)
  } finally {
    await mongoose.disconnect()
    console.log("MongoDB disconnected.")
  }
}

createIndexes()
