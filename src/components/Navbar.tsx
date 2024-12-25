"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Menu, X, Heart } from "lucide-react"
import StylizedSiteName from "./StylizedSiteName"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Tools", path: "/tools" },
  ]

  return (
    <nav className="text-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <StylizedSiteName />
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="rounded-md px-3 py-2 text-sm font-medium transition duration-150 ease-in-out hover:bg-neutral-950"
                >
                  {item.name}
                </Link>
              ))}
              <Button
                onClick={() =>
                  window.open(
                    "https://github.com/tyaga001/devtoolsacademy",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                variant="outline"
                className="flex items-center space-x-2 border border-purple-400 bg-transparent text-purple-400 transition duration-150 ease-in-out hover:bg-purple-400 hover:text-neutral-900"
              >
                <Github className="size-5" />
                <span>Star on GitHub</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center space-x-2 border border-pink-400 bg-transparent text-pink-400 transition duration-150 ease-in-out hover:bg-pink-400 hover:text-neutral-900"
              >
                <Link href="/sponsor">
                  <Heart className="size-5" />
                  <span>Sponsor</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-purple-400 hover:bg-neutral-950 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block size-6" aria-hidden="true" />
              ) : (
                <Menu className="block size-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block rounded-md px-3 py-2 text-base font-medium transition duration-150 ease-in-out hover:bg-neutral-950"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://github.com/tyaga001/devtoolsacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md px-3 py-2 text-base font-medium text-purple-400 transition duration-150 ease-in-out hover:bg-neutral-950"
              onClick={toggleMenu}
            >
              <Github className="mr-2 inline-block size-5" />
              Star on GitHub
            </a>
            <Link
              href="/sponsor"
              className="block rounded-md px-3 py-2 text-base font-medium text-pink-400 transition duration-150 ease-in-out hover:bg-neutral-950"
              onClick={toggleMenu}
            >
              <Heart className="mr-2 inline-block size-5" />
              Sponsor
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
