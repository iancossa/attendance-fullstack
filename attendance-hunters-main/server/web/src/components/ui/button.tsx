import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700",
          variant === "destructive" && "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700",
          variant === "outline" && "border border-gray-200 dark:border-[#6272a4] bg-white dark:bg-[#44475a] hover:bg-gray-50 dark:hover:bg-[#6272a4] text-gray-900 dark:text-[#f8f8f2]",
          variant === "secondary" && "bg-gray-100 dark:bg-[#44475a] text-gray-900 dark:text-[#f8f8f2] hover:bg-gray-200 dark:hover:bg-[#6272a4]",
          variant === "ghost" && "text-gray-600 dark:text-[#6272a4] hover:bg-gray-100 dark:hover:bg-[#44475a] hover:text-gray-900 dark:hover:text-[#f8f8f2]",
          variant === "link" && "text-orange-500 dark:text-orange-400 underline-offset-4 hover:underline",
          size === "default" && "h-9 px-3",
          size === "sm" && "h-9 px-2 text-xs",
          size === "icon" && "h-9 w-9",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }