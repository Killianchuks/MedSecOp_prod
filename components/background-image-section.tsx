"use client"

import type React from "react"
import Image from "next/image"

interface BackgroundImageSectionProps {
  imageUrl: string
  children: React.ReactNode
  overlayColor?: string
  minHeight?: string
}

export function BackgroundImageSection({
  imageUrl,
  children,
  overlayColor = "bg-black/50",
  minHeight = "min-h-[500px]",
}: BackgroundImageSectionProps) {
  return (
    <div className={`relative ${minHeight} w-full overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src={imageUrl || "/placeholder.svg"} alt="Background" fill className="object-cover" priority />
        <div className={`absolute inset-0 ${overlayColor}`}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}

