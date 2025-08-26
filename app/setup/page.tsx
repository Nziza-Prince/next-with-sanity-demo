// app/setup/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  const createDemoUser = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@news.com',
          password: 'password123',
          name: 'Admin User',
          role: 'ADMIN'
        }),
      })

      if (response.ok) {
        setMessage('Demo admin user created successfully! You can now sign in.')
      } else {
        const error = await response.json()
        setMessage(error.error || 'Something went wrong')
      }
    } catch (error) {
      setMessage('Failed to create demo user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Setup Demo Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create a demo admin account to access the admin portal
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={createDemoUser}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Demo Admin'}
          </button>

          {message && (
            <div className={`p-3 rounded-md ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <div className="text-center">
            <button
              onClick={() => router.push('/auth/signin')}
              className="text-blue-600 hover:text-blue-800"
            >
              Go to Sign In →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}