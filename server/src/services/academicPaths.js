const boardCareerCatalog = {
  '10th': {
    Maths: {
      title: 'Career options after 10th with Maths focus',
      description:
        'If you are in class 10 and want a maths-heavy path, these are the strongest academic and career routes to explore before choosing class 11 subjects.',
      options: [
        {
          title: 'Science stream (PCM) in class 11-12',
          type: 'Academic route',
          fit: 'Best for engineering, computer science, data, defence technical entries, and architecture preparation.',
          nextStep: 'Shortlist schools with strong PCM support and start strengthening algebra, geometry, and physics basics.',
          outcomes: ['Engineering', 'Computer Science', 'AI/Data foundations', 'Architecture']
        },
        {
          title: 'Commerce with Maths',
          type: 'Academic route',
          fit: 'Good if you want finance, economics, business analytics, actuarial science, or management-oriented careers later.',
          nextStep: 'Keep maths strong and explore accountancy, economics, and business studies before class 11 selection.',
          outcomes: ['CA/CMA/CS', 'Economics', 'Finance', 'Management']
        },
        {
          title: 'Polytechnic diploma after 10th',
          type: 'Technical route',
          fit: 'Useful for students who want an earlier technical route into engineering branches, practical labs, and diploma-based progression.',
          nextStep: 'Research state polytechnic admissions, eligibility, and branches like CS, electrical, mechanical, or civil.',
          outcomes: ['Diploma engineering', 'Lateral entry BTech', 'Technical jobs', 'Applied tech skills']
        },
        {
          title: 'ITI and technical vocational programs',
          type: 'Skill route',
          fit: 'Strong for hands-on learners who prefer practical technical training and job-oriented courses after class 10.',
          nextStep: 'Compare ITI trades, duration, placement support, and whether you want electrical, fitter, draftsman, or computer operator tracks.',
          outcomes: ['Technical trades', 'Apprenticeships', 'Industry certifications', 'Early employability']
        },
        {
          title: 'Computer and coding foundation path',
          type: 'Future-ready route',
          fit: 'Good if you like maths and problem solving and may want software, AI, cybersecurity, or data careers later.',
          nextStep: 'Choose a class 11 route that keeps maths active and start foundational coding with Python, logic, and basic computer science.',
          outcomes: ['Software development', 'Cybersecurity', 'AI/ML', 'Data analytics']
        },
        {
          title: 'Defence preparation through maths-heavy senior secondary route',
          type: 'Competitive route',
          fit: 'Useful if you want NDA or technical defence entries where maths and disciplined preparation matter.',
          nextStep: 'Prefer a maths-based stream, maintain fitness, and track NDA-oriented preparation after board basics are stable.',
          outcomes: ['NDA pathway', 'Technical defence entries', 'SSB preparation', 'Military academies']
        }
      ]
    },
    Science: {
      title: 'Career options after 10th through Science',
      description:
        'Science keeps multiple options open after class 10, especially if you want medicine, engineering, research, or technical careers.',
      options: [
        {
          title: 'PCB stream for medical and life sciences',
          type: 'Academic route',
          fit: 'Suitable for medicine, pharmacy, nursing, biotechnology, and allied health sciences.',
          nextStep: 'Assess interest in biology and prepare for a disciplined NCERT-based science foundation.',
          outcomes: ['Medicine', 'Pharmacy', 'Biotech', 'Nursing']
        },
        {
          title: 'PCM stream for engineering and technology',
          type: 'Academic route',
          fit: 'Best for engineering, computing, architecture, defence technical entries, and quantitative fields.',
          nextStep: 'Strengthen maths and physics before entering class 11.',
          outcomes: ['Engineering', 'Architecture', 'Defence', 'Computer Science']
        },
        {
          title: 'Polytechnic diploma',
          type: 'Technical route',
          fit: 'Good if you want to enter a technical pathway immediately after class 10.',
          nextStep: 'Review state diploma entrance routes and branch options.',
          outcomes: ['Diploma engineering', 'Lateral entry', 'Technical jobs']
        }
      ]
    },
    Commerce: {
      title: 'Career options after 10th with Commerce interest',
      description:
        'Commerce-focused students after class 10 can build strong routes into finance, business, management, and professional qualifications.',
      options: [
        {
          title: 'Commerce with Accountancy and Economics',
          type: 'Academic route',
          fit: 'Best for CA, CMA, CS, finance, banking, and business studies.',
          nextStep: 'Review accountancy basics and decide whether to keep maths along with commerce.',
          outcomes: ['CA/CMA/CS', 'Banking', 'Finance', 'Business']
        },
        {
          title: 'Commerce with Maths',
          type: 'Quant route',
          fit: 'Adds flexibility for economics, analytics, actuarial science, and management entrances.',
          nextStep: 'Retain maths if you enjoy calculations, data, and analytical problem solving.',
          outcomes: ['Economics', 'Analytics', 'Actuarial science', 'Management']
        }
      ]
    },
    Humanities: {
      title: 'Career options after 10th through Humanities',
      description:
        'Humanities can lead to law, design, public policy, social sciences, teaching, and communication-oriented careers.',
      options: [
        {
          title: 'Humanities with core social science subjects',
          type: 'Academic route',
          fit: 'Strong for law, civil services foundation, psychology, literature, teaching, and public policy.',
          nextStep: 'Choose subjects based on interest in history, political science, sociology, or psychology.',
          outcomes: ['Law', 'Civil services foundation', 'Teaching', 'Social sciences']
        }
      ]
    },
    'Not decided': {
      title: 'Career options after 10th if stream is not decided yet',
      description:
        'Before finalizing your stream, compare your strengths in maths, science, writing, business subjects, and long-term career interests.',
      options: [
        {
          title: 'Science stream',
          type: 'Wide-open route',
          fit: 'Keeps engineering, medical, defence, and many technical options open.',
          nextStep: 'Check whether you enjoy maths, science, and disciplined theory + practice.',
          outcomes: ['Engineering', 'Medicine', 'Research', 'Defence']
        },
        {
          title: 'Commerce stream',
          type: 'Business route',
          fit: 'Good for finance, business, management, and professional commerce courses.',
          nextStep: 'Review interest in numbers, business, economics, and accountancy.',
          outcomes: ['Finance', 'CA/CMA/CS', 'Management', 'Business']
        },
        {
          title: 'Humanities stream',
          type: 'Social science route',
          fit: 'Best for law, teaching, design, civil services foundation, and communication-heavy fields.',
          nextStep: 'Evaluate your interest in reading, writing, social sciences, and public affairs.',
          outcomes: ['Law', 'Design', 'Teaching', 'Public policy']
        }
      ]
    }
  },
  '11th': {
    Maths: {
      title: 'Career options after class 11-12 with Maths',
      description:
        'A maths stream in senior secondary opens strong quantitative, technical, and analytical careers.',
      options: [
        {
          title: 'Engineering and computer science',
          type: 'Degree route',
          fit: 'Strong if you like maths, physics, problem solving, and technical systems.',
          nextStep: 'Build PCM fundamentals and prepare for engineering entrances or degree admissions.',
          outcomes: ['BTech/BE', 'Computer Science', 'AI/ML', 'Electronics']
        },
        {
          title: 'BSc Maths, Statistics, or Data-related programs',
          type: 'Academic route',
          fit: 'Useful for analytics, research, actuarial, teaching, and quantitative careers.',
          nextStep: 'Keep maths strong and explore statistics, coding, and logical reasoning.',
          outcomes: ['Statistics', 'Data', 'Research', 'Teaching']
        },
        {
          title: 'Architecture or design with maths eligibility',
          type: 'Creative-technical route',
          fit: 'Good if you like design, structure, drawing, and technical creativity.',
          nextStep: 'Check eligibility for architecture entrances and build drawing + maths readiness.',
          outcomes: ['Architecture', 'Interior design', 'Planning']
        }
      ]
    }
  },
  '12th': {
    Maths: {
      title: 'Career options after 12th with Maths',
      description:
        'After class 12 with a maths-oriented background, you can move into technical, business, analytics, defence, and design routes.',
      options: [
        {
          title: 'Engineering, computing, and AI programs',
          type: 'Degree route',
          fit: 'Strong for students who enjoy quantitative problem solving and technology.',
          nextStep: 'Target admissions and shortlist branches aligned with your interests.',
          outcomes: ['Engineering', 'Computer Science', 'AI/Data', 'Electronics']
        },
        {
          title: 'Commerce, finance, and economics with quantitative edge',
          type: 'Business route',
          fit: 'Maths gives you an advantage in economics, analytics, finance, and actuarial directions.',
          nextStep: 'Compare BCom, economics, finance, analytics, and professional credentials.',
          outcomes: ['Finance', 'Economics', 'Actuarial', 'Analytics']
        },
        {
          title: 'Defence and competitive quantitative routes',
          type: 'Competitive route',
          fit: 'Useful if you want NDA, defence technical entries, or aptitude-heavy exams.',
          nextStep: 'Balance board completion with physical fitness and aptitude preparation.',
          outcomes: ['NDA', 'Technical defence', 'Competitive exams']
        }
      ]
    }
  }
};

function normalizeKey(value) {
  return value || 'Not decided';
}

function getFallbackBoardProfile(stage) {
  return (
    boardCareerCatalog[stage]?.['Not decided'] ||
    boardCareerCatalog['10th']['Not decided']
  );
}

function getBoardProfile(stage, stream) {
  return (
    boardCareerCatalog[stage]?.[stream] ||
    boardCareerCatalog[stage]?.['Not decided'] ||
    getFallbackBoardProfile(stage)
  );
}

export function buildAcademicContextSummary({ careerGoal, academicStage, boardStream }) {
  if (careerGoal !== 'Board Exams') {
    return '';
  }

  const classPart = academicStage ? ` in class ${academicStage}` : '';
  const streamPart =
    boardStream && boardStream !== 'Not decided' ? ` with ${boardStream} stream interest` : '';

  return `${classPart}${streamPart}`;
}

export function findBoardCareerOption(input) {
  if (input.careerGoal !== 'Board Exams' || !input.selectedCareerOption) {
    return null;
  }

  const stage = input.academicStage || '10th';
  const stream = normalizeKey(input.boardStream);
  const profile = getBoardProfile(stage, stream);

  return (
    profile.options.find((option) => option.title === input.selectedCareerOption) ||
    null
  );
}

export function buildBoardCareerExplorer(input) {
  if (input.careerGoal !== 'Board Exams') {
    return null;
  }

  const stage = input.academicStage || '10th';
  const stream = normalizeKey(input.boardStream);
  const profile = getBoardProfile(stage, stream);
  const selectedOption = findBoardCareerOption(input);

  if (!profile) {
    return null;
  }

  return {
    title: profile.title,
    description: profile.description,
    stage,
    stream,
    selectedOptionTitle: selectedOption?.title || null,
    options: profile.options.map((option) => ({
      ...option,
      isSelected: option.title === selectedOption?.title
    }))
  };
}
