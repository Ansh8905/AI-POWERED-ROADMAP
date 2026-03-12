const levelOrder = ['Beginner', 'Intermediate', 'Advanced'];

const trustedSources = [
  {
    id: 'python-tutorial',
    title: 'Python Tutorial',
    provider: 'Python Docs',
    url: 'https://docs.python.org/3/tutorial/',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate'],
    roles: ['AI Engineer', 'Data Scientist'],
    tags: ['python', 'foundation', 'data structures', 'syntax', 'functions'],
    youtubeCourses: [
      {
        title: 'Python for Beginners - Full Course',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=eWRfhZUzrAc'
      }
    ]
  },
  {
    id: 'pandas-getting-started',
    title: 'Pandas Getting Started',
    provider: 'pandas',
    url: 'https://pandas.pydata.org/docs/getting_started/index.html',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate'],
    roles: ['AI Engineer', 'Data Scientist'],
    tags: ['python', 'pandas', 'data analysis', 'data cleaning', 'tabular data'],
    youtubeCourses: [
      {
        title: 'Data Analysis with Python for Excel Users',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=WcDaZ67TVRo'
      }
    ]
  },
  {
    id: 'sklearn-getting-started',
    title: 'scikit-learn Getting Started',
    provider: 'scikit-learn',
    url: 'https://scikit-learn.org/stable/getting_started.html',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate'],
    roles: ['AI Engineer', 'Data Scientist'],
    tags: ['machine learning', 'model evaluation', 'classification', 'regression', 'pipelines'],
    youtubeCourses: [
      {
        title: 'Machine Learning with Python and Scikit-Learn - Full Course',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=hDKCxebp88A'
      }
    ]
  },
  {
    id: 'numpy-quickstart',
    title: 'NumPy Quickstart',
    provider: 'NumPy',
    url: 'https://numpy.org/doc/stable/user/quickstart.html',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate'],
    roles: ['AI Engineer', 'Data Scientist'],
    tags: ['python', 'statistics', 'numerical computing', 'arrays', 'math'],
    youtubeCourses: [
      {
        title: 'Data Analysis with Python Course - NumPy, Pandas, Data Visualization',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=GPVsHOlRBBI'
      }
    ]
  },
  {
    id: 'openai-prompting',
    title: 'Prompting Guide',
    provider: 'OpenAI',
    url: 'https://platform.openai.com/docs/guides/prompting',
    sourceType: 'Official guide',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['AI Engineer'],
    tags: ['llm', 'prompt engineering', 'generative ai', 'apis', 'ai applications'],
    youtubeCourses: [
      {
        title: 'Prompt Engineering Tutorial - Master ChatGPT and LLM Responses',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=_ZvnD73m40o'
      }
    ]
  },
  {
    id: 'huggingface-course',
    title: 'Hugging Face Course',
    provider: 'Hugging Face',
    url: 'https://huggingface.co/learn/llm-course/chapter1/1',
    sourceType: 'Official course',
    levels: ['Beginner', 'Intermediate'],
    roles: ['AI Engineer', 'Data Scientist'],
    tags: ['llm', 'transformers', 'nlp', 'machine learning', 'generative ai'],
    youtubeCourses: [
      {
        title: 'Prompt Engineering Tutorial - Master ChatGPT and LLM Responses',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=_ZvnD73m40o'
      }
    ]
  },
  {
    id: 'docker-get-started',
    title: 'Docker Get Started',
    provider: 'Docker',
    url: 'https://docs.docker.com/get-started/',
    sourceType: 'Official guide',
    levels: ['Intermediate', 'Advanced'],
    roles: ['AI Engineer'],
    tags: ['deployment', 'mlops', 'containers', 'apis', 'app deployment'],
    youtubeCourses: [
      {
        title: 'Docker Tutorial for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo'
      }
    ]
  },
  {
    id: 'postgresql-tutorial',
    title: 'PostgreSQL Tutorial',
    provider: 'PostgreSQL',
    url: 'https://www.postgresql.org/docs/current/tutorial-start.html',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate'],
    roles: ['Data Scientist'],
    tags: ['sql', 'databases', 'queries', 'data analysis'],
    youtubeCourses: [
      {
        title: 'SQL Tutorial - Full Database Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY'
      }
    ]
  },
  {
    id: 'upsc-active-examinations',
    title: 'Active Examinations',
    provider: 'UPSC',
    url: 'https://upsc.gov.in/examinations/active-examinations',
    sourceType: 'Official government portal',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['Government Exams', 'Defence'],
    tags: ['syllabus', 'current affairs', 'polity', 'history', 'geography', 'official notifications'],
    youtubeCourses: []
  },
  {
    id: 'ssc-home',
    title: 'SSC Official Portal',
    provider: 'SSC',
    url: 'https://ssc.gov.in/',
    sourceType: 'Official government portal',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['Government Exams'],
    tags: ['reasoning', 'quantitative aptitude', 'official notifications', 'practice strategy', 'exam pattern'],
    youtubeCourses: []
  },
  {
    id: 'nta-home',
    title: 'National Testing Agency',
    provider: 'NTA',
    url: 'https://www.nta.ac.in/',
    sourceType: 'Official government portal',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['Government Exams', 'Management'],
    tags: ['official notifications', 'exam pattern', 'admit card', 'entrance exam', 'management aptitude'],
    youtubeCourses: []
  },
  {
    id: 'ncert-textbooks',
    title: 'NCERT Textbooks',
    provider: 'NCERT',
    url: 'https://ncert.nic.in/textbook.php',
    sourceType: 'Official board resource',
    levels: ['Beginner', 'Intermediate'],
    roles: ['Board Exams', 'Commerce'],
    tags: ['ncert mastery', 'concept clarity', 'revision planning', 'economics', 'business studies', 'mathematics'],
    youtubeCourses: []
  },
  {
    id: 'cbse-academics',
    title: 'CBSE Academic Portal',
    provider: 'CBSE',
    url: 'https://cbseacademic.nic.in/',
    sourceType: 'Official board resource',
    levels: ['Beginner', 'Intermediate'],
    roles: ['Board Exams', 'Commerce'],
    tags: ['sample papers', 'answer writing', 'official syllabus', 'board exams', 'commerce'],
    youtubeCourses: []
  },
  {
    id: 'join-indian-army',
    title: 'Join Indian Army',
    provider: 'Indian Army',
    url: 'https://joinindianarmy.nic.in/',
    sourceType: 'Official defence portal',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['Defence'],
    tags: ['ssb interview', 'physical fitness', 'discipline', 'official notifications', 'defence entry'],
    youtubeCourses: []
  },
  {
    id: 'join-indian-navy',
    title: 'Join Indian Navy',
    provider: 'Indian Navy',
    url: 'https://www.joinindiannavy.gov.in/',
    sourceType: 'Official defence portal',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['Defence'],
    tags: ['defence entry', 'official notifications', 'physical fitness', 'general ability', 'discipline'],
    youtubeCourses: []
  },
  {
    id: 'icai-students',
    title: 'ICAI Student Resources',
    provider: 'ICAI',
    url: 'https://www.icai.org/post/students',
    sourceType: 'Official professional body',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['Commerce'],
    tags: ['accountancy', 'financial literacy', 'business studies', 'commerce', 'exam guidance'],
    youtubeCourses: []
  },
  {
    id: 'swayam-home',
    title: 'SWAYAM Learning Platform',
    provider: 'SWAYAM',
    url: 'https://swayam.gov.in/',
    sourceType: 'Official learning platform',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['Management', 'Commerce'],
    tags: ['management', 'business fundamentals', 'leadership', 'strategy', 'case analysis'],
    youtubeCourses: []
  },
  {
    id: 'mdn-learn-web-development',
    title: 'Learn Web Development',
    provider: 'MDN',
    url: 'https://developer.mozilla.org/en-US/docs/Learn',
    sourceType: 'Official learning path',
    levels: ['Beginner', 'Intermediate'],
    roles: ['Frontend Developer'],
    tags: ['html', 'css', 'javascript', 'foundation', 'frontend', 'web basics'],
    youtubeCourses: [
      {
        title: 'HTML Full Course - Build a Website Tutorial',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg'
      },
      {
        title: 'CSS Tutorial - Full Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=OXGznpKZ_sA'
      }
    ]
  },
  {
    id: 'mdn-javascript-guide',
    title: 'JavaScript Guide',
    provider: 'MDN',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate'],
    roles: ['Frontend Developer'],
    tags: ['javascript', 'frontend', 'functions', 'objects', 'async'],
    youtubeCourses: [
      {
        title: 'Learn JavaScript - Full Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
      }
    ]
  },
  {
    id: 'react-quick-start',
    title: 'React Quick Start',
    provider: 'React',
    url: 'https://react.dev/learn',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate'],
    roles: ['Frontend Developer'],
    tags: ['react', 'components', 'state management', 'frontend'],
    youtubeCourses: [
      {
        title: 'Learn React JS - Full Beginner Tutorial and Practice Projects',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=x4rFhThSX04'
      }
    ]
  },
  {
    id: 'webdev-performance',
    title: 'Learn Performance',
    provider: 'web.dev',
    url: 'https://web.dev/learn/performance/',
    sourceType: 'Official learning path',
    levels: ['Intermediate', 'Advanced'],
    roles: ['Frontend Developer'],
    tags: ['performance optimization', 'performance', 'web vitals', 'frontend']
  },
  {
    id: 'flutter-docs',
    title: 'Flutter Documentation',
    provider: 'Flutter',
    url: 'https://docs.flutter.dev/',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    roles: ['Flutter Developer'],
    tags: ['flutter', 'widgets', 'ui', 'app development', 'foundation'],
    youtubeCourses: [
      {
        title: 'Flutter Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=VPvVD8t02U8'
      }
    ]
  },
  {
    id: 'flutter-state-management',
    title: 'Flutter State Management Fundamentals',
    provider: 'Flutter',
    url: 'https://docs.flutter.dev/get-started/fundamentals/state-management',
    sourceType: 'Official guide',
    levels: ['Beginner', 'Intermediate'],
    roles: ['Flutter Developer'],
    tags: ['flutter', 'state management', 'app architecture'],
    youtubeCourses: [
      {
        title: 'Flutter Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=VPvVD8t02U8'
      }
    ]
  },
  {
    id: 'dart-language-tour',
    title: 'Dart Language Tour',
    provider: 'Dart',
    url: 'https://dart.dev/language',
    sourceType: 'Official documentation',
    levels: ['Beginner', 'Intermediate'],
    roles: ['Flutter Developer'],
    tags: ['dart', 'syntax', 'foundation', 'programming basics'],
    youtubeCourses: [
      {
        title: 'Flutter Course for Beginners',
        channel: 'freeCodeCamp.org',
        url: 'https://www.youtube.com/watch?v=VPvVD8t02U8'
      }
    ]
  }
];

const roleFallbackSource = {
  'AI Engineer': 'https://docs.python.org/3/tutorial/',
  'Data Scientist': 'https://scikit-learn.org/stable/getting_started.html',
  'Frontend Developer': 'https://developer.mozilla.org/en-US/docs/Learn',
  'Flutter Developer': 'https://docs.flutter.dev/',
  'Government Exams': 'https://upsc.gov.in/examinations/active-examinations',
  'Board Exams': 'https://ncert.nic.in/textbook.php',
  Defence: 'https://joinindianarmy.nic.in/',
  Commerce: 'https://www.icai.org/post/students',
  Management: 'https://swayam.gov.in/'
};

function normalizeText(value) {
  return value.toLowerCase();
}

function includesAny(text, candidates) {
  return candidates.filter((candidate) => text.includes(candidate));
}

function getLevelIndex(level) {
  const index = levelOrder.indexOf(level);
  return index === -1 ? 0 : index;
}

function formatPreference(preferences) {
  const lower = normalizeText(preferences);

  if (lower.includes('video')) {
    return 'video';
  }

  if (lower.includes('project')) {
    return 'project';
  }

  if (lower.includes('book')) {
    return 'book';
  }

  return 'mixed';
}

function levelDistance(sourceLevels, experienceLevel) {
  const learnerIndex = getLevelIndex(experienceLevel);
  return Math.min(
    ...sourceLevels.map((level) => Math.abs(getLevelIndex(level) - learnerIndex))
  );
}

function buildPhaseCorpus(phase, analysis) {
  return normalizeText(
    [
      phase.name,
      ...(phase.topics || []),
      ...(phase.resources || []),
      ...(analysis.skillGaps || []),
      ...(analysis.targetSkills || [])
    ].join(' ')
  );
}

function buildReason(source, experienceLevel, phaseName, matchedTags, preferenceStyle) {
  const reasonParts = [
    `${source.provider} offers ${source.sourceType.toLowerCase()} material that fits ${experienceLevel.toLowerCase()} learners`
  ];

  if (matchedTags.length > 0) {
    reasonParts.push(`and covers ${matchedTags.slice(0, 2).join(' and ')}`);
  }

  if (preferenceStyle === 'project') {
    reasonParts.push('while supporting hands-on implementation');
  } else if (preferenceStyle === 'video') {
    reasonParts.push('and works well alongside guided visual study');
  } else if (preferenceStyle === 'book') {
    reasonParts.push('and complements structured note-taking');
  } else {
    reasonParts.push('for a balanced study routine');
  }

  return `${reasonParts.join(' ')} in the ${phaseName.toLowerCase()} phase.`;
}

export function getTrustedStudyContent({ phase, input, analysis, limit = 3 }) {
  const phaseCorpus = buildPhaseCorpus(phase, analysis);
  const preferenceStyle = formatPreference(input.learningPreferences);

  const scored = trustedSources
    .map((source) => {
      const matchedTags = includesAny(phaseCorpus, source.tags);
      const levelFit = levelDistance(source.levels, input.experienceLevel);
      const roleMatch = source.roles.includes(input.careerGoal);
      const phaseNameMatch = includesAny(normalizeText(phase.name), source.tags).length > 0;

      let score = matchedTags.length * 4;

      if (roleMatch) {
        score += 5;
      }

      if (phaseNameMatch) {
        score += 2;
      }

      score += Math.max(0, 3 - levelFit);

      if (preferenceStyle === 'project' && source.tags.includes('app development')) {
        score += 1;
      }

      if (preferenceStyle === 'mixed' && source.sourceType.includes('Official')) {
        score += 1;
      }

      return {
        source,
        matchedTags,
        levelFit,
        score
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.levelFit - right.levelFit)
    .slice(0, limit)
    .map(({ source, matchedTags }) => ({
      title: source.title,
      provider: source.provider,
      url: source.url,
      sourceType: source.sourceType,
      level: input.experienceLevel,
      reason: buildReason(source, input.experienceLevel, phase.name, matchedTags, preferenceStyle),
      youtubeCourses: source.youtubeCourses || []
    }));

  return scored.length > 0
    ? scored
    : [
        {
          title: 'General role documentation',
          provider: 'Official docs',
          url: roleFallbackSource[input.careerGoal] || 'https://developer.mozilla.org/en-US/docs/Learn',
          sourceType: 'Reference fallback',
          level: input.experienceLevel,
          reason: `A general trusted starting point for the ${phase.name.toLowerCase()} phase when no closer role-specific source was matched.`,
          youtubeCourses: []
        }
      ];
}

export function buildSourceSelectionSummary(input) {
  if (input.pathType === 'non-tech') {
    return `Study content is filtered toward official boards, government portals, defence recruitment sites, and accredited learning platforms, then narrowed to ${input.experienceLevel.toLowerCase()}-level material that matches the learner's goal and phase topics.`;
  }

  return `Study content is filtered toward official documentation and established learning paths, then narrowed to ${input.experienceLevel.toLowerCase()}-level material that matches the learner's role and phase topics.`;
}
