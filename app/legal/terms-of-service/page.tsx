import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | MedSecOp",
  description: "MedSecOp's Terms of Service - The rules and guidelines for using our platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-gray-600 mb-4">Last Updated: March 15, 2025</p>

          <div className="prose prose-blue max-w-none">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the MedSecOp platform, you agree to be bound by these Terms of Service. If you
              disagree with any part of the terms, you may not access the service.
            </p>

            <h2>Description of Service</h2>
            <p>
              MedSecOp provides a platform connecting patients with medical specialists for second opinions and
              consultations. Our services include facilitating the secure transfer of medical records, arranging
              consultations, and providing a platform for communication between patients and specialists.
            </p>

            <h2>Medical Disclaimer</h2>
            <p>
              The information provided through MedSecOp is not a substitute for professional medical advice, diagnosis,
              or treatment. Always seek the advice of your physician or other qualified health provider with any
              questions you may have regarding a medical condition.
            </p>

            <h2>User Accounts</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information at all
              times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of
              your account.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              The MedSecOp platform and its original content, features, and functionality are and will remain the
              exclusive property of MedSecOp and its licensors. The service is protected by copyright, trademark, and
              other laws.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall MedSecOp, its directors, employees, partners, agents, suppliers, or affiliates, be
              liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>

            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States, without
              regard to its conflict of law provisions.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing
              to access or use our Service after those revisions become effective, you agree to be bound by the revised
              terms.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at legal@medsecop.com or visit our{" "}
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

