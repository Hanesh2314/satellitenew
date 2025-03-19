import * as React from "react"
import { OTPInput } from "input-otp"
import { Dot } from "lucide-react"
import { cn } from "@/lib/utils"

interface OTPContextType {
  register: (index: number) => void
  unregister: (index: number) => void
  setCharacter: (index: number, character: string) => void
  hasFocus: boolean
  isComplete: boolean
  slots: Array<{
    char: string
    hasFakeCaret: boolean
    isActive: boolean
  }>
}

const OTPInputContext = React.createContext<OTPContextType>({
  register: () => {},
  unregister: () => {},
  setCharacter: () => {},
  hasFocus: false,
  isComplete: false,
  slots: []
})

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { index: number }
>(({ index, className, ...props }, ref) => {
  const { register, unregister, setCharacter, hasFocus, isComplete, slots } = React.useContext(OTPInputContext)
  const [isFocused, setIsFocused] = React.useState(false)

  React.useEffect(() => {
    register(index)
    return () => {
      unregister(index)
    }
  }, [index, register, unregister])

  const slot = slots[index]

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-10 w-10 rounded-md text-sm shadow-sm transition-all",
        "border border-input bg-background ring-offset-background",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        isComplete && "border-green-500",
        className
      )}
      {...props}
    >
      <input
        type="text"
        pattern="\d*"
        maxLength={1}
        className={cn(
          "absolute inset-0 h-full w-full rounded-md bg-transparent p-0 text-center",
          "text-base text-foreground caret-transparent outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50"
        )}
        onChange={(e) => setCharacter(index, e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        disabled={!hasFocus}
        autoComplete="one-time-code"
        aria-label={`Digit ${index + 1}`}
      />
      {!isFocused && !slot?.char && <Dot className="mx-auto h-4 w-4 text-muted-foreground" />}
    </div>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

export { InputOTP, InputOTPGroup, InputOTPSlot }
