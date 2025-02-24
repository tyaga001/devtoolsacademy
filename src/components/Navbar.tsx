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
    { name: "Tools", path: "/tools" },
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
          ? "bg-neutral-950 shadow-lg border-b border-dashed border-neutral-100/10"
          : "",
        "text-neutral-200 fixed top-0 left-0 w-full z-50"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/">
            <svg
              className="h-8"
              viewBox="0 0 723 212"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M159 53H106L159 0H212V53L159 106V53Z"
                fill="currentColor"
              />
              <path d="M53 53H0L53 0H106V53L53 106V53Z" fill="currentColor" />
              <path
                d="M159 159H106L159 106H212V159L159 212V159Z"
                fill="currentColor"
              />
              <path
                d="M53 159H0L53 106H106V159L53 212V159Z"
                fill="currentColor"
              />
              <path
                d="M276.988 83V21.7487H291.688C301.546 21.7487 308.867 24.4904 313.651 29.9738C318.434 35.399 320.826 42.8658 320.826 52.3743C320.826 61.8829 318.434 69.3789 313.651 74.8623C308.867 80.2874 301.546 83 291.688 83H276.988ZM286.263 74.4248H291.338C298.455 74.4248 303.588 72.4414 306.738 68.4747C309.888 64.4496 311.463 59.0828 311.463 52.3743C311.463 45.6659 309.888 40.3282 306.738 36.3615C303.588 32.3364 298.455 30.3239 291.338 30.3239H286.263V74.4248ZM335.842 83V21.7487H374.956V30.0613H345.117V47.9117H372.331V56.1369H345.117V74.6873H374.956V83H335.842ZM406.422 83L387.522 21.7487H397.497L411.935 70.7497L426.372 21.7487H436.348L417.447 83H406.422ZM464.139 83V30.0613H447.689V21.7487H489.865V30.0613H473.414V83H464.139ZM525.619 84.05C520.66 84.05 516.373 82.7667 512.756 80.1999C509.139 77.6332 506.368 73.9873 504.443 69.2622C502.518 64.5371 501.556 58.9078 501.556 52.3743C501.556 45.8409 502.518 40.2116 504.443 35.4865C506.368 30.7614 509.139 27.1155 512.756 24.5487C516.373 21.982 520.66 20.6986 525.619 20.6986C530.636 20.6986 534.923 21.982 538.482 24.5487C542.098 27.1155 544.869 30.7614 546.794 35.4865C548.719 40.2116 549.682 45.8409 549.682 52.3743C549.682 58.9078 548.719 64.5371 546.794 69.2622C544.869 73.9873 542.098 77.6332 538.482 80.1999C534.923 82.7667 530.636 84.05 525.619 84.05ZM525.619 75.2998C529.994 75.2998 533.523 73.3456 536.207 69.4372C538.89 65.4705 540.232 59.7828 540.232 52.3743C540.232 44.9658 538.89 39.3074 536.207 35.399C533.523 31.4322 529.994 29.4488 525.619 29.4488C521.185 29.4488 517.627 31.4322 514.944 35.399C512.319 39.3074 511.006 44.9658 511.006 52.3743C511.006 59.7828 512.319 65.4705 514.944 69.4372C517.627 73.3456 521.185 75.2998 525.619 75.2998ZM582.461 84.05C577.502 84.05 573.215 82.7667 569.598 80.1999C565.981 77.6332 563.21 73.9873 561.285 69.2622C559.36 64.5371 558.398 58.9078 558.398 52.3743C558.398 45.8409 559.36 40.2116 561.285 35.4865C563.21 30.7614 565.981 27.1155 569.598 24.5487C573.215 21.982 577.502 20.6986 582.461 20.6986C587.478 20.6986 591.765 21.982 595.324 24.5487C598.94 27.1155 601.711 30.7614 603.636 35.4865C605.561 40.2116 606.524 45.8409 606.524 52.3743C606.524 58.9078 605.561 64.5371 603.636 69.2622C601.711 73.9873 598.94 77.6332 595.324 80.1999C591.765 82.7667 587.478 84.05 582.461 84.05ZM582.461 75.2998C586.836 75.2998 590.365 73.3456 593.049 69.4372C595.732 65.4705 597.074 59.7828 597.074 52.3743C597.074 44.9658 595.732 39.3074 593.049 35.399C590.365 31.4322 586.836 29.4488 582.461 29.4488C578.027 29.4488 574.469 31.4322 571.786 35.399C569.161 39.3074 567.848 44.9658 567.848 52.3743C567.848 59.7828 569.161 65.4705 571.786 69.4372C574.469 73.3456 578.027 75.2998 582.461 75.2998ZM620.14 83V21.7487H629.415V74.6873H659.603V83H620.14ZM696.757 84.05C692.441 84.05 688.649 83.2625 685.382 81.6875C682.174 80.1124 679.636 77.8666 677.77 74.9498C675.961 72.0331 675.028 68.5622 674.969 64.5371H684.77C684.828 67.6288 685.878 70.2831 687.92 72.4998C690.02 74.6582 692.937 75.7373 696.67 75.7373C700.112 75.7373 702.795 74.9498 704.72 73.3748C706.645 71.7414 707.608 69.6414 707.608 67.0747C707.608 64.9163 707.024 63.1371 705.858 61.737C704.749 60.2787 702.999 58.9953 700.608 57.887C698.216 56.7203 695.124 55.5244 691.332 54.2994C686.257 52.666 682.524 50.4201 680.132 47.5617C677.74 44.645 676.545 41.0866 676.545 36.8865C676.545 32.0447 678.295 28.1363 681.795 25.1612C685.295 22.1862 690.107 20.6986 696.232 20.6986C702.183 20.6986 706.966 22.2445 710.583 25.3362C714.2 28.3696 716.066 32.5989 716.183 38.024H706.295C706.295 36.5657 705.887 35.1656 705.07 33.8239C704.253 32.4239 703.087 31.2864 701.57 30.4114C700.053 29.478 698.187 29.0113 695.97 29.0113C693.228 28.953 690.924 29.6238 689.057 31.0239C687.191 32.3656 686.257 34.2031 686.257 36.5365C686.257 39.3949 687.395 41.6408 689.67 43.2741C691.945 44.8492 695.649 46.4825 700.783 48.1742C703.991 49.2243 706.82 50.5076 709.27 52.0243C711.779 53.4827 713.733 55.3786 715.133 57.712C716.591 59.987 717.32 62.9037 717.32 66.4621C717.32 69.7289 716.504 72.7039 714.87 75.3873C713.237 78.0124 710.874 80.1124 707.783 81.6875C704.749 83.2625 701.074 84.05 696.757 84.05ZM274.45 188L292.738 126.749H303.763L322.051 188H311.988L307.876 173.3H288.625L284.513 188H274.45ZM297.988 139.874L290.725 165.862H305.776L298.513 139.874H297.988ZM355.268 189.05C350.134 189.05 345.759 187.737 342.142 185.112C338.584 182.487 335.842 178.812 333.917 174.087C332.05 169.304 331.117 163.762 331.117 157.462C331.117 151.103 332.05 145.562 333.917 140.836C335.842 136.053 338.613 132.349 342.23 129.724C345.847 127.04 350.193 125.699 355.268 125.699C361.859 125.699 367.11 127.507 371.018 131.124C374.926 134.682 377.201 139.524 377.843 145.649H367.605C367.08 142.441 365.768 139.786 363.668 137.686C361.626 135.528 358.797 134.449 355.18 134.449C350.572 134.449 346.984 136.491 344.417 140.574C341.851 144.657 340.567 150.287 340.567 157.462C340.567 164.579 341.851 170.179 344.417 174.262C346.984 178.287 350.572 180.3 355.18 180.3C358.914 180.3 361.772 179.337 363.755 177.412C365.739 175.429 367.022 172.833 367.605 169.625H377.843C376.91 175.633 374.547 180.387 370.755 183.887C366.964 187.329 361.801 189.05 355.268 189.05ZM388.134 188L406.422 126.749H417.447L435.735 188H425.672L421.56 173.3H402.309L398.197 188H388.134ZM411.672 139.874L404.41 165.862H419.46L412.197 139.874H411.672ZM447.514 188V126.749H462.214C472.073 126.749 479.394 129.49 484.177 134.974C488.961 140.399 491.352 147.866 491.352 157.374C491.352 166.883 488.961 174.379 484.177 179.862C479.394 185.287 472.073 188 462.214 188H447.514ZM456.789 179.425H461.864C468.981 179.425 474.114 177.441 477.264 173.475C480.414 169.45 481.99 164.083 481.99 157.374C481.99 150.666 480.414 145.328 477.264 141.361C474.114 137.336 468.981 135.324 461.864 135.324H456.789V179.425ZM506.368 188V126.749H545.482V135.061H515.644V152.912H542.857V161.137H515.644V179.687H545.482V188H506.368ZM559.973 188V126.749H569.773L582.461 154.399L595.149 126.749H604.949V188H596.111V144.424L586.136 166.3H578.786L568.811 144.512V188H559.973ZM634.665 188V164.724L614.452 126.749H625.04L639.303 154.924L653.566 126.749H664.153L643.941 164.724V188H634.665ZM675.845 196.313V188H716.445V196.313H675.845Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <div className="hidden items-center md:flex">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="border border-dashed border-transparent px-3 py-2 text-sm font-medium outline-none transition-colors hover:border-neutral-100/10 hover:bg-neutral-800 focus:bg-neutral-800"
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
                className="flex items-center gap-2 border border-dashed border-purple-400 bg-transparent text-purple-400 transition-colors ease-in-out hover:bg-purple-400 hover:text-neutral-900 focus:bg-purple-400 focus:text-neutral-900"
              >
                <FaGithub size={18} />
                <span>Star on GitHub</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center gap-2 border border-dashed border-pink-400 bg-transparent text-pink-400 transition-colors ease-in-out hover:bg-pink-400 hover:text-neutral-900 focus:bg-pink-400 focus:text-neutral-900"
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
              className="inline-flex items-center justify-center p-2 text-purple-400 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400"
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
                className="block px-3 py-2 text-base font-medium transition duration-150 ease-in-out hover:bg-neutral-950"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://github.com/tyaga001/devtoolsacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 text-base font-medium text-purple-400 transition duration-150 ease-in-out hover:bg-neutral-950"
              onClick={toggleMenu}
            >
              <FaGithub className="mr-2 inline-block size-5" />
              Star on GitHub
            </a>
            <Link
              href="/sponsor"
              className="block px-3 py-2 text-base font-medium text-pink-400 transition duration-150 ease-in-out hover:bg-neutral-950"
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
