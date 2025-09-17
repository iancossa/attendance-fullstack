import * as React from "react"
import { cn } from "../../lib/utils"

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "spinner" | "dots" | "pulse"
  fullScreen?: boolean
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, size = "md", variant = "spinner", fullScreen = false, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-4 w-4",
      md: "h-8 w-8", 
      lg: "h-16 w-16",
      xl: "h-32 w-32"
    }

    const containerClasses = fullScreen 
      ? "min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-foreground" 
      : "flex items-center justify-center"

    if (variant === "dots") {
      return (
        <div ref={ref} className={cn(containerClasses, className)} {...props}>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-primary animate-pulse",
                  size === "sm" && "h-2 w-2",
                  size === "md" && "h-3 w-3",
                  size === "lg" && "h-4 w-4",
                  size === "xl" && "h-6 w-6"
                )}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      )
    }

    if (variant === "pulse") {
      return (
        <div ref={ref} className={cn(containerClasses, className)} {...props}>
          <div className={cn(
            "rounded-full bg-primary animate-pulse",
            sizeClasses[size]
          )} />
        </div>
      )
    }

    return (
      <div ref={ref} className={cn(containerClasses, className)} {...props}>
        <div
          className={cn(
            "animate-spin rounded-full border-2 border-muted border-t-primary dark:border-muted-foreground dark:border-t-primary transition-colors",
            sizeClasses[size]
          )}
        />
      </div>
    )
  }
)
Loading.displayName = "Loading"

export { Loading }