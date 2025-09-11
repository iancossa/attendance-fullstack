import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          variant === "default" && "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 shadow-sm hover:shadow-md",
          variant === "destructive" && "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:text-destructive-foreground dark:hover:bg-destructive/90 shadow-sm hover:shadow-md",
          variant === "outline" && "border border-input bg-background hover:bg-accent hover:text-accent-foreground dark:border-border dark:bg-background dark:hover:bg-accent dark:hover:text-accent-foreground",
          variant === "secondary" && "bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary dark:text-secondary-foreground dark:hover:bg-secondary/80",
          variant === "ghost" && "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent dark:hover:text-accent-foreground",
          variant === "link" && "text-primary underline-offset-4 hover:underline dark:text-primary",
          size === "default" && "h-9 sm:h-10 px-3 sm:px-4 py-2 text-xs sm:text-sm",
          size === "sm" && "h-8 sm:h-9 rounded-md px-2 sm:px-3 text-xs",
          size === "lg" && "h-10 sm:h-11 rounded-md px-6 sm:px-8 text-sm sm:text-base",
          size === "icon" && "h-9 w-9 sm:h-10 sm:w-10",
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