import { ShieldCheck, Clock, Users, Globe, FileText, Headset } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "Secure & Confidential",
      description: "Your medical information is protected with enterprise-grade security and HIPAA compliance.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Fast Turnaround",
      description: "Receive expert opinions within 48 hours, helping you make timely decisions about your health.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Top Specialists",
      description: "Access to a network of leading specialists from prestigious medical institutions worldwide.",
    },
    {
      icon: <Globe className="h-10 w-10 text-primary" />,
      title: "Global Reach",
      description: "Connect with medical experts regardless of your location or theirs.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Comprehensive Reports",
      description: "Receive detailed, easy-to-understand reports with clear recommendations.",
    },
    {
      icon: <Headset className="h-10 w-10 text-primary" />,
      title: "Dedicated Support",
      description: "Our team guides you through every step of the process, answering all your questions.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Why Choose MedSecOp?</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            We provide expert medical second opinions that help you make informed decisions about your health.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md"
            >
              <div className="mb-5">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

