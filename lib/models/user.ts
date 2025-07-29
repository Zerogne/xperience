import mongoose, { type Document, Schema } from "mongoose"

// Define interfaces for sub-documents
interface StudentProfile {
  firstName?: string
  lastName?: string
  phone?: string
  dateOfBirth?: Date
  gender?: string
  address?: string
  city?: string
  province?: string
  country?: string
  postalCode?: string
  education?: string
  major?: string
  gpa?: number
  skills?: string[]
  languages?: string[]
  experience?: string
  resumeUrl?: string
  portfolioUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  websiteUrl?: string
  bio?: string
}

interface CompanyProfile {
  companyName?: string
  industry?: string
  companySize?: string
  website?: string
  contactPerson?: string
  position?: string
  phone?: string
  address?: string
  city?: string
  province?: string
  country?: string
  description?: string
  founded?: string
  specialties?: string[]
  benefits?: string[]
  jobTypes?: string[]
  hiringFrequency?: string
}

// Define the main User interface
export interface IUser extends Document {
  email: string
  password?: string // Password can be optional if not always loaded (e.g., after hashing)
  type: "student" | "company" | "admin"
  profile: StudentProfile | CompanyProfile // Union type for profile
  createdAt: Date
  updatedAt: Date
  applications: mongoose.Types.ObjectId[]
  savedJobs: mongoose.Types.ObjectId[]
  jobPostings: mongoose.Types.ObjectId[]
  reviews: mongoose.Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["student", "company", "admin"],
    },
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

// Ensure indexes are created for unique fields at the Mongoose level
// These will be created when the model is first used or when `createIndexes()` is called
userSchema.index({ email: 1 }, { unique: true })
userSchema.index({ "profile.phone": 1 }, { unique: true, sparse: true })
userSchema.index({ "profile.companyName": 1 }, { unique: true, sparse: true })

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema)

export default User
