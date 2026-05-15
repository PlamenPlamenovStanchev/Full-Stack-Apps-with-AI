import Link from "next/link";
import { PageHeader } from "./components/PageHeader";
import { PageContent } from "./components/PageContent";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-white via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="Modern Next.js"
        subtitle="A beautifully designed, fully responsive web application built with Next.js, TypeScript, and Tailwind CSS. Experience modern web development at its finest."
      />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          Why Choose This Stack?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "⚡",
              title: "Lightning Fast",
              description: "Server-side rendering and static generation for optimal performance and SEO",
            },
            {
              icon: "🎨",
              title: "Beautiful Design",
              description: "Tailwind CSS for utility-first styling with built-in dark mode support",
            },
            {
              icon: "🔧",
              title: "Developer Experience",
              description: "TypeScript support, hot reloading, and comprehensive tooling out of the box",
            },
            {
              icon: "📱",
              title: "Fully Responsive",
              description: "Mobile-first design approach ensuring perfect layout on all device sizes",
            },
            {
              icon: "🌙",
              title: "Dark Mode",
              description: "Seamless dark mode support with automatic system preference detection",
            },
            {
              icon: "🚀",
              title: "Production Ready",
              description: "Built-in optimization and best practices for deploying at scale",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 sm:p-12 text-white">
          <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Next.js 15+", version: "Latest" },
              { name: "React 18+", version: "Latest" },
              { name: "TypeScript", version: "Strict Mode" },
              { name: "Tailwind CSS", version: "v4" },
            ].map((tech, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur rounded p-4">
                <div className="font-semibold mb-1">{tech.name}</div>
                <div className="text-sm text-white/80">{tech.version}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
          Explore our application and see the modern web in action.
        </p>
        <Link
          href="/About"
          className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          Explore More
        </Link>
      </section>
    </div>
  );
}
