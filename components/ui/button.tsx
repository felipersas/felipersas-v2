import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, href, ...props }, ref) => {
    const buttonClasses = cn(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      {
        'bg-primary text-primary-foreground hover:bg-primary/90 lofi-glow': variant === 'default',
        'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
      },
      {
        'h-10 px-4 py-2': size === 'default',
        'h-9 rounded-md px-3': size === 'sm',
        'h-11 rounded-lg px-8': size === 'lg',
        'h-10 w-10': size === 'icon',
      },
      className
    )

    if (asChild && href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={buttonClasses}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={buttonClasses}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
