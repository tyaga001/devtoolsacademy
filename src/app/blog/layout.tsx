import * as React from "react"
import { ClerkProvider } from "@clerk/nextjs"

import Navbar from "@/components/Navbar"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <Navbar />
      {children}
    </ClerkProvider>
  )
}
