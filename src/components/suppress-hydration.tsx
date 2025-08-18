"use client"

import type React from "react"

interface SuppressHydrationProps {
  children: React.ReactNode
}

export default function SuppressHydration({ children }: SuppressHydrationProps) {
  return <div suppressHydrationWarning>{children}</div>
}
