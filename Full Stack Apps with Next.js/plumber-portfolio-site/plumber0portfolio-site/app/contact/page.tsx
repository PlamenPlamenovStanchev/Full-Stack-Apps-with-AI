import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PlumPro | Get a Free Quote",
  description: "Contact PlumPro for plumbing services. Available 24/7 for emergencies. Free estimates.",
  openGraph: {
    title: "Contact PlumPro",
    description: "Contact us for professional plumbing services and free quotes",
    type: "website",
  },
};

export default function Contact() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-black text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl text-blue-100">
            Contact us for a free quote or emergency service
          </p>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            {/* Phone Card */}
            <div
              className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border border-blue-200 dark:border-blue-700 p-8 rounded-2xl hover:scale-105 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: "0s" }}
            >
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                📞
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Phone
              </h3>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-semibold mb-2">
                (555) 123-4567
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                24/7 emergency line available
              </p>
            </div>

            {/* Email Card */}
            <div
              className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border border-blue-200 dark:border-blue-700 p-8 rounded-2xl hover:scale-105 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                📧
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Email
              </h3>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 font-semibold mb-2">
                info@plumpro.com
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Response within 2 hours
              </p>
            </div>

            {/* Address Card */}
            <div
              className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/40 border border-blue-200 dark:border-blue-700 p-8 rounded-2xl hover:scale-105 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="text-5xl md:text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">
                📍
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Address
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                123 Main Street<br />
                Anytown, ST 12345
              </p>
            </div>
          </div>

          {/* Hours */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 animate-slideInLeft">
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Regular Hours
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                {[
                  { day: "Monday - Friday", hours: "7:00 AM - 6:00 PM" },
                  { day: "Saturday", hours: "9:00 AM - 4:00 PM" },
                  { day: "Sunday", hours: "Closed" },
                ].map((schedule, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center py-2 hover:translate-x-2 transition-transform duration-300"
                  >
                    <span className="font-semibold">{schedule.day}:</span>
                    <span>{schedule.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-800/50 border border-gray-200 dark:border-gray-700 p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-slideInRight">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Emergency Service
              </h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300 text-sm md:text-base">
                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span><strong>24/7 Emergency Line</strong> available</span>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span><strong>Response Time:</strong> Within 30-60 minutes</span>
                </li>
                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span><strong>Emergency surcharge</strong> applies</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-4xl mx-auto animate-slideInLeft">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-900 dark:text-white">
            Request a Free Estimate
          </h2>
          <form className="bg-white dark:bg-gray-800 p-6 md:p-10 rounded-2xl shadow-2xl space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  className="w-full px-4 md:px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  maxLength={100}
                  className="w-full px-4 md:px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  maxLength={20}
                  className="w-full px-4 md:px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Service Type
                </label>
                <select className="w-full px-4 md:px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 appearance-none cursor-pointer">
                  <option>Select a service...</option>
                  <option>Emergency Repair</option>
                  <option>New Installation</option>
                  <option>Maintenance</option>
                  <option>Renovation</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Property Address
              </label>
              <input
                type="text"
                maxLength={200}
                className="w-full px-4 md:px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                placeholder="123 Main St, City, ST 12345"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Message *
              </label>
              <textarea
                required
                maxLength={1000}
                className="w-full px-4 md:px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-400 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500 h-32 md:h-40 resize-none"
                placeholder="Describe your plumbing needs..."
              ></textarea>
            </div>

            <div className="flex items-center gap-3 group hover:translate-x-1 transition-transform duration-300">
              <input
                type="checkbox"
                id="agree"
                required
                className="w-5 h-5 text-blue-600 rounded cursor-pointer accent-blue-600"
              />
              <label
                htmlFor="agree"
                className="text-gray-600 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                I agree to be contacted about my plumbing needs
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 md:py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-base md:text-lg rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Free Estimate
            </button>

            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
              We typically respond within 2 business hours
            </p>
          </form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 md:mb-16 text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6 md:space-y-8">
            {[
              {
                q: "Do you charge for estimates?",
                a: "No, we offer completely free estimates for all projects. We'll discuss your needs and provide a transparent quote with no hidden fees.",
              },
              {
                q: "Are you available for emergency calls?",
                a: "Yes! We have 24/7 emergency service. Call us anytime for urgent plumbing issues and we'll respond within 30-60 minutes.",
              },
              {
                q: "What areas do you serve?",
                a: "We serve the surrounding area and metro region. Contact us to check if your location is within our service area.",
              },
              {
                q: "Do you offer warranties?",
                a: "Yes, all our work is guaranteed. We stand behind our workmanship and offer warranties on parts and labor.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group bg-gradient-to-r from-blue-50 to-transparent dark:from-blue-900/20 dark:to-transparent border-l-4 border-blue-600 p-6 md:p-8 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <summary className="font-bold text-lg md:text-xl text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center justify-between">
                  {faq.q}
                  <span className="text-2xl group-open:rotate-180 transition-transform duration-300">
                    ▼
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
