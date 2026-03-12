function SurfaceCard({ title, eyebrow, children, className = '' }) {
  return (
    <section className={`rounded-[24px] border border-slate-200/80 bg-white p-4 shadow-panel sm:p-5 ${className}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{eyebrow}</p>
      ) : null}
      <div className={eyebrow ? 'mt-3' : ''}>
        {title ? <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">{title}</h3> : null}
        {children}
      </div>
    </section>
  );
}

function SummaryMetric({ label, value }) {
  return (
    <div className="rounded-[20px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
}

function TopicList({ title, items, tone }) {
  const tones = {
    slate: 'border-slate-200 bg-slate-50 text-slate-700',
    amber: 'border-amber-100 bg-amber-50 text-amber-900',
    teal: 'border-teal-100 bg-teal-50 text-teal-900'
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{title}</p>
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{items.length} items</span>
      </div>
      <div className="grid gap-2">
        {items.map((item) => (
          <div
            key={item}
            className={`rounded-[16px] border px-3 py-3 text-sm leading-6 ${tones[tone] || tones.slate}`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function StudyContentCard({ item }) {
  return (
    <div className="rounded-[20px] border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-tealdeep shadow-sm">
          {item.provider}
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
          {item.sourceType}
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
          {item.level}
        </span>
      </div>

      <h4 className="mt-4 text-lg font-semibold text-ink">{item.title}</h4>
      <p className="mt-3 text-sm leading-6 text-slate-600">{item.reason}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-tealdeep transition hover:bg-emerald-100"
        >
          Open source
        </a>
        {item.youtubeCourses?.map((course) => (
          <a
            key={`${item.title}-${course.url}`}
            href={course.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            YouTube
          </a>
        ))}
      </div>

      {item.youtubeCourses?.length ? (
        <div className="mt-4 grid gap-2">
          {item.youtubeCourses.map((course) => (
            <div key={course.url} className="rounded-[16px] border border-slate-200 bg-white/90 px-3 py-2.5">
              <p className="text-sm font-semibold leading-6 text-ink">{course.title}</p>
              <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{course.channel}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ProgressTracker({ phases }) {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {phases.map((phase, index) => (
        <div key={phase.name} className="rounded-[22px] border border-slate-200 bg-slate-50/90 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-sm font-semibold text-white">
              {index + 1}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Phase {index + 1}</p>
              <p className="text-sm font-semibold text-ink">{phase.name}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-500">{phase.milestone}</p>
        </div>
      ))}
    </div>
  );
}

function CareerOptionCard({ option, onSelect, isActive }) {
  return (
    <div
      className={`rounded-[20px] border p-4 transition duration-200 hover:-translate-y-0.5 ${
        isActive
          ? 'border-ink bg-ink text-white shadow-panel'
          : 'border-slate-200 bg-slate-50/90 hover:border-slate-300 hover:bg-white'
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm ${
            isActive ? 'bg-white/15 text-slate-100' : 'bg-white text-slate-500'
          }`}
        >
          {option.type}
        </span>
      </div>
      <h4 className={`mt-3 text-lg font-semibold ${isActive ? 'text-white' : 'text-ink'}`}>{option.title}</h4>
      <p className={`mt-3 text-sm leading-6 ${isActive ? 'text-slate-200' : 'text-slate-600'}`}>{option.fit}</p>
      <div className={`mt-4 rounded-[16px] border px-3 py-3 ${isActive ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white'}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>Next step</p>
        <p className={`mt-2 text-sm leading-6 ${isActive ? 'text-slate-200' : 'text-slate-600'}`}>{option.nextStep}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {option.outcomes.map((outcome) => (
          <span
            key={`${option.title}-${outcome}`}
            className={`rounded-full px-3 py-1.5 text-xs font-medium shadow-sm ${
              isActive ? 'bg-white/10 text-slate-100' : 'bg-white text-slate-600'
            }`}
          >
            {outcome}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onSelect(option.title)}
        className={`mt-4 inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold transition ${
          isActive
            ? 'bg-white text-ink hover:bg-slate-100'
            : 'bg-ink text-white hover:bg-slate-900'
        }`}
      >
        {isActive ? 'Active roadmap path' : 'Use this option'}
      </button>
    </div>
  );
}

function RoadmapView({ roadmap, meta, onCareerOptionSelect, selectedCareerOption }) {
  const totalStudySources = roadmap.phases.reduce(
    (count, phase) => count + (phase.studyContent?.length || 0),
    0
  );

  return (
    <section className="grid gap-5">
      <div className="overflow-hidden rounded-[28px] bg-ink p-5 text-white shadow-glow sm:p-7">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Generated roadmap</p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
                {roadmap.title}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{roadmap.overview}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
              <p>Analysis mode: {meta?.generator || 'Unknown'}</p>
              <p className="mt-2">Skill gaps: {meta?.skillGaps?.length || 0}</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <SummaryMetric label="Phases" value={roadmap.phases.length} />
            <SummaryMetric label="Trusted sources" value={totalStudySources} />
            <SummaryMetric label="Target skills" value={meta?.targetSkills?.length || 0} />
          </div>

          {roadmap.sourceSelectionSummary ? (
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
              {roadmap.sourceSelectionSummary}
            </div>
          ) : null}
        </div>
      </div>

      <SurfaceCard eyebrow="Roadmap flow" title="Progress tracker">
        <div className="mt-5">
          <ProgressTracker phases={roadmap.phases} />
        </div>
      </SurfaceCard>

      {roadmap.careerExplorer ? (
        <SurfaceCard eyebrow="Career explorer" title={roadmap.careerExplorer.title}>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            {roadmap.careerExplorer.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Class {roadmap.careerExplorer.stage}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Stream {roadmap.careerExplorer.stream}
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {roadmap.careerExplorer.options.length} options
            </span>
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {roadmap.careerExplorer.options.map((option) => (
              <CareerOptionCard
                key={option.title}
                option={option}
                onSelect={onCareerOptionSelect}
                isActive={option.isSelected || option.title === selectedCareerOption}
              />
            ))}
          </div>
        </SurfaceCard>
      ) : null}

      <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-6">
          {roadmap.phases.map((phase, index) => (
            <SurfaceCard
              key={phase.name}
              eyebrow={`Phase ${index + 1}`}
              title={phase.name}
              className="overflow-hidden"
            >
              <div className="mt-4 grid gap-4 xl:grid-cols-2">
                <div className="space-y-4">
                  <TopicList title="Focus topics" items={phase.topics} tone="slate" />
                  <TopicList title="Core resources" items={phase.resources} tone="amber" />
                </div>

                <div className="space-y-4">
                  <TopicList title="Projects / practice tasks" items={phase.projects} tone="teal" />
                  <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Milestone</p>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{phase.milestone}</p>
                  </div>
                </div>
              </div>

              {phase.studyContent?.length ? (
                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">Trusted study content</p>
                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                      {phase.studyContent.length} links
                    </span>
                  </div>
                  <div className="grid gap-3 xl:grid-cols-2">
                    {phase.studyContent.map((item) => (
                      <StudyContentCard key={`${phase.name}-${item.title}-${item.url}`} item={item} />
                    ))}
                  </div>
                </div>
              ) : null}
            </SurfaceCard>
          ))}
        </div>

        <aside className="grid content-start gap-5 2xl:sticky 2xl:top-5">
          <SurfaceCard eyebrow="Signals" title="Market trends">
            <div className="mt-5 grid gap-3">
              {roadmap.marketTrends.map((trend) => (
                <div key={trend} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  {trend}
                </div>
              ))}
            </div>
          </SurfaceCard>

          <SurfaceCard eyebrow="Execution" title="Professional tips">
            <div className="mt-5 grid gap-3">
              {roadmap.professionalTips.map((tip) => (
                <div key={tip} className="rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-4 text-sm leading-6 text-slate-600">
                  {tip}
                </div>
              ))}
            </div>
          </SurfaceCard>
        </aside>
      </div>
    </section>
  );
}

export default RoadmapView;
