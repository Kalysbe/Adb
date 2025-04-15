import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About ADB SOLUTION | Professional Audit and Consulting",
  description:
    "Learn more about ADB SOLUTION, our history, mission and values. We provide professional audit and business consulting services.",
  keywords: ["ADB SOLUTION", "audit", "consulting", "business consulting", "company history", "mission", "values"],
  alternates: {
    languages: {
      en: "/en/about",
      ru: "/about",
    },
  },
}

export default function AboutPageEn() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-adb-gray">About ADB SOLUTION: Professional Audit and Consulting</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-adb-gray">Our History</h2>
            <p className="text-gray-700 mb-4">
              ADB SOLUTION was founded in 2010 by a group of professionals with the aim of providing innovative business
              solutions. Over the years, we have grown from a small team of enthusiasts into a large company with
              offices in several cities.
            </p>
            <p className="text-gray-700">
              Our experience and knowledge allow us to successfully implement projects of any complexity, from small
              local solutions to large-scale corporate systems.
            </p>

            <div className="mt-8 relative">
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#cdb32f]/20 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#cdb32f]/10 rounded-full"></div>
              <div className="relative z-10 bg-white p-3 rounded-xl shadow-md">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/blog5-387x320.jpg-QOQQJH2oFLx8F4MNzjxlyMXcTNIXNV.jpeg"
                  alt="ADB SOLUTION team"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="bg-adb-gold/20 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-adb-gray">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              We strive to help companies reach new heights through modern technologies and innovative approaches. Our
              goal is to create solutions that not only meet the current needs of the business but also lay the
              foundation for future growth.
            </p>
            <p className="text-gray-700">
              We believe that technology should be accessible and understandable to everyone, which is why we pay
              special attention to training and supporting our clients.
            </p>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-adb-gray">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-[#cdb32f]">Innovation</h3>
              <p className="text-gray-700">
                We are constantly looking for new approaches and technologies to offer our clients the most modern
                solutions.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-[#cdb32f]">Quality</h3>
              <p className="text-gray-700">
                We do not compromise when it comes to the quality of our products and services.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-3 text-[#cdb32f]">Partnership</h3>
              <p className="text-gray-700">
                We build long-term relationships with our clients based on trust and mutual respect.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6 text-adb-gray">Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-adb-gray">John Smith</h3>
                <p className="text-adb-gold">Technical Director</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
