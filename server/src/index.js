import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { analyzeProfile } from './services/roadmapEngine.js';
import { generateRoadmap } from './services/llmService.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

function validateBody(body) {
  const { currentSkills, experienceLevel, careerGoal, learningPreferences } = body;

  if (!Array.isArray(currentSkills) || currentSkills.length === 0) {
    return 'currentSkills must be a non-empty array.';
  }

  if (!experienceLevel || !careerGoal || !learningPreferences) {
    return 'experienceLevel, careerGoal, and learningPreferences are required.';
  }

  return null;
}

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/generate-roadmap', async (request, response) => {
  const validationError = validateBody(request.body);

  if (validationError) {
    return response.status(400).json({ error: validationError });
  }

  try {
    const input = {
      pathType: request.body.pathType || 'tech',
      currentSkills: request.body.currentSkills,
      experienceLevel: request.body.experienceLevel,
      careerGoal: request.body.careerGoal,
      learningPreferences: request.body.learningPreferences,
      academicStage: request.body.academicStage || '10th',
      boardStream: request.body.boardStream || 'Not decided',
      selectedCareerOption: request.body.selectedCareerOption || ''
    };

    const analysis = analyzeProfile(input);
    const result = await generateRoadmap({ input, analysis });

    return response.json({
      roadmap: result.roadmap,
      meta: {
        generator: result.generator,
        prompt: result.prompt,
        warning: result.warning || null,
        skillGaps: analysis.skillGaps,
        targetSkills: analysis.targetSkills,
        profileSummary: analysis.summary,
        selectedCareerOption: input.selectedCareerOption || null
      }
    });
  } catch (error) {
    return response.status(500).json({
      error: 'Failed to generate roadmap.',
      details: error.message
    });
  }
});

app.listen(port, () => {
  console.log(`Roadmap API listening on http://localhost:${port}`);
});
