# AI Powered Personalized Roadmap Generator

Full-stack web application that builds personalized learning roadmaps from a user's current skills, experience level, career goal, and learning preferences.

## Project Structure

```text
AI ROADMAP PROJECT/
|-- scripts/
|   `-- dev.js
|-- client/
|   |-- src/
|   |   |-- components/
|   |   |   |-- LoadingState.jsx
|   |   |   |-- ProfileForm.jsx
|   |   |   `-- RoadmapView.jsx
|   |   |-- App.jsx
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- index.html
|   |-- package.json
|   |-- postcss.config.js
|   |-- tailwind.config.js
|   `-- vite.config.js
|-- examples/
|   |-- example-output.json
|   `-- prompt-template.md
|-- server/
|   |-- src/
|   |   |-- services/
|   |   |   |-- llmService.js
|   |   |   `-- roadmapEngine.js
|   |   `-- index.js
|   |-- .env.example
|   `-- package.json
|-- .gitignore
|-- package.json
`-- README.md
```

## Features

- React + Tailwind responsive UI with a modern, card-based layout
- Profile form for skills, experience level, career goal, and learning preferences
- Roadmap display with phases, resources, trusted study content, projects, milestones, market trends, and professional tips
- Express API endpoint at `/generate-roadmap`
- Prompt engineering and structured JSON generation
- Trusted source recommendations filtered by learner level, role, and roadmap phase
- JSON extraction, parsing, validation, and error handling
- Fallback roadmap generation when no LLM API key is configured

## Local Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create a server environment file:

```bash
copy server\\.env.example server\\.env
```

3. Add your API key in `server/.env`.

4. Start both apps from the project root:

```bash
npm run dev
```

5. Open the frontend at `http://localhost:5173`.

## Environment Variables

Create `server/.env` from [server/.env.example](/c:/Users/ASUS-PC/Desktop/AI%20ROADMAP%20PROJECT/server/.env.example).

```env
PORT=5000
LLM_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-4.1-mini
```

If `OPENAI_API_KEY` is empty, the server uses the built-in fallback roadmap generator so the project still works locally.

## API

### `POST /generate-roadmap`

Request body:

```json
{
  "currentSkills": ["JavaScript", "HTML", "CSS"],
  "experienceLevel": "Beginner",
  "careerGoal": "AI Engineer",
  "learningPreferences": "Project-based learning with weekly milestones"
}
```

Response body:

```json
{
  "roadmap": {
    "title": "AI Engineer Career Roadmap",
    "overview": "Structured path from current level to target role.",
    "phases": [
      {
        "name": "Foundation",
        "topics": ["Topic 1"],
        "resources": ["Resource 1"],
        "studyContent": [
          {
            "title": "Python Tutorial",
            "provider": "Python Docs",
            "url": "https://docs.python.org/3/tutorial/",
            "sourceType": "Official documentation",
            "level": "Beginner",
            "reason": "Why this source fits this learner and phase"
          }
        ],
        "projects": ["Project 1"],
        "milestone": "Milestone text"
      }
    ],
    "marketTrends": [],
    "professionalTips": [],
    "sourceSelectionSummary": "How trusted sources were filtered"
  },
  "meta": {
    "generator": "llm",
    "prompt": "Prompt text",
    "warning": null,
    "skillGaps": [],
    "targetSkills": [],
    "profileSummary": "..."
  }
}
```

## Example Prompt

See [examples/prompt-template.md](/c:/Users/ASUS-PC/Desktop/AI%20ROADMAP%20PROJECT/examples/prompt-template.md).

## Example JSON Output

See [examples/example-output.json](/c:/Users/ASUS-PC/Desktop/AI%20ROADMAP%20PROJECT/examples/example-output.json).
