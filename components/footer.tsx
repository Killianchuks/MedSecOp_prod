import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="text-white text-2xl font-bold">
              MedSecOp
            </Link>
            <p className="mt-4 text-gray-400">
              Connecting patients with leading medical specialists for expert second opinions.
            </p>
            <div className="flex mt-6 space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/who-we-are" className="text-gray-400 hover:text-white transition-colors">
                  Who We Are
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/second-opinions" className="text-gray-400 hover:text-white transition-colors">
                  Second Opinions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/specialist-consultations"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Specialist Consultations
                </Link>
              </li>
              <li>
                <Link href="/services/treatment-reviews" className="text-gray-400 hover:text-white transition-colors">
                  Treatment Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/services/medical-records-review"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Medical Records Review
                </Link>
              </li>
              <li>
                <Link href="/services/for-physicians" className="text-gray-400 hover:text-white transition-colors">
                  For Physicians
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-gray-400">Email:</span>
                <a href="mailto:info@medsecop.com" className="ml-2 text-gray-400 hover:text-white transition-colors">
                  info@medsecop.com
                </a>
              </li>
              <li className="flex items-center">
                <span className="text-gray-400">Phone:</span>
                <a href="tel:+18001234567" className="ml-2 text-gray-400 hover:text-white transition-colors">
                  +1 (800) 123-4567
                </a>
              </li>
              <li>
                <Link href="/contact-us" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  Contact Us <span className="ml-1">→</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} MedSecOp. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/legal/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms-of-service" className="text-gray-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/legal/cookie-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

