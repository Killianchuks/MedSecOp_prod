import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | MedSecOp",
  description: "MedSecOp's Privacy Policy - How we collect, use, and protect your information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-4">Last Updated: March 15, 2025</p>

          <div className="prose prose-blue max-w-none">
            <h2>Introduction</h2>
            <p>
              At MedSecOp, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our platform for medical second opinions and consultations.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect several types of information from and about users of our platform, including:</p>
            <ul>
              <li>Personal information such as name, email address, phone number, and billing information</li>
              <li>Health information provided for the purpose of obtaining medical second opinions</li>
              <li>Usage data about how you interact with our platform</li>
              <li>Device information including IP address, browser type, and operating system</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Connect you with appropriate medical specialists</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Send you technical notices, updates, security alerts, and support messages</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            </ul>

            <h2>HIPAA Compliance</h2>
            <p>
              As a platform that handles protected health information (PHI), MedSecOp is compliant with the Health
              Insurance Portability and Accountability Act (HIPAA). We implement appropriate physical, technical, and
              administrative safeguards to protect your health information.
            </p>

            <h2>International Data Transfers</h2>
            <p>
              We may transfer, store, and process your information in countries other than your own. We ensure
              appropriate safeguards are in place to protect your information when transferred internationally.
            </p>

            <h2>Your Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul>
              <li>The right to access your personal information</li>
              <li>The right to rectify or update your personal information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to our processing of your personal information</li>
              <li>The right to data portability</li>
            </ul>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at
              privacy@medsecop.com or visit our{" "}
              <a href="/contact-us" className="text-blue-600 hover:text-blue-800">
                Contact Us
              </a>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

