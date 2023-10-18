import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-slate-800 px-8 py-2 text-gray-300">
      <Link href="/" className="text-md flex h-12 items-center font-bold uppercase">
        Next Store
      </Link>
      <div className="flex items-center gap-8">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="rounded-md border border-gray-400 px-3 py-2">Fazer Login</button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  )
}
