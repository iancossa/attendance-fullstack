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
        variant === "default" && "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400",
        variant === "secondary" && "bg-gray-100 dark:bg-[#44475a] text-gray-700 dark:text-[#6272a4]",
        variant === "destructive" && "bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400",
        variant === "outline" && "border border-gray-200 dark:border-[#6272a4] text-gray-700 dark:text-[#6272a4]",
        className
      )}
      {...props}
    />
  )
}

export { Badge }