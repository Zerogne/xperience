"use client"

import { useState, useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
import { ValidatedInput } from "@/components/ui/validated-input"
import { useValidation } from "@/hooks/use-validation"
import { registerUser } from "@/app/actions/auth" // Import the server action

interface StudentFormData {
  firstName: string
  lastName: string
  phone: string
  email: string
  password: string
  confirmPassword: string
  dateOfBirth: string
  gender: string
  address: string
  city: string
  province: string
  country: string
  postalCode: string
  education: string
  major: string
  gpa: string
  skills: string
  languages: string
  experience: string
  resumeUrl: string
  portfolioUrl: string
  linkedinUrl: string
  githubUrl: string
  websiteUrl: string
  bio: string
}

export function StudentRegistration() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [state, formAction, isPending] = useActionState(registerUser, null)

  const {
    validationState: emailValidation,
    isChecking: isCheckingEmail,
    validateField: validateEmail,
  } = useValidation()
  const {
    validationState: phoneValidation,
    isChecking: isCheckingPhone,
    validateField: validatePhone,
  } = useValidation()

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Registration Successful",
        description: "You have been registered and logged in.",
      })
      router.replace("/dashboard/student") // Use router.replace for navigation
    } else if (state?.error) {
      toast({
        title: "Registration Failed",
        description: state.message || "An error occurred during registration.",
        variant: "destructive",
      })
    }
  }, [state, toast, router])

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="type" value="student" />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" required />
        </div>
      </div>
      <ValidatedInput
        label="Email"
        id="email"
        name="email"
        type="email"
        placeholder="m@example.com"
        required
        onBlur={(e) => validateEmail("email", e.target.value)}
        isValid={emailValidation.isValid}
        validationMessage={emailValidation.message}
        isChecking={isCheckingEmail}
      />
      <ValidatedInput
        label="Phone Number"
        id="phone"
        name="phone"
        type="tel"
        placeholder="+1 (555) 123-4567"
        onBlur={(e) => validatePhone("phone", e.target.value, "student")}
        isValid={phoneValidation.isValid}
        validationMessage={phoneValidation.message}
        isChecking={isCheckingPhone}
      />
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input id="password" name="password" type={showPassword ? "text" : "password"} required />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
            <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input id="dateOfBirth" name="dateOfBirth" type="date" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select name="gender">
          <SelectTrigger id="gender">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-binary</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" name="city" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Input id="province" name="province" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input id="country" name="country" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input id="postalCode" name="postalCode" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Input id="education" name="education" placeholder="e.g., University of Toronto" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="major">Major</Label>
        <Input id="major" name="major" placeholder="e.g., Computer Science" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="gpa">GPA (Optional)</Label>
        <Input id="gpa" name="gpa" type="number" step="0.01" placeholder="e.g., 3.8" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="skills">Skills (comma-separated)</Label>
        <Input id="skills" name="skills" placeholder="e.g., JavaScript, React, Node.js" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="languages">Languages (comma-separated)</Label>
        <Input id="languages" name="languages" placeholder="e.g., English, French" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="experience">Experience</Label>
        <Textarea id="experience" name="experience" placeholder="Describe your work experience..." rows={3} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="resumeUrl">Resume URL (Optional)</Label>
        <Input id="resumeUrl" name="resumeUrl" type="url" placeholder="https://your-resume.com/resume.pdf" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="portfolioUrl">Portfolio URL (Optional)</Label>
        <Input id="portfolioUrl" name="portfolioUrl" type="url" placeholder="https://your-portfolio.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="linkedinUrl">LinkedIn URL (Optional)</Label>
        <Input id="linkedinUrl" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/yourprofile" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="githubUrl">GitHub URL (Optional)</Label>
        <Input id="githubUrl" name="githubUrl" type="url" placeholder="https://github.com/yourprofile" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="websiteUrl">Personal Website URL (Optional)</Label>
        <Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://your-website.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" name="bio" placeholder="Tell us about yourself..." rows={4} />
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Registering..." : "Register as Student"}
      </Button>
    </form>
  )
}
