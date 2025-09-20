import * as React from "react"
import { cn } from "../../lib/utils"

const DropdownMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }
>(({ className, open, onOpenChange, children, ...props }, ref) => (
  <div ref={ref} className={cn("relative inline-block", className)} {...props}>
    {children}
  </div>
))
DropdownMenu.displayName = "DropdownMenu"

const DropdownMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center h-8 px-3 rounded-md text-sm font-medium transition-all duration-200 hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      className
    )}
    {...props}
  >
    {children}
  </button>
))
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: 'start' | 'center' | 'end'
  }
>(({ className, align = 'end', ...props }, ref) => {
  const alignmentClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0'
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute mt-1 min-w-48 rounded-md border bg-white dark:bg-[#44475a] border-gray-200 dark:border-[#6272a4] shadow-lg z-50 py-1",
        "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200",
        alignmentClasses[align],
        className
      )}
      {...props}
    />
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    disabled?: boolean
  }
>(({ className, disabled, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center px-3 py-2 text-sm cursor-pointer transition-all duration-200",
      "text-gray-700 dark:text-[#f8f8f2]",
      "hover:bg-orange-50 dark:hover:bg-[#bd93f9]/20 hover:text-orange-600 dark:hover:text-[#bd93f9]",
      "focus:bg-orange-50 dark:focus:bg-[#bd93f9]/20 focus:text-orange-600 dark:focus:text-[#bd93f9] focus:outline-none",
      "mx-1",
      disabled && "opacity-50 cursor-not-allowed hover:bg-transparent",
      className
    )}
    {...props}
  />
))
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("my-1 h-px bg-gray-200 dark:bg-[#6272a4] mx-2", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
}