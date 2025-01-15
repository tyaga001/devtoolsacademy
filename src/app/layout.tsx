import * as React from "react"
import type { Viewport } from "next"
import Script from "next/script"
import { Inter, JetBrains_Mono } from "next/font/google"
import { ViewTransitions } from "next-view-transitions"

import { Analytics } from "@vercel/analytics/react"
import { ClerkProvider } from "@clerk/nextjs"

import Navbar from "@/components/Navbar"
import { cn } from "@/lib/utils"

import "./globals.css"

const sansFont = Inter({
  variable: "--sans-font",
  subsets: ["latin"],
})

const monoFont = JetBrains_Mono({
  variable: "--mono-font",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ViewTransitions>
      <html lang="en">
        <head>
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        </head>
        <body
          className={cn(
            sansFont.variable,
            monoFont.variable,
            "font-sans antialiased bg-neutral-950"
          )}
        >
          <ClerkProvider>
            <Navbar />
            {children}
          </ClerkProvider>
          <Analytics />
        </body>
      </html>
    </ViewTransitions>
  )
}
