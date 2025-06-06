'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

export const LogoutButton: React.FC = () => {
  const router = useRouter()
  
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (res.ok) {
        // Redirect to login page after successful logout
        router.push('/admin/login')
        router.refresh()
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }
  
  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Logout
    </button>
  )
}

export default LogoutButton
