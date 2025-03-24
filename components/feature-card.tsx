import { Award, Clock, Shield, DollarSign, FileText, UserPlus } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: string
}

export default function FeatureCard({ title, description, icon }: FeatureCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "Award":
        return <Award className="w-10 h-10 text-blue-600" />
      case "Clock":
        return <Clock className="w-10 h-10 text-blue-600" />
      case "Shield":
        return <Shield className="w-10 h-10 text-blue-600" />
      case "DollarSign":
        return <DollarSign className="w-10 h-10 text-blue-600" />
      case "FileText":
        return <FileText className="w-10 h-10 text-blue-600" />
      case "UserPlus":
        return <UserPlus className="w-10 h-10 text-blue-600" />
      default:
        return <Award className="w-10 h-10 text-blue-600" />
    }
  }

  return (
    <div className="flex flex-col p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{getIcon()}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

