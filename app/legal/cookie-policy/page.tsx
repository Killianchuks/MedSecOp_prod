import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | MedSecOp",
  description: "MedSecOp's Cookie Policy - How we use cookies and similar technologies.",
}

export default function CookiePolicyPage() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          <p className="text-gray-600 mb-4">Last Updated: March 15, 2025</p>

          <div className="prose prose-blue max-w-none">
            <h2>What Are Cookies</h2>
            <p>
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored
              in your web browser and allows the service or a third-party to recognize you and make your next visit
              easier and more useful to you.
            </p>

            <h2>How MedSecOp Uses Cookies</h2>
            <p>MedSecOp uses cookies for several purposes, including:</p>
            <ul>
              <li>
                Authentication and security: To recognize you when you login and provide secure access to your account
              </li>
              <li>Preferences: To remember information about your browser and preferences</li>
              <li>Analytics: To understand how visitors use our platform and to improve it</li>
              <li>Performance: To make the website perform better and faster</li>
            </ul>

            <h2>Types of Cookies We Use</h2>
            <p>We use the following types of cookies:</p>
            <ul>
              <li>
                <strong>Essential cookies:</strong> These are cookies that are required for the operation of our website
              </li>
              <li>
                <strong>Analytical/performance cookies:</strong> These allow us to recognize and count the number of
                visitors and see how visitors move around our website
              </li>
              <li>
                <strong>Functionality cookies:</strong> These are used to recognize you when you return to our website
              </li>
              <li>
                <strong>Targeting cookies:</strong> These record your visit to our website, the pages you have visited
                and the links you have followed
              </li>
            </ul>

            <h2>Third-Party Cookies</h2>
            <p>
              In addition to our own cookies, we may also use various third-party cookies to report usage statistics of
              the service and deliver advertisements that may be relevant to you.
            </p>

            <h2>What Are Your Choices Regarding Cookies</h2>
            <p>
              If you prefer to avoid the use of cookies on the website, first you must disable the use of cookies in
              your browser and then delete the cookies saved in your browser associated with this website. You may use
              this option for preventing the use of cookies at any time.
            </p>

            <h2>Changes to the Cookie Policy</h2>
            <p>
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
              Cookie Policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our Cookie Policy, please contact us at privacy@medsecop.com or visit our{" "}
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

