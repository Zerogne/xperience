import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface ValidatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  validationMessage?: string
  isValid?: boolean
  isChecking?: boolean
  icon?: React.ReactNode
}

const ValidatedInput = React.forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ className, type, label, validationMessage, isValid, isChecking, icon, id, ...props }, ref) => {
    const inputId = React.useId()
    const hasError = isValid === false && validationMessage !== ""

    return (
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor={inputId}>{label}</Label>
        <div className="relative">
          <Input
            type={type}
            className={cn(hasError && "border-destructive focus-visible:ring-destructive", className)}
            id={inputId}
            ref={ref}
            {...props}
          />
          {isChecking && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
          {icon && !isChecking && <div className="absolute right-3 top-1/2 -translate-y-1/2">{icon}</div>}
        </div>
        {hasError && <p className="text-sm font-medium text-destructive">{validationMessage}</p>}
      </div>
    )
  },
)
ValidatedInput.displayName = "ValidatedInput"

export { ValidatedInput }
