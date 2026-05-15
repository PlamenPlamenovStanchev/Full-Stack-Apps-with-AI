export default function DashboardLoading() {
  return (
    <div className="dashboard-page" aria-busy="true" aria-live="polite">
      <section className="dashboard-heading">
        <div className="w-full max-w-2xl">
          <div className="skeleton h-4 w-32" />
          <div className="skeleton mt-3 h-10 w-64 max-w-full" />
          <div className="skeleton mt-4 h-4 w-full" />
          <div className="skeleton mt-2 h-4 w-3/4" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-11 w-24" />
          <div className="skeleton h-11 w-28" />
        </div>
      </section>

      <section className="dashboard-tabs">
        <div className="skeleton h-9 w-16" />
        <div className="skeleton h-9 w-24" />
        <div className="skeleton h-9 w-24" />
        <div className="skeleton h-9 w-24" />
      </section>

      <section className="grid gap-4">
        {[0, 1, 2].map((item) => (
          <article className="dashboard-list-item" key={item}>
            <div className="skeleton aspect-[2/3] w-24 sm:w-28" />
            <div className="min-w-0 flex-1">
              <div className="skeleton h-5 w-32" />
              <div className="skeleton mt-3 h-7 w-64 max-w-full" />
              <div className="skeleton mt-3 h-4 w-48 max-w-full" />
              <div className="skeleton mt-4 h-4 w-full" />
              <div className="skeleton mt-2 h-4 w-2/3" />
            </div>
            <div className="skeleton h-10 w-16" />
          </article>
        ))}
      </section>
    </div>
  );
}
