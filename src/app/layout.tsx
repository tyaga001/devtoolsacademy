import * as React from "react"
import type { Viewport } from "next"
import Script from "next/script"
import { headers } from "next/headers"
import { DM_Mono, Mona_Sans } from "next/font/google"
import { ViewTransitions } from "next-view-transitions"

import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { cn } from "@/lib/utils"
import config from "@/lib/metadata"

import "./globals.css"

const sansFont = Mona_Sans({
  variable: "--sans-font",
  subsets: ["latin"],
  display: "swap",
})

const monoFont = DM_Mono({
  variable: "--mono-font",
  subsets: ["latin"],
  weight: "500",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
}

interface RootLayoutProps {
  children: React.ReactNode
}

function CanonicalLink() {
  const headersList = headers()
  const path = headersList.get("next-url") ?? "/"
  const canonicalUrl = `${config.baseUrl}${path}`

  return <link rel="canonical" href={canonicalUrl} />
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ViewTransitions>
      <html lang="en" className={cn(sansFont.variable, monoFont.variable)}>
        <head>
          <CanonicalLink />
          <Script
            src="https://cloud.umami.is/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        </head>
        <body className="bg-neutral-950 font-sans text-neutral-200">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-neutral-100 focus:px-4 focus:py-2 focus:text-neutral-900"
          >
            Skip to content
          </a>
          <Navbar />
          <div id="main-content" tabIndex={-1} className="min-h-screen">
            {children}
          </div>
          <Footer />

          <div className="fixed left-[calc((100vw-1280px)/2)] top-0 h-screen border-l border-dashed border-neutral-100/15" />
          <div className="fixed right-[calc((100vw-1280px)/2)] top-0 h-screen border-l border-dashed border-neutral-100/15" />

          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ViewTransitions>
  )
}
