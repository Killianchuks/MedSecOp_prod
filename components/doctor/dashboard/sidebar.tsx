"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Settings,
  Headset,
  LogOut,
  Menu,
  X,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navItems = [
  {
    title: "Dashboard",
    href: "/doctor/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: "Appointments",
    href: "/doctor/appointments",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: "Patients",
    href: "/doctor/patients",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Cases",
    href: "/doctor/cases",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Wallet",
    href: "/doctor/wallet",
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    title: "Imaging",
    href: "/doctor/imaging",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Support",
    href: "/doctor/support",
    icon: <Headset className="h-5 w-5" />,
  },
  {
    title: "Settings",
    href: "/doctor/settings",
    icon: <Settings className="h-5 w-5" />,
  },
]

export function DoctorSidebar() {
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
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link href="/doctor/dashboard" className="flex items-center gap-2">
              <Image src="/images/medsecop-logo.png" alt="MedSecOp Logo" width={160} height={45} />
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100",
                )}
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
                <span>Log Out</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

// Add this line to export the component with the expected name
export const DashboardSidebar = DoctorSidebar

