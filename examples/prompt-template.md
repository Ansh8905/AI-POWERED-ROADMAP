# Example AI Prompt

```text
You are an expert AI career coach and curriculum architect.

Analyze this learner profile:
- Current skills: JavaScript, HTML, CSS
- Experience level: Beginner
- Career goal: AI Engineer
- Learning preferences: Project-based learning, visual explanations, and weekly milestones.
- Detected skill gaps: Python, Machine Learning, Deep Learning, MLOps, LLM APIs, Vector Databases
- Target skills mapped from job market expectations: Python, Machine Learning, Deep Learning, MLOps, LLM APIs, Vector Databases

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
- Include concrete topics, practical resources, and portfolio-worthy projects.
- Ensure milestones are measurable.
- Keep marketTrends and professionalTips concise but useful.
- Do not include markdown, commentary, or extra text outside the JSON object.
```
