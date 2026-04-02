import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-3-flash-preview" });

export const extractMeetingInsights = async (transcript: string) => {
  const prompt = `
    You are an AI that analyzes meeting transcripts and extracts structured insights.

Extract the following:

1. Meeting Goal (what was the purpose of the meeting)
2. Key Decisions (what was agreed upon)
3. Action Items (tasks assigned)

For each action item include:
- person
- task
- deadline (or null if not mentioned)

4. Issues Discussed:
List important problems or concerns raised in the meeting.
For each issue include:
- issue
- raisedBy (person name if possible)

5. Summary:
Provide a short 2-3 line summary of the meeting.

6. Highlights:
Important noteworthy points from the meeting.

STRICT RULES:
- Return ONLY valid JSON
- No explanation
- No extra text

FORMAT:

{
  "goal": "",
  "decisions": ["..."],
  "actions": [
    {
      "person": "",
      "task": "",
      "deadline": ""
    }
  ],
  "issues": [
    {
      "issue": "",
      "raisedBy": ""
    }
  ],
  "summary": "",
  "highlights": ["..."]
}

Transcript:
${transcript}
`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let raw = response.text();
  raw = raw.replace(/```json|```/g, "").trim();
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("AI RAW OUTPUT:", raw);
    throw err;
  }
};
