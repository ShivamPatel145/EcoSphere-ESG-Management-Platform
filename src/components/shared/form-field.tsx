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
    <div className="space-y-2" {...props}>
      <label className="block text-sm font-medium text-gray-900">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  )
}
