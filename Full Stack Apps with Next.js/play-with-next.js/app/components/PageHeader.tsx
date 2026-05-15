interface PageHeaderProps {
  title: string;
  subtitle: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export function PageHeader({
  title,
  subtitle,
  gradientFrom = "from-blue-600",
  gradientTo = "to-purple-600",
}: PageHeaderProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="text-center">
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6">
          <span className={`bg-gradient-to-r ${gradientFrom} ${gradientTo} bg-clip-text text-transparent`}>
            {title}
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
