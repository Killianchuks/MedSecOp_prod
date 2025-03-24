"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  UserCog,
  LogOut,
  Menu,
  X,
  Headset,
  BookOpen,
  ImageIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"

const navItems = [
  {
    title: "Dashboard",
    href: "/patient/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "My Cases",
    href: "/patient/cases",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Medical Images",
    href: "/patient/images",
    icon: <ImageIcon className="h-5 w-5" />,
  },
  {
    title: "Billing",
    href: "/patient/billing",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Guide",
    href: "/patient/guide",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    title: "Profile Settings",
    href: "/patient/profile",
    icon: <UserCog className="h-5 w-5" />,
  },
  {
    title: "Support",
    href: "/patient/support",
    icon: <Headset className="h-5 w-5" />,
  },
]

export function PatientSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/patient/dashboard" className="flex items-center gap-2">
              <Image src="/images/medsecop-logo.png" alt="MedSecOp Logo" width={160} height={45} />
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full justify-start gap-3" asChild>
              <Link href="/">
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

