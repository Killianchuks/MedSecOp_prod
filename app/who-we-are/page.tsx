import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

export default function WhoWeArePage() {
  return (
    <>
      <ScrollToTopOnMount />
      <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Who We Are</h1>
            <p className="mt-4 text-xl text-gray-600">
              Connecting patients with leading specialists for expert medical second opinions
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              MedSecOp was founded in 2023 by a team of healthcare professionals and technology experts who recognized a
              critical gap in the healthcare system: access to specialist expertise for patients facing complex or
              serious diagnoses.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              After witnessing countless patients struggle to obtain second opinions due to geographical limitations,
              long wait times, and administrative hurdles, our founders set out to create a platform that would
              democratize access to medical expertise.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Today, MedSecOp connects patients worldwide with leading specialists across numerous medical disciplines,
              providing timely and thorough second opinions that help patients make informed decisions about their
              health.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-xl text-gray-700 mb-8 italic">
              "To empower patients with access to expert medical opinions, regardless of location, enabling informed
              healthcare decisions and improved outcomes."
            </p>

            <h2 className="text-3xl font-bold text-gray-900 mb-6 mt-12">Our Vision</h2>
            <p className="text-xl text-gray-700 mb-8 italic">
              "A world where every patient has access to the best medical expertise for their condition, leading to
              optimal treatment plans and better health outcomes."
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Patient-Centered Care</h3>
                <p className="text-lg text-gray-700">
                  We put patients at the center of everything we do, ensuring their needs, preferences, and well-being
                  guide our services and decisions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Medical Excellence</h3>
                <p className="text-lg text-gray-700">
                  We maintain the highest standards of medical expertise, partnering only with top specialists who
                  demonstrate exceptional knowledge and experience in their fields.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
                <p className="text-lg text-gray-700">
                  We strive to make expert medical opinions accessible to all patients, regardless of geographic
                  location or socioeconomic status.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy & Security</h3>
                <p className="text-lg text-gray-700">
                  We uphold the highest standards of data privacy and security, ensuring patient information is
                  protected at all times.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-lg text-gray-700">
                  We continuously innovate our platform and services to improve the patient and physician experience,
                  leveraging technology to enhance healthcare delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Team</h2>
            <p className="text-lg text-gray-700 mb-6">
              MedSecOp is led by a diverse team of healthcare professionals, technology experts, and business leaders
              united by a common mission to transform how patients access specialist medical expertise.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our leadership team brings together decades of experience from prestigious medical institutions, leading
              technology companies, and successful healthcare startups.
            </p>
            <p className="text-lg text-gray-700">
              Supporting our core team is a network of over 100 specialist physicians across more than 20 medical
              specialties, all carefully vetted for their expertise, experience, and commitment to patient care.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

