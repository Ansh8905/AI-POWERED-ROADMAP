import { useState } from 'react';
import ProfileForm from './components/ProfileForm';
import RoadmapView from './components/RoadmapView';
import LoadingState from './components/LoadingState';

const initialForm = {
  pathType: 'tech',
  currentSkills: 'JavaScript, HTML, CSS',
  experienceLevel: 'Beginner',
  careerGoal: 'AI Engineer',
  learningPreferences: 'Project-based learning, visual explanations, and weekly milestones.'
};

function App() {
  const [formValues, setFormValues] = useState(initialForm);
  const [roadmap, setRoadmap] = useState(null);
  const [meta, setMeta] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const payload = {
        ...formValues,
        currentSkills: formValues.currentSkills
          .split(',')
          .map((skill) => skill.trim())
          .filter(Boolean)
      };

      const response = await fetch('/generate-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to generate roadmap.');
      }

      setRoadmap(data.roadmap);
      setMeta(data.meta);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen text-ink">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-4 py-4 sm:px-5 lg:px-6 lg:py-5">
        <header className="rounded-[28px] border border-white/70 bg-white/75 px-4 py-4 shadow-panel backdrop-blur sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-sm font-bold tracking-[0.24em] text-white">
                AI
              </div>
              <div>
                <p className="font-display text-lg font-bold text-ink">AI Roadmap</p>
                <p className="text-sm text-slate-500">Learning planner for modern career paths</p>
              </div>
            </div>

            <nav className="hidden items-center gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/90 p-1.5 md:flex">
              {['Overview', 'Tracks', 'Roadmap', 'Insights'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-ink"
                >
                  {item}
                </a>
              ))}
            </nav>

            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-tealdeep">
                Live planner
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600">
                Structured roadmap generation
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_392px]">
          <div className="overflow-hidden rounded-[32px] bg-ink p-6 text-white shadow-glow sm:p-8 xl:p-10">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                  AI Roadmap Studio
                </span>
                <span className="inline-flex rounded-full border border-cobalt/30 bg-cobalt/15 px-3 py-1 text-xs font-medium text-blue-100">
                  Trusted sources, guided phases, clean progress
                </span>
              </div>

              <div className="max-w-3xl space-y-4">
                <h1 className="font-display text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-[3.5rem]">
                  Plan your next learning move with a UI that feels like a modern SaaS product.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                  Choose a track, define your level, and generate a roadmap that blends milestone
                  planning, authentic study content, and execution-focused guidance without the dead
                  space and layout drift of the current UI.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Track clarity</p>
                  <p className="mt-3 text-lg font-semibold text-white">Tech and non-tech flows</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">A single planner for software roles, exam prep, commerce, defence, and management.</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Spacing system</p>
                  <p className="mt-3 text-lg font-semibold text-white">8px rhythm</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Consistent internal spacing, tighter cards, and cleaner section grouping.</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Source quality</p>
                  <p className="mt-3 text-lg font-semibold text-white">Official + relevant</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Official docs, boards, government portals, YouTube courses, and role-aware recommendations.</p>
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Execution view</p>
                  <p className="mt-3 text-lg font-semibold text-white">Readable roadmap cards</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">Milestones, practice tasks, and progress states without oversized empty columns.</p>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-4 sm:p-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white">Product principles</p>
                      <p className="mt-1 text-sm text-slate-300">Minimal, aligned, responsive, and deliberately structured.</p>
                    </div>
                    <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
                      Inspired by Linear / Vercel / OpenAI
                    </div>
                  </div>
                </div>
                <div className="rounded-[28px] border border-coral/25 bg-coral/12 p-4 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-100">Form state</p>
                  <p className="mt-3 text-xl font-semibold text-white">{formValues.careerGoal}</p>
                  <p className="mt-2 text-sm text-orange-100/90">
                    {formValues.experienceLevel} level • {formValues.pathType === 'non-tech' ? 'Non-tech' : 'Tech'} track
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:sticky xl:top-6 xl:self-start">
            <ProfileForm
              formValues={formValues}
              setFormValues={setFormValues}
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </section>

        {error ? (
          <section className="rounded-[28px] border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-panel">
            {error}
          </section>
        ) : null}

        {isLoading ? <LoadingState /> : null}

        {roadmap ? <RoadmapView roadmap={roadmap} meta={meta} /> : null}
      </div>
    </main>
  );
}

export default App;
