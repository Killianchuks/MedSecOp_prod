export const validateEnv = () => {
    const requiredVars = [
      "NEXT_PUBLIC_APP_URL",
      "APP_VERSION",
      "NEXTAUTH_URL",
      "NEXTAUTH_SECRET",
      "DATABASE_URL",
      "NEXT_PUBLIC_SUPABASE_URL",
      "SUPABASE_SERVICE_ROLE_KEY",
      "SUPABASE_JWT_SECRET",
      "STRIPE_SECRET_KEY",
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      "MAILERSEND_API_KEY",
      "DEFAULT_FROM_EMAIL",
      "DEFAULT_FROM_NAME",
    ]
  
    const missing = requiredVars.filter((name) => !process.env[name])
  
    if (missing.length) {
      throw new Error(`Missing environment variables: ${missing.join(", ")}`)
    } else {
      console.log("✅ All required environment variables are set.")
    }
  }
  