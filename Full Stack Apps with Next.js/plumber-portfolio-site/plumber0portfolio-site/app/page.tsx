import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PlumPro - Expert Plumbing Services | Home",
  description: "Professional plumbing services for residential and commercial properties. 24/7 emergency service available.",
  openGraph: {
    title: "PlumPro - Expert Plumbing Services",
    description: "Professional plumbing services for residential and commercial properties",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-[80vh] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-black text-white py-12 md:py-20 px-4 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mt-8 md:mt-16 animate-fadeInUp">
            <div className="text-6xl md:text-8xl mb-6 animate-bounce" style={{ animationDuration: "2s" }}>
              💧
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight md:leading-tight">
              Premium Plumbing Solutions
            </h1>
            <p className="text-lg md:text-2xl mb-8 md:mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Trusted by thousands of homeowners and businesses for over 15 years of excellence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 font-bold text-base md:text-lg rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                <span className="relative z-10">Get a Free Quote</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-bold text-base md:text-lg rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl"
              >
                View Our Work →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-900 dark:text-white">
            Why Choose PlumPro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "⚡",
                title: "24/7 Emergency Service",
                description: "Available round the clock for urgent plumbing emergencies. We respond within 30 minutes.",
                delay: "0s",
              },
              {
                icon: "👨‍🔧",
                title: "Licensed & Insured",
                description: "Our team consists of certified plumbers with industry credentials and full insurance coverage.",
                delay: "0.1s",
              },
              {
                icon: "💰",
                title: "Transparent Pricing",
                description: "No hidden fees. Get a free estimate before any work begins. Competitive rates guaranteed.",
                delay: "0.2s",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 transform hover:-translate-y-2 animate-fadeInUp"
                style={{ animationDelay: feature.delay }}
              >
                <div className="text-5xl md:text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-900 dark:text-white">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {[
              {
                icon: "🏠",
                title: "Residential Plumbing",
                description:
                  "Leak repairs, fixture installation, drain cleaning, and bathroom renovations for your home.",
                delay: "0s",
              },
              {
                icon: "🏢",
                title: "Commercial Services",
                description:
                  "Large-scale installations, maintenance contracts, and system upgrades for businesses.",
                delay: "0.1s",
              },
              {
                icon: "🚨",
                title: "Emergency Repairs",
                description:
                  "Burst pipes, water damage restoration, and urgent plumbing issues addressed immediately.",
                delay: "0.2s",
              },
              {
                icon: "🔧",
                title: "Maintenance Plans",
                description:
                  "Preventive maintenance and annual inspections to keep your systems running smoothly.",
                delay: "0.3s",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group border-l-4 border-blue-600 pl-6 py-4 hover:border-blue-400 transition-all duration-300 hover:pl-8 hover:translate-x-1 animate-slideInLeft"
                style={{ animationDelay: service.delay }}
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300 inline-block">
                  {service.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 md:py-24 px-4 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl -translate-y-1/2" />
          <div className="absolute bottom-1/2 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fadeInUp">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl mb-8 md:mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Contact us today for a free estimate or emergency service
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-8 md:px-10 py-3 md:py-4 bg-white text-blue-600 font-bold text-base md:text-lg rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50 transform"
          >
            <span className="relative z-10">Contact Us Now →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
