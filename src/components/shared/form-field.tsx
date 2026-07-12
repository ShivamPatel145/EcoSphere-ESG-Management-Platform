'use client'

import { FieldError } from 'react-hook-form'

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  error?: FieldError
  required?: boolean
  children: React.ReactNode
}

export function FormField({ label, error, required, children, ...props }: FormFieldProps) {
  return (
    <div className="space-y-1.5" {...props}>
      <label className="block text-[12px] font-semibold text-ink">
        {label}
        {required && <span className="ml-1 text-pill-red-fg">*</span>}
      </label>
      {children}
      {error && <p className="text-[12px] text-pill-red-fg">{error.message}</p>}
    </div>
  )
}
