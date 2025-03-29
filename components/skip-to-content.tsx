"use client"

import { useEffect, useState } from "react"

export function SkipToContent() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-background focus:border focus:border-primary focus:rounded-md"
    >
      Skip to main content
    </a>
  )
}

