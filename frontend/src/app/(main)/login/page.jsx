'use client'
import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

const Login = () => {
  return (
    <div className="min-h-screen bg-neutral-800/80 flex items-center justify-center p-4 relative">
      <div className="absolute top-4 right-4 z-50">
        <Link href="/" className="text-gray-400 hover:text-white transition bg-white/10 dark:bg-black/20 p-2 rounded-full backdrop-blur-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </Link>
      </div>

      <SignIn routing="hash" signUpUrl="/signup" />
    </div>
  )
}
export default Login
