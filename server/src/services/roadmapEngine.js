import { buildSourceSelectionSummary, getTrustedStudyContent } from './trustedSources.js';
import {
  buildAcademicContextSummary,
  buildBoardCareerExplorer,
  findBoardCareerOption
} from './academicPaths.js';

const roleSkillMap = {
  'AI Engineer': ['Python', 'Machine Learning', 'Deep Learning', 'MLOps', 'LLM APIs', 'Vector Databases'],
  'Data Scientist': ['Python', 'SQL', 'Statistics', 'Machine Learning', 'Data Visualization', 'Experimentation'],
  'Flutter Developer': ['Dart', 'Flutter', 'State Management', 'REST APIs', 'Firebase', 'App Deployment'],
  'Frontend Developer': ['JavaScript', 'React', 'HTML', 'CSS', 'Testing', 'Performance Optimization'],
  'Government Exams': ['Current Affairs', 'Polity', 'History', 'Geography', 'Quantitative Aptitude', 'Reasoning'],
  'Board Exams': ['NCERT mastery', 'Concept clarity', 'Formula retention', 'Sample paper practice', 'Answer writing', 'Revision planning'],
  Defence: ['Mathematics', 'General Ability', 'Current Affairs', 'Physical Fitness', 'SSB Interview', 'Discipline'],
  Commerce: ['Accountancy', 'Business Studies', 'Economics', 'Financial Literacy', 'Quantitative Skills', 'Case Analysis'],
  Management: ['Business Fundamentals', 'Leadership', 'Communication', 'Quantitative Aptitude', 'Strategy', 'Problem Solving']
};

const nonTechGoals = new Set(['Government Exams', 'Board Exams', 'Defence', 'Commerce', 'Management']);

function titleCase(value) {
  return value
    .split(' ')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
}

function normalizeSkills(skills) {
  return skills.map((skill) => titleCase(skill.trim())).filter(Boolean);
}

function unique(values) {
  return [...new Set(values)];
}

function toArray(value) {
  return Array.isArray(value) ? value.filter(Boolean) : [];
}

export function analyzeProfile({
  currentSkills,
  experienceLevel,
  careerGoal,
  learningPreferences,
  pathType,
  academicStage,
  boardStream,
  selectedCareerOption
}) {
  const normalizedSkills = normalizeSkills(currentSkills);
  const targetSkills = roleSkillMap[careerGoal] || [
    'Core domain fundamentals',
    'Project building',
    'System design thinking',
    'Communication',
    'Portfolio development',
    'Interview preparation'
  ];

  const currentSet = new Set(normalizedSkills.map((skill) => skill.toLowerCase()));
  const skillGaps = targetSkills.filter((skill) => !currentSet.has(skill.toLowerCase()));

  return {
    normalizedSkills,
    targetSkills,
    skillGaps,
    summary: `${experienceLevel} learner targeting ${careerGoal}${buildAcademicContextSummary({
      careerGoal,
      academicStage,
      boardStream
    })}${selectedCareerOption ? ` and exploring ${selectedCareerOption}` : ''} on the ${
      pathType || (nonTechGoals.has(careerGoal) ? 'non-tech' : 'tech')
    } track with preferences: ${learningPreferences}`
  };
}

export function enrichRoadmapWithTrustedSources(roadmap, input, analysis) {
  const phases = toArray(roadmap.phases).map((phase) => {
    const normalizedPhase = {
      name: phase.name || 'Learning Phase',
      topics: toArray(phase.topics),
      resources: toArray(phase.resources),
      projects: toArray(phase.projects),
      milestone: phase.milestone || 'Complete the key outcomes for this phase.'
    };

    return {
      ...normalizedPhase,
      studyContent: getTrustedStudyContent({
        phase: normalizedPhase,
        input,
        analysis
      })
    };
  });

  return {
    title: roadmap.title || `${input.careerGoal} Career Roadmap`,
    overview:
      roadmap.overview ||
      `A structured roadmap for a ${input.experienceLevel.toLowerCase()} learner targeting ${input.careerGoal}.`,
    phases,
    marketTrends: toArray(roadmap.marketTrends),
    professionalTips: toArray(roadmap.professionalTips),
    sourceSelectionSummary: buildSourceSelectionSummary(input),
    careerExplorer: roadmap.careerExplorer || buildBoardCareerExplorer(input)
  };
}

function selectResourceStyle(preferences) {
  const lower = preferences.toLowerCase();

  if (lower.includes('video')) {
    return 'Use video-first courses plus concise documentation notes';
  }

  if (lower.includes('project')) {
    return 'Prefer project-based courses, build logs, and GitHub examples';
  }

  if (lower.includes('book')) {
    return 'Mix structured books with official documentation and exercises';
  }

  return 'Blend official documentation, curated courses, and hands-on tutorials';
}

function isNonTechTrack(input) {
  return input.pathType === 'non-tech' || nonTechGoals.has(input.careerGoal);
}

function buildBoardCareerAlignedPhases(input, analysis, selectedBoardPath, resourceStyle) {
  const { academicStage, boardStream } = input;
  const stageLabel = academicStage || '10th';
  const streamLabel = boardStream && boardStream !== 'Not decided' ? boardStream : 'your preferred stream';
  const primaryOutcomes = selectedBoardPath.outcomes.slice(0, 3);

  return [
    {
      name: `Board Foundation for ${selectedBoardPath.title}`,
      topics: unique([
        `Class ${stageLabel} board fundamentals`,
        `${streamLabel} subject strength`,
        `${selectedBoardPath.title} eligibility basics`,
        ...primaryOutcomes
      ]),
      resources: [
        `Use official board syllabus, NCERT/sample papers, and chapter priorities for class ${stageLabel}`,
        `Collect official information about ${selectedBoardPath.title}, including subject fit and eligibility`,
        resourceStyle
      ],
      projects: [
        `Make a one-page decision sheet for ${selectedBoardPath.title} with subject requirements and long-term outcomes`,
        `Map your current board subjects to the expectations of ${selectedBoardPath.title}`
      ],
      milestone: `Finish the board basics and clearly understand how ${selectedBoardPath.title} connects to your next academic step.`
    },
    {
      name: `Career Alignment for ${selectedBoardPath.title}`,
      topics: unique([
        `${selectedBoardPath.title} planning`,
        'Subject requirement analysis',
        'Backup pathway comparison',
        ...primaryOutcomes
      ]),
      resources: [
        `Research official course, diploma, or stream information for ${selectedBoardPath.title}`,
        `Compare ${selectedBoardPath.title} with at least two backup options using authentic sources`,
        'Review mentors, teachers, and official portals before making the final direction decision'
      ],
      projects: [
        `Build a comparison tracker for ${selectedBoardPath.title} versus two alternatives`,
        `Create a weekly study plan that supports both board marks and readiness for ${selectedBoardPath.title}`
      ],
      milestone: `Be able to explain why ${selectedBoardPath.title} is your best-fit option and what preparation it needs after class ${stageLabel}.`
    },
    {
      name: `Transition Readiness for ${selectedBoardPath.title}`,
      topics: unique([
        'Board score strategy',
        'Application readiness',
        `${selectedBoardPath.title} transition plan`,
        ...primaryOutcomes
      ]),
      resources: [
        `Track admissions, stream choices, or institutional routes relevant to ${selectedBoardPath.title}`,
        `Use official documents to finalize timelines, subject decisions, and preparation checkpoints`,
        'Maintain revision cycles so board performance and next-step planning stay aligned'
      ],
      projects: [
        `Prepare a final action plan for moving into ${selectedBoardPath.title}`,
        `Finish your board revision calendar with clear milestones linked to ${selectedBoardPath.title}`
      ],
      milestone: `Complete class ${stageLabel} with a documented, realistic transition plan into ${selectedBoardPath.title}.`
    }
  ];
}

function buildNonTechRoadmap(input, analysis) {
  const {
    careerGoal,
    experienceLevel,
    learningPreferences,
    academicStage,
    boardStream,
    selectedCareerOption
  } = input;
  const { normalizedSkills, skillGaps, targetSkills } = analysis;
  const gapPool = skillGaps.length ? skillGaps : targetSkills;
  const resourceStyle = selectResourceStyle(learningPreferences);
  const academicContext = buildAcademicContextSummary({ careerGoal, academicStage, boardStream });
  const selectedBoardPath = findBoardCareerOption(input);
  const classAwareTopics =
    careerGoal === 'Board Exams'
      ? unique([
          academicStage ? `Class ${academicStage} priorities` : null,
          boardStream && boardStream !== 'Not decided' ? `${boardStream} stream planning` : null
        ].filter(Boolean))
      : [];

  const phases = selectedBoardPath && careerGoal === 'Board Exams'
    ? buildBoardCareerAlignedPhases(input, analysis, selectedBoardPath, resourceStyle)
    : [
    {
      name: 'Foundation',
      topics: unique([
        `${careerGoal} syllabus overview`,
        ...classAwareTopics,
        ...(selectedBoardPath
          ? [selectedBoardPath.title, ...selectedBoardPath.outcomes.slice(0, 2)]
          : []),
        ...normalizedSkills.slice(0, 2),
        ...gapPool.slice(0, 3)
      ]),
      resources: [
        `Start with the official syllabus, notifications, and study material for ${careerGoal}`,
        ...(selectedBoardPath
          ? [`Research eligibility, subject requirements, and future scope for ${selectedBoardPath.title}`]
          : []),
        resourceStyle,
        'Create a chapter-wise or topic-wise revision tracker'
      ],
      projects: [
        'Take a baseline diagnostic test and identify weak topics',
        'Prepare a short-note system for definitions, facts, formulas, and recurring mistakes',
        ...(careerGoal === 'Board Exams' && academicStage === '10th'
          ? [
              selectedBoardPath
                ? `Build a decision sheet for ${selectedBoardPath.title} with eligibility, subjects, duration, and backup choices`
                : 'Compare post-10th stream and career routes before locking your next academic move'
            ]
          : [])
      ],
      milestone: `Finish the first pass of the ${careerGoal.toLowerCase()} foundation topics and document the weak areas clearly.`
    },
    {
      name: 'Guided Practice',
      topics: unique(gapPool.slice(0, 4).concat(['Previous-year papers', 'Timed practice', 'Revision loops'])),
      resources: [
        'Use official sample papers, model papers, and previous-year questions where available',
        ...(selectedBoardPath
          ? [`Collect entrance, subject, or admission details connected to ${selectedBoardPath.title}`]
          : []),
        'Review mistakes weekly and classify them by topic and question type',
        'Maintain a realistic weekly study schedule with revision and testing blocks'
      ],
      projects: [
        'Complete timed practice sets every week and track accuracy improvements',
        'Build a mistake notebook with corrections and retry dates',
        ...(selectedBoardPath
          ? [`Prepare a transition plan from your current class to ${selectedBoardPath.title}`]
          : [])
      ],
      milestone: 'Reach stable consistency in topic-wise practice and improve speed under timed conditions.'
    },
    {
      name: 'Exam Readiness',
      topics: unique(gapPool.slice(2, 6).concat(['Mock tests', 'Final revision', 'Execution strategy'])),
      resources: [
        'Prioritize full-length mocks, official updates, and high-yield revision material',
        'Use interview or personality-test preparation when the target path includes it',
        ...(selectedBoardPath
          ? [`Shortlist the best next-step institutions, courses, or entrance routes for ${selectedBoardPath.title}`]
          : []),
        'Finalize a last-mile revision plan with weekly confidence checks'
      ],
      projects: [
        'Simulate full exam conditions and review each attempt in detail',
        'Prepare the final revision calendar for the last four to six weeks',
        ...(selectedBoardPath
          ? [`Finalize a roadmap for moving into ${selectedBoardPath.title} after your current stage`]
          : [])
      ],
      milestone: `Be ready to attempt ${careerGoal.toLowerCase()} assessments with a repeatable revision and mock-test strategy.`
    }
  ];

  return {
    title: `${careerGoal} Roadmap`,
    overview: `This roadmap is designed for a ${experienceLevel.toLowerCase()} learner preparing for ${careerGoal}${academicContext}${
      selectedCareerOption ? ` and focusing on ${selectedCareerOption}` : ''
    }. It focuses on official syllabi, structured revision, authentic study sources, and consistent practice so progress converts into exam or course readiness.`,
    phases,
    marketTrends: [
      `For ${careerGoal}, official syllabus changes, exam notifications, and authentic sources matter more than generic coaching summaries.`,
      ...(selectedBoardPath
        ? [`${selectedBoardPath.title} should be judged by eligibility, subject fit, long-term scope, and actual student interest.`]
        : []),
      'Consistent mock performance and revision quality usually matter more than consuming more material.',
      'Well-structured preparation plans increasingly combine official resources, previous-year patterns, and progress tracking.'
    ],
    professionalTips: [
      'Use official notifications and study material as the ground truth before following any secondary content.',
      ...(selectedBoardPath
        ? [`Talk to teachers, seniors, or mentors before locking ${selectedBoardPath.title} as your next step.`]
        : []),
      'Track mistakes by topic and revise from that error log every week.',
      'Review progress in short cycles so your study plan stays aligned with the real exam or course pattern.'
    ]
  };
}

export function buildFallbackRoadmap(input, analysis) {
  if (isNonTechTrack(input)) {
    return buildNonTechRoadmap(input, analysis);
  }

  const { careerGoal, experienceLevel, learningPreferences } = input;
  const { normalizedSkills, skillGaps, targetSkills } = analysis;
  const gapPool = skillGaps.length ? skillGaps : targetSkills;
  const resourceStyle = selectResourceStyle(learningPreferences);

  const phases = [
    {
      name: 'Foundation',
      topics: unique([
        `${careerGoal} role fundamentals`,
        ...normalizedSkills.slice(0, 2),
        ...gapPool.slice(0, 2)
      ]),
      resources: [
        `Official documentation and beginner-friendly roadmaps for ${careerGoal}`,
        resourceStyle,
        'Create summary notes and short revision checklists after each study block'
      ],
      projects: [
        `Build a small practice project applying ${gapPool[0] || 'core fundamentals'}`,
        'Publish code with README, screenshots, and lessons learned'
      ],
      milestone: `Demonstrate baseline fluency in the core concepts required for an ${careerGoal} path.`
    },
    {
      name: 'Applied Skills',
      topics: unique(gapPool.slice(0, 4).concat(['Debugging workflow', 'Tooling and version control'])),
      resources: [
        `Intermediate tutorials focused on ${careerGoal} workflows`,
        'Open-source examples and implementation breakdowns',
        'Deliberate practice with weekly review sessions'
      ],
      projects: [
        `Build an intermediate portfolio project that solves a realistic ${careerGoal} problem`,
        'Add testing, documentation, and deployment or reproducibility steps'
      ],
      milestone: 'Complete one portfolio-grade project that shows both implementation and problem framing.'
    },
    {
      name: 'Professional Readiness',
      topics: unique([
        ...gapPool.slice(2, 6),
        'Portfolio storytelling',
        'Interview preparation',
        'Industry communication'
      ]),
      resources: [
        'Mock interviews, resume tailoring, and portfolio reviews',
        'Case studies from teams building production systems',
        'Role-specific interview question banks and peer feedback'
      ],
      projects: [
        `Ship a capstone aligned with ${careerGoal} hiring expectations`,
        'Turn project outcomes into resume bullets and portfolio narratives'
      ],
      milestone: 'Be ready to present projects, explain tradeoffs, and apply for role-aligned opportunities.'
    }
  ];

  return {
    title: `${careerGoal} Career Roadmap`,
    overview: `This roadmap is designed for a ${experienceLevel.toLowerCase()} learner moving toward a ${careerGoal} role. It prioritizes missing capabilities, applies your current strengths, and converts learning into portfolio evidence through structured milestones.`,
    phases,
    marketTrends: [
      `${careerGoal} roles increasingly reward candidates who can show end-to-end project execution, not just isolated course completion.`,
      'Hiring teams increasingly look for practical use of AI-assisted workflows, strong documentation, and measurable project outcomes.',
      'Cross-functional communication and the ability to explain technical choices clearly are strong differentiators in interviews.'
    ],
    professionalTips: [
      'Document every major project with problem statement, technical decisions, tradeoffs, and next steps.',
      'Use GitHub consistently and keep at least two polished projects pinned on your profile.',
      'Review job descriptions every two weeks and adjust your roadmap based on recurring tools and skill expectations.'
    ]
  };
}
