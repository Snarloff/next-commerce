import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-slate-800 px-8 py-2 text-gray-300">
      <Link href="/" className="text-md flex h-12 items-center font-bold uppercase">
        Next Store
      </Link>
    </nav>
  )
}
