'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (!result?.ok) {
        setError('Invalid email or password')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-primary text-white flex-col justify-between p-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">EcoSphere</h1>
          <p className="text-lg text-brand-primary/90">
            ESG data, employee action and gamified engagement — in one system of record.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm text-brand-primary/70">Environmental Impact</div>
            <div className="text-3xl font-bold">2,450 tCO₂e</div>
            <div className="text-sm text-brand-primary/70">emissions tracked</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-brand-primary/70">Employee Engagement</div>
            <div className="text-3xl font-bold">8,920</div>
            <div className="text-sm text-brand-primary/70">active participants</div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-brand-primary/70">Compliance Status</div>
            <div className="text-3xl font-bold">98%</div>
            <div className="text-sm text-brand-primary/70">audit compliance</div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-brand-background">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-brand-text mb-2">Welcome back</h2>
          <p className="text-gray-600 mb-8">Sign in to your ESG management platform</p>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-text mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-white py-2 rounded-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Demo credentials: admin@ecosphere.dev / demo1234
          </p>
        </div>
      </div>
    </div>
  )
}
