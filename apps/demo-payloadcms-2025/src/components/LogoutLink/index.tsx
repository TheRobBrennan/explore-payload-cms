'use client'

import React from 'react'
import Link from 'next/link'

export const LogoutLink: React.FC = () => {
  return (
    <Link 
      href="/admin/logout"
      className="inline-block px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Logout
    </Link>
  )
}

export default LogoutLink
