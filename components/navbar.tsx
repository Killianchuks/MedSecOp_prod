"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { GetStartedButton } from "@/components/get-started-button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when path changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative h-12 w-36">
              <Image src="/images/medsecop-logo-new.png" alt="MedSecOp Logo" fill style={{ objectFit: "contain" }} />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/who-we-are"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/who-we-are" ? "text-primary" : "text-gray-700"
              }`}
            >
              Who We Are
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/services" || pathname.startsWith("/services/") ? "text-primary" : "text-gray-700"
              }`}
            >
              Services
            </Link>
            <Link
              href="/contact-us"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/contact-us" ? "text-primary" : "text-gray-700"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <GetStartedButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-base font-medium transition-colors hover:text-primary ${
                  pathname === "/" ? "text-primary" : "text-gray-700"
                }`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/who-we-are"
                className={`text-base font-medium transition-colors hover:text-primary ${
                  pathname === "/who-we-are" ? "text-primary" : "text-gray-700"
                }`}
                onClick={closeMenu}
              >
                Who We Are
              </Link>
              <Link
                href="/services"
                className={`text-base font-medium transition-colors hover:text-primary ${
                  pathname === "/services" || pathname.startsWith("/services/") ? "text-primary" : "text-gray-700"
                }`}
                onClick={closeMenu}
              >
                Services
              </Link>
              <Link
                href="/contact-us"
                className={`text-base font-medium transition-colors hover:text-primary ${
                  pathname === "/contact-us" ? "text-primary" : "text-gray-700"
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
              <div className="pt-4 flex flex-col space-y-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/auth/login" onClick={closeMenu}>
                    Login
                  </Link>
                </Button>
                <GetStartedButton onClose={closeMenu} className="w-full" />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

