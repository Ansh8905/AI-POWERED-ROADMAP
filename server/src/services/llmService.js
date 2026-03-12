import { buildFallbackRoadmap, enrichRoadmapWithTrustedSources } from './roadmapEngine.js';

function extractJsonBlock(content) {
  const fencedMatch = content.match(/```json\s*([\s\S]*?)```/i);
  if (fencedMatch) {
    return fencedMatch[1];
  }

  const objectMatch = content.match(/\{[\s\S]*\}/);
  return objectMatch ? objectMatch[0] : content;
}

export function buildRoadmapPrompt(input, analysis) {
  return `
You are an expert AI career coach and curriculum architect.

Analyze this learner profile:
- Track type: ${input.pathType || 'tech'}
- Current skills: ${analysis.normalizedSkills.join(', ') || 'None provided'}
- Experience level: ${input.experienceLevel}
- Career goal: ${input.careerGoal}
- Learning preferences: ${input.learningPreferences}
- Detected skill gaps: ${analysis.skillGaps.join(', ') || 'No major gaps detected'}
- Target skills mapped from job market expectations: ${analysis.targetSkills.join(', ')}

Return only valid JSON with this exact schema:
{
  "title": "Career Roadmap",
  "overview": "Description of the learning path",
  "phases": [
    {
      "name": "Foundation",
      "topics": ["Topic 1"],
      "resources": ["Resource 1"],
      "projects": ["Project 1"],
      "milestone": "Milestone text"
    }
  ],
  "marketTrends": ["Trend 1"],
  "professionalTips": ["Tip 1"]
}

Requirements:
- Create 3 to 4 learning phases.
- Make the roadmap specific to the target role and learner level.
- Include concrete topics, practical resources, and portfolio-worthy projects or practice tasks.
- Prefer official documentation, vendor guides, and widely trusted educational sources in the resource suggestions.
- If the track is non-tech, adapt the roadmap for exams or academic preparation using syllabus coverage, mock tests, revision strategy, and official portals.
- For non-tech tracks, use the "projects" field for practice tasks such as mock tests, answer-writing drills, case analysis, or revision deliverables.
- Ensure milestones are measurable.
- Keep marketTrends and professionalTips concise but useful.
- Do not include markdown, commentary, or extra text outside the JSON object.
`.trim();
}

async function callOpenAI(prompt) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: prompt
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`LLM request failed: ${errorText}`);
  }

  const data = await response.json();
  return data.output_text || '';
}

export async function generateRoadmapWithAi({ input, analysis }) {
  const provider = process.env.LLM_PROVIDER || 'openai';
  const prompt = buildRoadmapPrompt(input, analysis);

  if (provider !== 'openai') {
    throw new Error(`Unsupported LLM_PROVIDER: ${provider}`);
  }

  const raw = await callOpenAI(prompt);
  const jsonString = extractJsonBlock(raw);
  return JSON.parse(jsonString);
}

export async function generateRoadmap({ input, analysis }) {
  try {
    const roadmap = enrichRoadmapWithTrustedSources(
      await generateRoadmapWithAi({ input, analysis }),
      input,
      analysis
    );

    return {
      roadmap,
      generator: 'llm',
      prompt: buildRoadmapPrompt(input, analysis)
    };
  } catch (error) {
    return {
      roadmap: enrichRoadmapWithTrustedSources(buildFallbackRoadmap(input, analysis), input, analysis),
      generator: 'fallback',
      prompt: buildRoadmapPrompt(input, analysis),
      warning: error.message
    };
  }
}
