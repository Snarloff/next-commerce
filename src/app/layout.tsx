import type { Metadata } from 'next'

import { Hydrate } from '@/app/components/Hydrate'
import { Navbar } from '@/app/components/Navbar'
import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import { clsx } from 'clsx'
import { Inter } from 'next/font/google'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next E-Commerce',
  description: 'E-Commerce feito com Next.js versão 13.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider localization={ptBR}>
      <html lang="pt-BR">
        <body className={clsx(inter.className, 'bg-slate-700')}>
          <Hydrate>
            <Navbar />
            <main className="h-screen p-16">{children}</main>
          </Hydrate>
        </body>
      </html>
    </ClerkProvider>
  )
}
