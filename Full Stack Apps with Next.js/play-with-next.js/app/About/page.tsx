import Link from "next/link";
import { PageHeader } from "../components/PageHeader";
import { PageContent } from "../components/PageContent";

export default function About() {
  return (
    <div className="bg-gradient-to-b from-white via-emerald-50 to-green-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="About Us"
        subtitle="We're building the future of web applications with cutting-edge technology and modern best practices."
        gradientFrom="from-emerald-600"
        gradientTo="to-green-600"
      />

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
              We believe in creating exceptional web experiences that combine beautiful design with powerful functionality. Our mission is to showcase how modern web technologies can be used to build applications that users love.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Through this application, we demonstrate best practices in Next.js development, responsive design, and user experience optimization.
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg h-64 flex items-center justify-center shadow-lg">
            <div className="text-6xl">🚀</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          What We Offer
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              icon: "✨",
              title: "Modern Design",
              description: "Clean, intuitive interfaces that delight users and make navigation effortless.",
            },
            {
              icon: "⚙️",
              title: "Performance",
              description: "Optimized for speed with server-side rendering and intelligent caching.",
            },
            {
              icon: "🔐",
              title: "Best Practices",
              description: "Following industry standards and security guidelines for production applications.",
            },
            {
              icon: "📚",
              title: "Well Documented",
              description: "Clear code structure and comprehensive documentation for easy maintenance.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg p-8 sm:p-12 text-white">
          <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Excellence", desc: "We strive for excellence in every aspect" },
              { title: "Innovation", desc: "Always exploring new technologies" },
              { title: "Simplicity", desc: "Making complex things simple" },
            ].map((value, idx) => (
              <div key={idx}>
                <div className="font-semibold text-lg mb-2">{value.title}</div>
                <div className="text-white/80 text-sm">{value.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Want to Learn More?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Check out our home page to see all the amazing features in action.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Back to Home
        </Link>
      </section>
    </div>
  );
}
