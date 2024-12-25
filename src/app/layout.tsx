import React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Inter, JetBrains_Mono } from "next/font/google"

import { Analytics } from "@vercel/analytics/react"
import { ClerkProvider } from "@clerk/nextjs"

import Navbar from "@/components/Navbar"
import { SocialMetadata } from "@/components/SocialMetadata"
import { cn } from "@/lib/utils"

import "highlight.js/styles/github-dark.css"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Dev Tools Academy",
    template: "%s | Dev Tools Academy",
  },
  description: "Learn about awesome developer tools",
  metadataBase: new URL("https://devtoolsacademy.com"),
  openGraph: {
    title: "Dev Tools Academy",
    description: "Learn about awesome developer tools",
    url: "https://devtoolsacademy.com",
    siteName: "Dev Tools Academy",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Tools Academy",
    description: "Learn about awesome developer tools",
  },
  icons: [
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon.png",
    },
  ],
}

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

function getTitle(title: Metadata["title"]): string {
  if (typeof title === "string") {
    return title
  } else if (title && typeof title === "object" && "default" in title) {
    return title.default
  }
  return "Dev Tools Academy"
}

export default function RootLayout({ children }: RootLayoutProps) {
  const title = getTitle(metadata.title)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SocialMetadata
          title={title}
          description={
            metadata.description ?? "Learn about awesome developer tools"
          }
          url={
            metadata.metadataBase?.toString() ?? "https://devtoolsacademy.com"
          }
          image={`${metadata.metadataBase?.toString() ?? "https://devtoolsacademy.com"}/favicon.png`}
          type="website"
        />
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
  )
}
