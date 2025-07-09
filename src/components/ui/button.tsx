
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border-2 border-input bg-background hover:bg-accent/10 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        apple: "bg-gradient-to-b from-blue-600 to-blue-700 text-white hover:shadow-md active:scale-[0.98] shadow-sm",
        "apple-outline": "border-2 border-gray-300 text-gray-700 bg-white/80 backdrop-blur-md hover:bg-gray-50 shadow-sm",
        "apple-secondary": "bg-gradient-to-b from-white to-gray-50 text-gray-800 border-2 border-gray-300 hover:shadow-md backdrop-blur-md",
        "apple-destructive": "bg-gradient-to-b from-red-600 to-red-700 text-white hover:shadow-md active:scale-[0.98] shadow-sm",
        "apple-success": "bg-gradient-to-b from-green-600 to-green-700 text-white hover:shadow-md active:scale-[0.98] shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        apple: "h-11 rounded-full px-8 py-2.5",
        "apple-sm": "h-9 rounded-full px-5 py-2",
        "apple-xs": "h-7 rounded-full px-3 py-1 text-xs",
        "apple-lg": "h-12 rounded-full px-10 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
