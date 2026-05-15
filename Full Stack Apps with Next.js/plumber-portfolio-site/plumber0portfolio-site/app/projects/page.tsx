import type { Metadata } from "next";
import Link from "next/link";
import { CardThumbnail } from "@/app/components/ProjectImage";
import { projects } from "@/app/lib/projects";

export const metadata: Metadata = {
  title: "Our Projects | PlumPro Portfolio",
  description: "View our portfolio of completed plumbing projects for residential and commercial clients.",
  openGraph: {
    title: "Our Projects | PlumPro Portfolio",
    description: "View our portfolio of completed plumbing projects",
    type: "website",
  },
};

export default function ProjectsPage() {
  return (
    <div className="bg-white dark:bg-black">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-black text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto animate-fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Projects</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl">
            Explore our portfolio of successful installations and renovations showcasing our expertise and quality workmanship.
          </p>
        </div>
      </section>

      {/* Filter/Stats */}
      <section className="py-8 md:py-12 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="animate-slideInLeft">
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                Showing <span className="font-bold text-gray-900 dark:text-white">{projects.length}</span> completed projects
              </p>
            </div>
            <div className="flex gap-2 flex-wrap animate-slideInRight">
              {["All Projects", "Residential", "Commercial"].map((tag, i) => (
                <button
                  key={tag}
                  className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 ${
                    tag === "All Projects"
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group"
              >
                <div
                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 h-full flex flex-col animate-fadeInUp"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48 md:h-56 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                    <CardThumbnail
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end justify-start p-4">
                      <span className="text-white font-bold text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                        View Project <span className="text-lg">→</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2 leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-2 flex-1 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 2).map((tech, i) => (
                        <span
                          key={i}
                          className="inline-block px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs md:text-sm rounded-full font-semibold group-hover:bg-blue-200 dark:group-hover:bg-blue-900/60 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 2 && (
                        <span className="inline-block px-2 md:px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs md:text-sm rounded-full font-semibold group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors duration-300">
                          +{project.technologies.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Date */}
                    <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 flex items-center gap-1">
                      <span>📅</span>
                      {new Date(project.completionDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-12 md:py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-1/2 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl -translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Have a Project in Mind?
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
            Contact us today for a free consultation and personalized estimate
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50"
          >
            <span className="relative z-10">Get a Free Quote →</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
