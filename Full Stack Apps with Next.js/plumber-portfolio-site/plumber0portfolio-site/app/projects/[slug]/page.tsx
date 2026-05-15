import type { Metadata } from "next";
import Link from "next/link";
import { getProjectBySlug, getAllProjectSlugs, projects } from "@/app/lib/projects";
import { ProjectImage, CardThumbnail } from "@/app/components/ProjectImage";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | PlumPro Portfolio`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <div className="bg-white dark:bg-black">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-black text-white py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-blue-100 hover:text-white mb-6 transition-colors duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
            Back to Projects
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-slideInLeft">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
            {project.description}
          </p>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16 md:py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 animate-slideInLeft">
              {/* Image */}
              <div className="mb-8 md:mb-12">
                <ProjectImage
                  alt={project.title}
                  priority={true}
                  className="w-full h-96 md:h-[500px] object-cover rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
                />
              </div>

              {/* Project Description */}
              <div className="mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">
                  Project Overview
                </h2>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {project.details}
                </p>
              </div>

              {/* Technologies Used */}
              <div className="mb-12 md:mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
                  Technologies & Services
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.technologies.map((tech, index) => (
                    <div
                      key={index}
                      className="bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-4 md:p-6 text-center group hover:scale-105 hover:shadow-lg transition-all duration-300 animate-fadeInUp"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {tech}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="animate-slideInRight">
              {/* Project Info Card */}
              <div className="sticky top-24 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900 dark:text-white">
                  Project Details
                </h3>

                <div className="space-y-6 md:space-y-8">
                  {/* Client */}
                  <div className="group">
                    <p className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      👤 Client
                    </p>
                    <p className="text-lg md:text-xl text-gray-900 dark:text-white font-semibold">
                      {project.client}
                    </p>
                  </div>

                  {/* Completion Date */}
                  <div className="group">
                    <p className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      📅 Completion Date
                    </p>
                    <p className="text-lg md:text-xl text-gray-900 dark:text-white font-semibold">
                      {new Date(project.completionDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {/* Project ID */}
                  <div className="group">
                    <p className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      🔖 Project ID
                    </p>
                    <p className="text-lg md:text-xl text-gray-900 dark:text-white font-mono font-semibold">
                      PLU-{project.id.toString().padStart(4, "0")}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-6 md:pt-8 border-t border-blue-200 dark:border-blue-700">
                    <Link
                      href="/contact"
                      className="w-full block text-center px-6 py-3 md:py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Get Similar Service
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 md:py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-16 text-gray-900 dark:text-white animate-fadeInUp">
              Other Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.slug}`}
                >
                  <div
                    className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 h-full flex flex-col group animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden h-40 md:h-48 bg-gradient-to-br from-blue-400 to-blue-600">
                      <CardThumbnail
                        alt={relatedProject.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {relatedProject.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {relatedProject.shortDescription}
                      </p>
                      <div className="text-blue-600 dark:text-blue-400 font-semibold text-sm md:text-base group-hover:translate-x-1 transition-transform duration-300">
                        View Project →
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="relative py-12 md:py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10 overflow-hidden">
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">
            Need Similar Services?
          </h2>
          <p className="text-base md:text-lg text-blue-100 mb-6 md:mb-8">
            We'd love to help with your next plumbing project
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-2xl hover:shadow-blue-500/50"
          >
            Get a Free Estimate →
          </Link>
        </div>
      </section>
    </div>
  );
}
