import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  name: string
  location: string
  rating: number
}

export default function TestimonialCard({ quote, name, location, rating }: TestimonialCardProps) {
  return (
    <div className="flex flex-col p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
      <p className="text-gray-700 mb-4 flex-grow">{quote}</p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{location}</p>
      </div>
    </div>
  )
}

