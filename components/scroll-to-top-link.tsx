"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

interface ScrollToTopLinkProps {
  href: string
  children: ReactNode
  className?: string
  params?: Record<string, string>
}

export function ScrollToTopLink({ href, children, className, params }: ScrollToTopLinkProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Add query parameters if provided
    let targetUrl = href
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString()
      targetUrl = `${href}?${queryString}`
    }

    // Navigate after a short delay to ensure scroll completes
    setTimeout(() => {
      router.push(targetUrl)
    }, 300)
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  )
}

