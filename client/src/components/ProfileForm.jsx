const experienceLevels = ['Beginner', 'Intermediate', 'Advanced'];
const academicStages = ['10th', '11th', '12th'];
const boardStreams = ['Maths', 'Science', 'Commerce', 'Humanities', 'Not decided'];

const trackGroups = {
  tech: {
    label: 'Tech Paths',
    helper: 'Software, data, AI, and application roles.',
    accent: 'from-cobalt/12 to-tealdeep/12',
    options: [
      {
        value: 'AI Engineer',
        description: 'LLM apps, ML systems, and deployment.',
        backgroundPlaceholder: 'Example: Python, SQL, JavaScript, statistics',
        preferencePlaceholder: 'Example: Project-based learning, visual explanations, and weekly milestones'
      },
      {
        value: 'Data Scientist',
        description: 'Analysis, experimentation, and machine learning.',
        backgroundPlaceholder: 'Example: Python, Excel, SQL, business analysis',
        preferencePlaceholder: 'Example: Case studies, notebooks, and weekly practice questions'
      },
      {
        value: 'Frontend Developer',
        description: 'Modern web interfaces and performance.',
        backgroundPlaceholder: 'Example: HTML, CSS, JavaScript, React basics',
        preferencePlaceholder: 'Example: Build projects, UI breakdowns, and short video lessons'
      },
      {
        value: 'Flutter Developer',
        description: 'Cross-platform apps with Dart and Flutter.',
        backgroundPlaceholder: 'Example: Dart, Firebase, APIs, mobile UI basics',
        preferencePlaceholder: 'Example: App-first learning, component drills, and guided implementation'
      }
    ]
  },
  'non-tech': {
    label: 'Non-Tech Paths',
    helper: 'Government, academics, defence, commerce, and management.',
    accent: 'from-tealdeep/12 to-coral/12',
    options: [
      {
        value: 'Government Exams',
        description: 'UPSC, SSC, and other official competitive exams.',
        backgroundPlaceholder: 'Example: Polity basics, current affairs reading, quantitative aptitude',
        preferencePlaceholder: 'Example: Daily revision blocks, mock tests, and official notifications'
      },
      {
        value: 'Board Exams',
        description: 'School board preparation with official materials.',
        backgroundPlaceholder: 'Example: NCERT familiarity, mathematics basics, science or commerce subjects',
        preferencePlaceholder: 'Example: Chapter-wise revision, sample papers, and timed writing practice'
      },
      {
        value: 'Defence',
        description: 'NDA, CDS, SSB, and defence entry preparation.',
        backgroundPlaceholder: 'Example: Mathematics, general ability, physical fitness routine, current affairs',
        preferencePlaceholder: 'Example: Mock tests, daily physical training, and interview practice'
      },
      {
        value: 'Commerce',
        description: 'Accountancy, economics, finance, and commerce foundations.',
        backgroundPlaceholder: 'Example: Accountancy, business studies, economics, bookkeeping basics',
        preferencePlaceholder: 'Example: Concept-first learning, problem practice, and official course notes'
      },
      {
        value: 'Management',
        description: 'Business fundamentals, leadership, and management studies.',
        backgroundPlaceholder: 'Example: Communication, business basics, spreadsheet skills, quantitative aptitude',
        preferencePlaceholder: 'Example: Case studies, structured notes, and management course modules'
      }
    ]
  }
};

function FieldLabel({ title, hint }) {
  return (
    <div className="mb-2 flex items-end justify-between gap-4">
      <label className="text-sm font-semibold text-ink">{title}</label>
      {hint ? <span className="text-xs font-medium text-slate-500">{hint}</span> : null}
    </div>
  );
}

function ProfileForm({ formValues, setFormValues, handleSubmit, isLoading }) {
  const activeTrack = trackGroups[formValues.pathType] || trackGroups.tech;
  const activeOption =
    activeTrack.options.find((option) => option.value === formValues.careerGoal) || activeTrack.options[0];
  const isBoardExamFlow = formValues.pathType === 'non-tech' && formValues.careerGoal === 'Board Exams';

  function updateField(field, value) {
    setFormValues((current) => ({
      ...current,
      [field]: value,
      selectedCareerOption:
        field === 'academicStage' || field === 'boardStream' ? '' : current.selectedCareerOption
    }));
  }

  function updatePathType(pathType) {
    const nextTrack = trackGroups[pathType];

    setFormValues((current) => ({
      ...current,
      pathType,
      careerGoal: nextTrack.options.some((option) => option.value === current.careerGoal)
        ? current.careerGoal
        : nextTrack.options[0].value,
      academicStage: current.academicStage || '10th',
      boardStream: current.boardStream || 'Maths',
      selectedCareerOption: ''
    }));
  }

  function updateCareerGoal(careerGoal) {
    setFormValues((current) => ({
      ...current,
      careerGoal,
      academicStage: current.academicStage || '10th',
      boardStream: current.boardStream || 'Maths',
      selectedCareerOption: ''
    }));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-floatin rounded-[32px] border border-white/70 bg-white/92 p-6 shadow-panel backdrop-blur sm:p-8"
    >
      <div className="flex flex-col gap-6">
        <div className={`rounded-[28px] border border-slate-200/70 bg-gradient-to-br ${activeTrack.accent} p-5`}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Planner controls</p>
                <h2 className="mt-2 font-display text-2xl font-bold text-ink">Configure your roadmap</h2>
              </div>
              <span className="inline-flex rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                {activeTrack.label}
              </span>
            </div>
            <p className="text-sm leading-6 text-slate-600">
              Pick a track, choose the exact focus area, then describe your background and learning preferences.
            </p>
            {isBoardExamFlow && formValues.selectedCareerOption ? (
              <div className="inline-flex w-fit rounded-full bg-white px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cobalt shadow-sm">
                Selected path: {formValues.selectedCareerOption}
              </div>
            ) : null}
          </div>
        </div>

        <section className="space-y-4">
          <FieldLabel title="Roadmap track" hint="8px system / responsive tabs" />
          <div className="grid grid-cols-2 gap-2 rounded-[24px] border border-slate-200 bg-slate-100/80 p-2">
            {Object.entries(trackGroups).map(([key, group]) => {
              const isActive = formValues.pathType === key;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => updatePathType(key)}
                  className={`rounded-[18px] px-4 py-3 text-left transition ${
                    isActive
                      ? 'bg-white text-ink shadow-sm ring-1 ring-slate-200'
                      : 'text-slate-500 hover:bg-white/70 hover:text-ink'
                  }`}
                >
                  <p className="text-sm font-semibold">{group.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{group.helper}</p>
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-ink">Focus drawer</p>
              <p className="text-sm text-slate-500">Choose the specific target path before generating the roadmap.</p>
            </div>
            <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 shadow-sm">
              Structured selector
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {activeTrack.options.map((option) => {
              const isSelected = formValues.careerGoal === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateCareerGoal(option.value)}
                  className={`rounded-[22px] border px-4 py-4 text-left transition ${
                    isSelected
                      ? 'border-ink bg-ink text-white shadow-panel'
                      : 'border-slate-200 bg-white text-ink hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <p className="text-sm font-semibold">{option.value}</p>
                  <p className={`mt-2 text-sm leading-6 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {isBoardExamFlow ? (
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-slate-200 bg-white p-4">
              <FieldLabel title="Current class" hint="Used for career suggestions" />
              <select
                value={formValues.academicStage}
                onChange={(event) => updateField('academicStage', event.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
              >
                {academicStages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-white p-4">
              <FieldLabel
                title={formValues.academicStage === '10th' ? 'Preferred stream after 10th' : 'Current stream'}
                hint="Career options filter"
              />
              <select
                value={formValues.boardStream}
                onChange={(event) => updateField('boardStream', event.target.value)}
                className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
              >
                {boardStreams.map((stream) => (
                  <option key={stream} value={stream}>
                    {stream}
                  </option>
                ))}
              </select>
            </div>
          </section>
        ) : null}

        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[24px] border border-slate-200 bg-white p-4">
            <FieldLabel title="Experience level" />
            <select
              value={formValues.experienceLevel}
              onChange={(event) => updateField('experienceLevel', event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
            >
              {experienceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-[24px] border border-slate-200 bg-white p-4">
            <FieldLabel title="Selected goal" hint="Editable" />
            <input
              value={formValues.careerGoal}
              onChange={(event) => updateField('careerGoal', event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm font-medium text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
              placeholder="Choose from the drawer above or type a custom goal"
              required
            />
          </div>
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-4">
          <FieldLabel title="Current skills or background" hint="Comma separated" />
          <textarea
            value={formValues.currentSkills}
            onChange={(event) => updateField('currentSkills', event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
            placeholder={activeOption.backgroundPlaceholder}
            required
          />
        </section>

        <section className="rounded-[24px] border border-slate-200 bg-white p-4">
          <FieldLabel title="Learning preferences" hint="How the roadmap should teach" />
          <textarea
            value={formValues.learningPreferences}
            onChange={(event) => updateField('learningPreferences', event.target.value)}
            rows={4}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-ink outline-none transition focus:border-cobalt focus:ring-4 focus:ring-cobalt/10"
            placeholder={activeOption.preferencePlaceholder}
            required
          />
        </section>

        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-14 w-full items-center justify-center rounded-[20px] bg-ink px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Generating roadmap...' : 'Generate personalized roadmap'}
        </button>
      </div>
    </form>
  );
}

export default ProfileForm;
