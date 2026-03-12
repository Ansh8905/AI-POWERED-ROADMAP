function SkeletonBlock({ className }) {
  return <div className={`animate-pulse-soft rounded-[20px] bg-slate-200/80 ${className}`} />;
}

function LoadingState() {
  return (
    <section className="grid gap-6">
      <div className="rounded-[32px] bg-ink p-6 shadow-glow sm:p-8">
        <div className="grid gap-4">
          <SkeletonBlock className="h-4 w-32 bg-white/15" />
          <SkeletonBlock className="h-12 w-full max-w-3xl bg-white/15" />
          <SkeletonBlock className="h-24 w-full max-w-4xl bg-white/10" />
          <div className="grid gap-4 md:grid-cols-3">
            <SkeletonBlock className="h-24 bg-white/10" />
            <SkeletonBlock className="h-24 bg-white/10" />
            <SkeletonBlock className="h-24 bg-white/10" />
          </div>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <SkeletonBlock className="h-28" />
          <SkeletonBlock className="h-28" />
          <SkeletonBlock className="h-28" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
              <div className="grid gap-6 xl:grid-cols-[0.95fr_1.15fr_0.9fr]">
                <div className="grid gap-3">
                  <SkeletonBlock className="h-5 w-24" />
                  <SkeletonBlock className="h-16" />
                  <SkeletonBlock className="h-16" />
                  <SkeletonBlock className="h-16" />
                </div>
                <div className="grid gap-3">
                  <SkeletonBlock className="h-5 w-32" />
                  <SkeletonBlock className="h-20" />
                  <SkeletonBlock className="h-20" />
                  <SkeletonBlock className="h-48" />
                </div>
                <div className="grid gap-3">
                  <SkeletonBlock className="h-5 w-36" />
                  <SkeletonBlock className="h-16" />
                  <SkeletonBlock className="h-16" />
                  <SkeletonBlock className="h-24" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
            <div className="grid gap-3">
              <SkeletonBlock className="h-5 w-32" />
              <SkeletonBlock className="h-20" />
              <SkeletonBlock className="h-20" />
              <SkeletonBlock className="h-20" />
            </div>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-panel sm:p-6">
            <div className="grid gap-3">
              <SkeletonBlock className="h-5 w-32" />
              <SkeletonBlock className="h-20" />
              <SkeletonBlock className="h-20" />
              <SkeletonBlock className="h-20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoadingState;
