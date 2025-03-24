import { RegionCode, type Region } from "@/contexts/region-context"
import { UserRole } from "./auth"
import { systemSettingsCache } from "./cache"

// User preferences interface
export interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: string
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  accessibility: {
    reducedMotion: boolean
    highContrast: boolean
    largeText: boolean
  }
  dashboard: {
    layout: "compact" | "detailed" | "grid"
    defaultView: string
  }
}

// Default user preferences
export const defaultUserPreferences: UserPreferences = {
  theme: "system",
  language: "en",
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    largeText: false,
  },
  dashboard: {
    layout: "detailed",
    defaultView: "overview",
  },
}

// Feature flags interface
export interface FeatureFlags {
  enableVideoConsultation: boolean
  enableAIAssistant: boolean
  enableChatSupport: boolean
  enableMobileApp: boolean
  enableBetaFeatures: boolean
  enableMultiLanguage: boolean
  enableDICOMViewer: boolean
  enableTelemedicine: boolean
  enableInsuranceVerification: boolean
}

// Default feature flags
export const defaultFeatureFlags: FeatureFlags = {
  enableVideoConsultation: true,
  enableAIAssistant: false,
  enableChatSupport: true,
  enableMobileApp: false,
  enableBetaFeatures: false,
  enableMultiLanguage: true,
  enableDICOMViewer: true,
  enableTelemedicine: false,
  enableInsuranceVerification: false,
}

// Role-specific content
export interface RoleContent {
  welcomeMessage: string
  dashboardTitle: string
  featuredActions: string[]
  tips: string[]
  resources: Array<{
    title: string
    description: string
    url: string
  }>
}

// Region-specific content
export interface RegionContent {
  welcomeMessage: string
  legalDisclaimer: string
  supportContact: string
  availableSpecialties: string[]
  currencyFormat: string
  dateFormat: string
  timeFormat: string
}

// Get personalized content based on user role
export function getRoleContent(role: UserRole): RoleContent {
  switch (role) {
    case UserRole.PATIENT:
      return {
        welcomeMessage: "Welcome to your patient dashboard. Get expert medical opinions from top specialists.",
        dashboardTitle: "Patient Dashboard",
        featuredActions: [
          "Submit a new case",
          "Upload medical images",
          "Schedule a consultation",
          "View your medical history",
        ],
        tips: [
          "Keep your medical records organized for faster reviews",
          "Be specific about your symptoms when submitting a case",
          "Upload high-quality images for better diagnosis",
          "Prepare questions before your consultation",
        ],
        resources: [
          {
            title: "Understanding Your Diagnosis",
            description: "Learn how to interpret medical reports and diagnoses",
            url: "/guide/understanding-diagnosis",
          },
          {
            title: "Patient Rights",
            description: "Information about your rights as a patient",
            url: "/guide/patient-rights",
          },
          {
            title: "Preparing for a Consultation",
            description: "Tips to make the most of your specialist consultation",
            url: "/guide/consultation-prep",
          },
        ],
      }

    case UserRole.DOCTOR:
      return {
        welcomeMessage: "Welcome to your specialist dashboard. Review cases and provide expert opinions.",
        dashboardTitle: "Specialist Dashboard",
        featuredActions: [
          "Review assigned cases",
          "Schedule consultations",
          "Access medical images",
          "Submit opinions",
        ],
        tips: [
          "Review patient history thoroughly before providing opinions",
          "Use the DICOM viewer for detailed image analysis",
          "Document your reasoning clearly for patients",
          "Schedule follow-up consultations when necessary",
        ],
        resources: [
          {
            title: "Clinical Guidelines",
            description: "Access the latest clinical guidelines for various conditions",
            url: "/resources/clinical-guidelines",
          },
          {
            title: "Telemedicine Best Practices",
            description: "Tips for effective remote consultations",
            url: "/resources/telemedicine-practices",
          },
          {
            title: "Documentation Standards",
            description: "Standards for medical documentation and opinions",
            url: "/resources/documentation-standards",
          },
        ],
      }

    case UserRole.ADMIN:
      return {
        welcomeMessage: "Welcome to the admin dashboard. Manage platform operations and monitor performance.",
        dashboardTitle: "Admin Dashboard",
        featuredActions: [
          "Monitor system health",
          "Manage users",
          "Review platform metrics",
          "Configure system settings",
        ],
        tips: [
          "Regularly check system health metrics",
          "Review user feedback for platform improvements",
          "Monitor case resolution times",
          "Keep doctor credentials up to date",
        ],
        resources: [
          {
            title: "Admin Guide",
            description: "Comprehensive guide for platform administration",
            url: "/admin/guide",
          },
          {
            title: "Compliance Checklist",
            description: "Ensure the platform meets all regulatory requirements",
            url: "/admin/compliance",
          },
          {
            title: "Performance Optimization",
            description: "Tips for optimizing platform performance",
            url: "/admin/performance",
          },
        ],
      }

    default:
      return {
        welcomeMessage: "Welcome to MedSecOp. Get expert medical opinions from top specialists.",
        dashboardTitle: "Dashboard",
        featuredActions: ["Explore our services", "Learn about second opinions", "Contact support"],
        tips: [
          "Keep your medical records organized",
          "Be specific about your symptoms",
          "Prepare questions for specialists",
        ],
        resources: [
          {
            title: "About Medical Second Opinions",
            description: "Learn why getting a second opinion is important",
            url: "/guide/importance-of-second-opinions",
          },
          {
            title: "How It Works",
            description: "Step-by-step guide to using our platform",
            url: "/how-it-works",
          },
        ],
      }
  }
}

// Get region-specific content
export function getRegionContent(region: Region): RegionContent {
  switch (region.code) {
    case RegionCode.US:
      return {
        welcomeMessage: `Welcome to MedSecOp US. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer: "Our services do not replace primary care. Always consult with your primary physician.",
        supportContact: "support@medsecop.us",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "en-US",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "h:mm A",
      }

    case RegionCode.EU:
      return {
        welcomeMessage: `Welcome to MedSecOp EU. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer:
          "Our services comply with GDPR and EU healthcare regulations. Always consult with your primary physician.",
        supportContact: "support@medsecop.eu",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "de-DE",
        dateFormat: "DD.MM.YYYY",
        timeFormat: "HH:mm",
      }

    case RegionCode.UK:
      return {
        welcomeMessage: `Welcome to MedSecOp UK. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer: "Our services do not replace NHS care. Always consult with your GP or NHS specialist.",
        supportContact: "support@medsecop.co.uk",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "en-GB",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      }

    case RegionCode.CANADA:
      return {
        welcomeMessage: `Welcome to MedSecOp Canada. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer:
          "Our services complement but do not replace provincial healthcare. Always consult with your primary physician.",
        supportContact: "support@medsecop.ca",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "en-CA",
        dateFormat: "YYYY-MM-DD",
        timeFormat: "h:mm A",
      }

    case RegionCode.ASIA:
      return {
        welcomeMessage: `Welcome to MedSecOp Asia. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer: "Our services complement local healthcare. Always consult with your primary physician.",
        supportContact: "support@medsecop.asia",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "en-SG",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      }

    case RegionCode.AUSTRALIA:
      return {
        welcomeMessage: `Welcome to MedSecOp Australia & New Zealand. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer:
          "Our services complement but do not replace Medicare or local healthcare. Always consult with your primary physician.",
        supportContact: "support@medsecop.com.au",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "en-AU",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "h:mm A",
      }

    case RegionCode.AFRICA:
      return {
        welcomeMessage: `Welcome to MedSecOp Africa. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer: "Our services complement local healthcare. Always consult with your primary physician.",
        supportContact: "support@medsecop.africa",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "en-ZA",
        dateFormat: "YYYY/MM/DD",
        timeFormat: "HH:mm",
      }

    case RegionCode.SOUTH_AMERICA:
      return {
        welcomeMessage: `Welcome to MedSecOp South America. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer: "Our services complement local healthcare. Always consult with your primary physician.",
        supportContact: "support@medsecop.latam",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "es-AR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      }

    default:
      return {
        welcomeMessage: `Welcome to MedSecOp. Our services start at ${region.currencySymbol}${region.basePrice}.`,
        legalDisclaimer: "Our services do not replace primary care. Always consult with your primary physician.",
        supportContact: "support@medsecop.com",
        availableSpecialties: [
          "Cardiology",
          "Oncology",
          "Neurology",
          "Orthopedics",
          "Gastroenterology",
          "Endocrinology",
          "Rheumatology",
          "Pulmonology",
          "Nephrology",
          "Urology",
        ],
        currencyFormat: "en-US",
        dateFormat: "MM/DD/YYYY",
        timeFormat: "h:mm A",
      }
  }
}

// Get feature flags based on user role and region
export async function getFeatureFlags(
  userId?: string,
  role?: UserRole,
  regionCode?: RegionCode,
): Promise<FeatureFlags> {
  // Start with default feature flags
  const flags = { ...defaultFeatureFlags }

  // Apply system-wide feature flags from cache
  const systemFlags = await systemSettingsCache.getOrCompute(
    "feature-flags",
    async () => {
      // In a real implementation, this would fetch from the database
      return {}
    },
    1000 * 60 * 30, // 30 minutes cache
  )

  // Apply system flags
  Object.assign(flags, systemFlags)

  // Apply region-specific flags
  if (regionCode) {
    switch (regionCode) {
      case RegionCode.US:
        flags.enableTelemedicine = true
        flags.enableInsuranceVerification = true
        break
      case RegionCode.EU:
        flags.enableMultiLanguage = true
        break
      case RegionCode.UK:
        flags.enableTelemedicine = true
        break
      // Add other region-specific flags
    }
  }

  // Apply role-specific flags
  if (role) {
    switch (role) {
      case UserRole.DOCTOR:
        flags.enableDICOMViewer = true
        flags.enableAIAssistant = true
        break
      case UserRole.ADMIN:
        // Admins get access to all features
        Object.keys(flags).forEach((key) => {
          flags[key as keyof FeatureFlags] = true
        })
        break
      // Add other role-specific flags
    }
  }

  // Apply user-specific flags if userId is provided
  if (userId) {
    // In a real implementation, this would fetch user-specific flags from the database
    // For now, we'll just use some example logic
    if (userId.startsWith("beta_")) {
      flags.enableBetaFeatures = true
    }
  }

  return flags
}

// Get user preferences
export async function getUserPreferences(userId: string): Promise<UserPreferences> {
  // Start with default preferences
  const preferences = { ...defaultUserPreferences }

  // In a real implementation, this would fetch from the database
  // For now, we'll just return the defaults

  return preferences
}

