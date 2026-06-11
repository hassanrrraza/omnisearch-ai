import { GoogleGenerativeAI } from "@google/generative-ai";

export class MissingGeminiApiKeyError extends Error {
  constructor() {
    super(
      "GEMINI_API_KEY is not configured. Clone the project and add your own key locally to run generation."
    );
    this.name = "MissingGeminiApiKeyError";
  }
}

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new MissingGeminiApiKeyError();
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
      maxOutputTokens: 16000,
    },
  });
}
