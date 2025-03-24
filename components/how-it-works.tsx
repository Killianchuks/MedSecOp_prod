import { CheckCircle } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Submit Your Case",
      description: "Upload your medical records and diagnostic images through our secure platform.",
    },
    {
      number: "02",
      title: "Expert Review",
      description: "A specialist in your condition reviews your case thoroughly.",
    },
    {
      number: "03",
      title: "Receive Your Opinion",
      description: "Get a comprehensive report with clear recommendations within 48 hours.",
    },
    {
      number: "04",
      title: "Follow-up Support",
      description: "Discuss the findings with our medical team if you have any questions.",
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">How It Works</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Getting a second opinion is simple, secure, and straightforward
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <span className="text-xl font-bold">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2">
                  <div className="absolute right-0 -top-2 text-primary">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

