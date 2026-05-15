import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About PlumPro | Expert Plumbing Professionals",
  description: "Learn about PlumPro's background, experience, and the skilled team behind our plumbing services.",
  openGraph: {
    title: "About PlumPro",
    description: "Learn about PlumPro's background, experience, and the skilled team",
    type: "website",
  },
};

export default function About() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-black text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About PlumPro</h1>
          <p className="text-lg md:text-xl text-blue-100">
            Serving the community with excellence since 2009
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-gray-900 dark:text-white">
            Our Story
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Text Content */}
            <div className="order-2 lg:order-1 animate-slideInLeft space-y-6">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded in 2009 by master plumber John Smith, PlumPro started as a single-person operation with a passion for quality work and customer satisfaction. What began in a small garage has grown into the region's most trusted plumbing service.
              </p>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Our commitment to excellence, integrity, and continuous improvement has made us the go-to choice for thousands of satisfied customers across the region. We believe in doing the job right the first time, every time.
              </p>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Today, we maintain the same values that built our reputation: honesty, quality craftsmanship, and putting our customers' needs first.
              </p>
              <Link
                href="/contact"
                className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Work With Us →
              </Link>
            </div>

            {/* Stats Card */}
            <div className="order-1 lg:order-2 animate-slideInRight bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-8 md:p-12 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <div className="space-y-8">
                <div className="text-center group" >
                  <div className="text-6xl md:text-7xl font-bold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                    15+
                  </div>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    Years of Experience
                  </p>
                </div>

                <div className="space-y-4 divide-y divide-blue-200 dark:divide-blue-700">
                  {[
                    "Over 10,000 satisfied customers",
                    "95% of our business from referrals",
                    "A+ Rating with Better Business Bureau",
                    "Emergency service 24/7/365",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 pt-4 first:pt-0 group hover:translate-x-2 transition-transform duration-300"
                    >
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-gray-900 dark:text-white">
            Our Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: "🏠",
                title: "Residential Plumbing",
                skills: [
                  "Kitchen & bathroom installation",
                  "Leak detection & repair",
                  "Water heater services",
                  "Drain cleaning",
                  "Fixture upgrades",
                ],
                delay: "0s",
              },
              {
                icon: "🏢",
                title: "Commercial Services",
                skills: [
                  "System design & installation",
                  "Maintenance contracts",
                  "Large-scale renovations",
                  "Compliance & inspection",
                  "Emergency response",
                ],
                delay: "0.1s",
              },
              {
                icon: "🔧",
                title: "Specialized Work",
                skills: [
                  "Water recycling systems",
                  "Greywater systems",
                  "Hot tub installation",
                  "Radiant heating",
                  "Smart home integration",
                ],
                delay: "0.2s",
              },
            ].map((expertise, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 group animate-fadeInUp"
                style={{ animationDelay: expertise.delay }}
              >
                <div className="text-4xl md:text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {expertise.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {expertise.title}
                </h3>
                <ul className="space-y-2">
                  {expertise.skills.map((skill, i) => (
                    <li
                      key={i}
                      className="text-gray-600 dark:text-gray-300 flex items-center gap-2 group/item hover:translate-x-1 transition-transform duration-200"
                    >
                      <span className="text-blue-600 dark:text-blue-400">→</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-gray-900 dark:text-white">
            Our Experience
          </h2>
          <div className="space-y-6 md:space-y-8">
            {[
              {
                role: "Master Plumber (2009-Present)",
                company: "PlumPro - Founding Owner & Lead Plumber",
                description:
                  "Built business from the ground up, managing all aspects of operations, training apprentices, and maintaining our reputation for excellence. Specializes in complex system designs and emergency repairs.",
                delay: "0s",
              },
              {
                role: "Senior Plumber (2005-2009)",
                company: "City Plumbing Solutions",
                description:
                  "Led a team of 5 plumbers, supervised large commercial projects, and developed innovative solutions for clients. Earned reputation for reliability and problem-solving.",
                delay: "0.1s",
              },
              {
                role: "Apprenticeship & Certification (2001-2005)",
                company: "Licensed Plumber Education Program",
                description:
                  "Completed 4-year apprenticeship, obtained Master Plumber license, and specialized training in modern plumbing systems and technologies.",
                delay: "0.2s",
              },
            ].map((exp, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/30 dark:to-transparent border-l-4 border-blue-600 p-6 md:p-8 rounded-lg hover:shadow-lg transition-all duration-300 hover:translate-x-2 animate-slideInLeft"
                style={{ animationDelay: exp.delay }}
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  {exp.role}
                </h3>
                <p className="text-base md:text-lg text-blue-600 dark:text-blue-400 font-semibold mb-3">
                  {exp.company}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-gray-900 dark:text-white text-center">
            Certifications & Affiliations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: "🏆",
                title: "Master Plumber License",
                subtitle: "State Certified",
                delay: "0s",
              },
              {
                icon: "⭐",
                title: "A+ BBB Rating",
                subtitle: "15 years",
                delay: "0.1s",
              },
              {
                icon: "🔒",
                title: "Fully Insured",
                subtitle: "Liability & Workers Comp",
                delay: "0.2s",
              },
              {
                icon: "🤝",
                title: "NAPHCC Member",
                subtitle: "Professional Association",
                delay: "0.3s",
              },
            ].map((cert, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl text-center transition-all duration-300 hover:scale-110 hover:-translate-y-2 group animate-fadeInUp"
                style={{ animationDelay: cert.delay }}
              >
                <div className="text-5xl md:text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                  {cert.icon}
                </div>
                <p className="font-bold text-gray-900 dark:text-white text-lg md:text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {cert.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {cert.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 px-4 bg-blue-600 dark:bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Excellence?
          </h2>
          <Link
            href="/contact"
            className="inline-block mt-6 px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Today →
          </Link>
        </div>
      </section>
    </div>
  );
}
