import { GoogleGenerativeAI } from "@google/generative-ai";

const genAi = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-2.5-flash" });

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

export const askQuestion = async (transcript: string, question: string) => {
  console.log("Ask Question Function is running");
  console.log("Transcript coming", transcript);
  const trimmed = transcript.slice(0, 12000);

  const prompt = `You are an AI assistant that answers questions about a meeting transcript.

IMPORTANT:
- If the question is short or ambiguous (like "what was the goal"),
  assume it refers to the meeting.
- Always interpret questions in the context of the meeting.

Answer clearly and concisely.

If not found, say "Not mentioned in the meeting".

Return JSON:

{
  "answer": "",
  "reference": ""
}

Transcript:
${trimmed}

Question:
${question}
`;
  const result = await model.generateContent(prompt);
  const response = await result.response;

  let raw = response.text();
  raw = raw.replace(/```json|```/g, "").trim();

  try {
    console.log(JSON.parse(raw));
    return JSON.parse(raw);
  } catch (error) {
    console.error("Chat parse Error:", error);
    throw error;
  }
};
