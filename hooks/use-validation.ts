"use client"

import { useState, useCallback } from "react"

interface ValidationResult {
  isValid: boolean
  message: string
}

export function useValidation() {
  const [validationState, setValidationState] = useState<ValidationResult>({
    isValid: true,
    message: "",
  })
  const [isChecking, setIsChecking] = useState(false)

  const validateField = useCallback(async (field: string, value: string, type?: string) => {
    if (!value) {
      setValidationState({ isValid: true, message: "" })
      return
    }

    setIsChecking(true)
    try {
      const response = await fetch("/api/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ field, value, type }),
      })
      const data: ValidationResult = await response.json()
      setValidationState(data)
    } catch (error) {
      console.error(`Error validating ${field}:`, error)
      setValidationState({
        isValid: false,
        message: "Validation failed due to a network error.",
      })
    } finally {
      setIsChecking(false)
    }
  }, [])

  return { validationState, isChecking, validateField }
}
