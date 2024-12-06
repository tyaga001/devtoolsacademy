'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Github, Menu, X, Heart } from 'lucide-react';
import StylizedSiteName from './StylizedSiteName';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: 'Tools', path: '/tools' }
  ];

  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <StylizedSiteName />
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition duration-150 ease-in-out"
                >
                  {item.name}
                </Link>
              ))}
              <Button
                onClick={() => window.open("https://github.com/tyaga001/devtoolsacademy", "_blank", "noopener,noreferrer")}
                variant="outline"
                className="flex items-center space-x-2 bg-transparent border border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-gray-900 transition duration-150 ease-in-out"
              >
                <Github className="w-5 h-5" />
                <span>Star on GitHub</span>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex items-center space-x-2 bg-transparent border border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-gray-900 transition duration-150 ease-in-out"
              >
                <Link href="/sponsor">
                  <Heart className="w-5 h-5" />
                  <span>Sponsor</span>
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-400"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 transition duration-150 ease-in-out"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <a
              href="https://github.com/tyaga001/devtoolsacademy"
              target="_blank"
              rel="noopener noreferrer"
              className="block px-3 py-2 rounded-md text-base font-medium text-purple-400 hover:bg-gray-800 transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              <Github className="inline-block mr-2 h-5 w-5" />
              Star on GitHub
            </a>
            <Link
              href="/sponsor"
              className="block px-3 py-2 rounded-md text-base font-medium text-pink-400 hover:bg-gray-800 transition duration-150 ease-in-out"
              onClick={toggleMenu}
            >
              <Heart className="inline-block mr-2 h-5 w-5" />
              Sponsor
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
