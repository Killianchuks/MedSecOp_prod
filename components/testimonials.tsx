import Image from "next/image"
import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "The second opinion I received through MedSecOp completely changed my treatment approach. I'm now on a much more effective therapy with fewer side effects.",
      author: "Sarah J.",
      role: "Cancer Patient",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "As a physician in a rural area, having access to specialists through MedSecOp has been invaluable for my patients. The platform is intuitive and the responses are thorough.",
      author: "Dr. Michael T.",
      role: "Family Physician",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      quote:
        "I was unsure about my diagnosis and treatment options. The specialist who reviewed my case provided clear explanations that helped me make an informed decision.",
      author: "Robert L.",
      role: "Heart Disease Patient",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">What Our Users Say</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Real stories from patients and doctors who have used our platform
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

