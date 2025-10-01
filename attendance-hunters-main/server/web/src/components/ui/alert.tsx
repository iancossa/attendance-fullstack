import * as React from "react"
import { cn } from "../../lib/utils"

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "destructive" | "success" | "warning"
  }
>(({ className, variant = "default", ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(
      "relative w-full rounded-lg border p-3 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-3 [&>svg]:top-3 [&>svg]:h-4 [&>svg]:w-4",
      variant === "default" && "bg-orange-50 dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] border-orange-200 dark:border-[#6272a4] [&>svg]:text-orange-600 dark:[&>svg]:text-orange-400",
      variant === "destructive" && "border-red-200 dark:border-red-500/30 text-red-800 dark:text-red-300 bg-red-50 dark:bg-red-500/10 [&>svg]:text-red-600 dark:[&>svg]:text-red-400",
      variant === "success" && "border-green-200 dark:border-green-500/30 text-green-800 dark:text-green-300 bg-green-50 dark:bg-green-500/10 [&>svg]:text-green-600 dark:[&>svg]:text-green-400",
      variant === "warning" && "border-orange-200 dark:border-orange-500/30 text-orange-800 dark:text-orange-300 bg-orange-50 dark:bg-orange-500/10 [&>svg]:text-orange-600 dark:[&>svg]:text-orange-400",
      className
    )}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight text-sm", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }