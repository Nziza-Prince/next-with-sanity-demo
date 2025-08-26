// app/admin/page.tsx
'use client'

import SignOutButton from '@/components/SignOutButton'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const redirectToStudio = () => {
    window.open(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333', '_blank')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {session.user?.name}</span>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {session.user?.role}
            </span>
            <button
              onClick={() => router.push('/')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
            >
              View Site
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
  <span className="text-gray-700">Welcome, {session.user?.name}</span>
  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
    {session.user?.role}
  </span>
  <button
    onClick={() => router.push('/')}
    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
  >
    View Site
  </button>
  <SignOutButton />
</div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Content Management</h2>
            <button
              onClick={redirectToStudio}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-center"
            >
              Open Sanity Studio
            </button>
            <p className="mt-2 text-sm text-gray-600">
              Create and manage articles, authors, and categories
            </p>
          </div>

          {/* User Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-900 mb-4">User Information</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {session.user?.name}</p>
              <p><span className="font-medium">Email:</span> {session.user?.email}</p>
              <p><span className="font-medium">Role:</span> {session.user?.role}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Articles</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Published Today</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Authors</span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}