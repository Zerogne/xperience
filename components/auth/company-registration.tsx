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

interface CompanyFormData {
  companyName: string
  industry: string
  companySize: string
  website: string
  contactPerson: string
  position: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  address: string
  city: string
  province: string
  description: string
  founded: string
  specialties: string
  benefits: string
  jobTypes: string
  hiringFrequency: string
}

export function CompanyRegistration() {
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
  const {
    validationState: companyNameValidation,
    isChecking: isCheckingCompanyName,
    validateField: validateCompanyName,
  } = useValidation()

  useEffect(() => {
    if (state?.success) {
      toast({
        title: "Registration Successful",
        description: "You have been registered and logged in.",
      })
      router.replace("/dashboard/company") // Use router.replace for navigation
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
      <input type="hidden" name="type" value="company" />
      <ValidatedInput
        label="Company Name"
        id="companyName"
        name="companyName"
        required
        onBlur={(e) => validateCompanyName("companyName", e.target.value, "company")}
        isValid={companyNameValidation.isValid}
        validationMessage={companyNameValidation.message}
        isChecking={isCheckingCompanyName}
      />
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Input id="industry" name="industry" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companySize">Company Size</Label>
        <Select name="companySize">
          <SelectTrigger id="companySize">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1-10">1-10 employees</SelectItem>
            <SelectItem value="11-50">11-50 employees</SelectItem>
            <SelectItem value="51-200">51-200 employees</SelectItem>
            <SelectItem value="201-500">201-500 employees</SelectItem>
            <SelectItem value="501-1000">501-1000 employees</SelectItem>
            <SelectItem value="1000+">1000+ employees</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input id="website" name="website" type="url" placeholder="https://example.com" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input id="contactPerson" name="contactPerson" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="position">Position</Label>
          <Input id="position" name="position" placeholder="e.g., HR Manager" />
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
        onBlur={(e) => validatePhone("phone", e.target.value, "company")}
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
      <div className="space-y-2">
        <Label htmlFor="description">Company Description</Label>
        <Textarea id="description" name="description" placeholder="Tell us about your company..." rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="founded">Founded Year</Label>
        <Input id="founded" name="founded" placeholder="e.g., 2005" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="specialties">Specialties (comma-separated)</Label>
        <Input id="specialties" name="specialties" placeholder="e.g., AI, Machine Learning, Cloud Computing" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="benefits">Benefits (comma-separated)</Label>
        <Input id="benefits" name="benefits" placeholder="e.g., Health Insurance, Paid Time Off, Remote Work" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="jobTypes">Job Types Offered (comma-separated)</Label>
        <Input id="jobTypes" name="jobTypes" placeholder="e.g., Full-time, Internship, Co-op" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="hiringFrequency">Hiring Frequency</Label>
        <Select name="hiringFrequency">
          <SelectTrigger id="hiringFrequency">
            <SelectValue placeholder="Select frequency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="always">Always Hiring</SelectItem>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="annually">Annually</SelectItem>
            <SelectItem value="as-needed">As Needed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Registering..." : "Register as Company"}
      </Button>
    </form>
  )
}
