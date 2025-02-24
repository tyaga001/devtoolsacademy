import * as React from "react"
import type { Viewport } from "next"
import Script from "next/script"
import { DM_Mono, Mona_Sans } from "next/font/google"
import { ViewTransitions } from "next-view-transitions"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Navbar from "@/components/Navbar"
import { cn } from "@/lib/utils"

import "./globals.css"

const sansFont = Mona_Sans({
  variable: "--sans-font",
  subsets: ["latin"],
})

const monoFont = DM_Mono({
  variable: "--mono-font",
  subsets: ["latin"],
  weight: "500",
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
      <html lang="en" className={cn(sansFont.variable, monoFont.variable)}>
        <head>
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        </head>
        <body className="bg-neutral-950 font-sans text-neutral-200">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />

          <div className="fixed left-[calc((100vw-1280px)/2)] top-0 h-screen border-l border-dashed opacity-10" />
          <div className="fixed right-[calc((100vw-1280px)/2)] top-0 h-screen border-l border-dashed opacity-10" />
        </body>
      </html>
    </ViewTransitions>
  )
}
