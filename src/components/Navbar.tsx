"use client"

import React, { useState } from "react"
import { Link } from "next-view-transitions"
import { Menu, X, Heart } from "lucide-react"
import { FaGithub } from "react-icons/fa6"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Contribute", path: "/contribute" },
  ]

  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    if (window.scrollY > 50) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      className={cn(
        isScrolled || isMenuOpen
          ? "bg-neutral-950 shadow-lg border-b border-dashed border-neutral-100/15"
          : "",
        "text-neutral-200 fixed top-0 left-0 w-full z-50"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="h-8"
              viewBox="0 0 320 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M240 80H160L240 0H320V80L240 160V80Z" fill="white" />
              <path d="M80 80H0L80 0H160V80L80 160V80Z" fill="white" />
              <path
                d="M240 240H160L240 160H320V240L240 320V240Z"
                fill="white"
              />
              <path d="M80 240H0L80 160H160V240L80 320V240Z" fill="white" />
            </svg>

            <div className="font-mono text-sm uppercase leading-none tracking-wider">
              <p>Devtools</p>
              <p>
                Academy<span className="cursor-blink">_</span>
              </p>
            </div>
          </Link>
          <div className="hidden items-center md:flex">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="border border-dashed border-transparent px-3 py-2 text-sm font-medium outline-none transition-colors hover:border-neutral-100/15 hover:bg-neutral-800 focus:border-neutral-100/15 focus:bg-neutral-800"
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
                className="flex items-center gap-2 border border-dashed border-neutral-200 bg-transparent text-neutral-200 transition-colors ease-in-out hover:bg-neutral-300 hover:text-neutral-900 focus:bg-neutral-300 focus:text-neutral-900"
              >
                <FaGithub size={18} />
                <span>Star on GitHub</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2 border border-dashed border-rose-500 bg-transparent text-rose-500 transition-colors ease-in-out hover:bg-rose-500 hover:text-neutral-900 focus:bg-rose-500 focus:text-neutral-900"
              >
                <Link href="/sponsor">
                  <Heart size={18} />
                  <span>Sponsor</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 text-neutral-200 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
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
                className="block px-3 py-2 text-base font-medium"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://github.com/tyaga001/devtoolsacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-neutral-300"
              onClick={toggleMenu}
            >
              <FaGithub className="mr-2 inline-block size-5" />
              Star on GitHub
            </a>
            <Link
              href="/sponsor"
              className="block px-3 py-2 text-base font-medium text-rose-500"
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
