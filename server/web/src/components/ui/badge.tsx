import * as React from "react"
import { cn } from "../../lib/utils"

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap",
        variant === "default" && "bg-orange-100 text-orange-700",
        variant === "secondary" && "bg-gray-100 text-gray-700",
        variant === "destructive" && "bg-red-100 text-red-700",
        variant === "outline" && "border border-gray-200 text-gray-700",
        className
      )}
      {...props}
    />
  )
}

export { Badge }