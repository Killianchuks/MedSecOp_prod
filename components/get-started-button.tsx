"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface GetStartedButtonProps {
  className?: string
  onClose?: () => void
}

export function GetStartedButton({ className, onClose }: GetStartedButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  return (
    <div className="relative">
      <Button onClick={toggleDropdown} className={cn("relative", className)}>
        Get Started
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <Link
              href="/auth/patient/signup"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleOptionClick}
            >
              I&apos;m a Patient
            </Link>
            <Link
              href="/auth/doctor/signup"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleOptionClick}
            >
              I&apos;m a Doctor
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

