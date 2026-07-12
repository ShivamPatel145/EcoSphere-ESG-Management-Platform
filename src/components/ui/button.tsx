'use client'

import * as React from 'react'

type ButtonVariant = 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive'
type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-brand-primary text-white hover:bg-brand-primary-dark',
  outline: 'border border-line bg-surface text-ink hover:bg-hover',
  secondary: 'bg-surface-2 text-ink hover:bg-hover',
  ghost: 'text-ink hover:bg-hover',
  destructive: 'bg-pill-red-fg text-white hover:brightness-95',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-[12.5px]',
  md: 'px-4 py-2 text-[13px]',
  lg: 'px-6 py-3 text-[15px]',
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center rounded-[7px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:ring-offset-1 focus:ring-offset-surface disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className || ''}`}
      {...props}
    />
  ),
)
Button.displayName = 'Button'

export { Button }
