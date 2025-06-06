'use client'

import React from 'react'
import { LogoutButton } from '../LogoutButton'

const baseClass = 'custom-account'

export const Account: React.FC<{
  DefaultAccount: React.ComponentType<any>
  user: any
}> = ({ DefaultAccount, user, ...rest }) => {
  return (
    <div className={baseClass}>
      <DefaultAccount user={user} {...rest} />
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Account Actions</h2>
        <div className="flex items-center gap-4">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}

export default Account
