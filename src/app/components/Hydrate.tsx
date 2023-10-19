'use client'

import { useEffect, useState } from 'react'

export function Hydrate({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? <>{children}</> : <span />
}
