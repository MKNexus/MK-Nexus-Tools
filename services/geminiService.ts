
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });
const model = 'gemini-2.5-pro';

export const reviewCode = async (code: string, language: string): Promise<string> => {
  const prompt = `
    You are an expert senior software engineer and an automated code review tool.
    Your task is to provide a comprehensive, constructive, and friendly code review.

    Analyze the following ${language} code snippet. I am looking for feedback on:
    1.  **Potential Bugs:** Identify any logical errors, edge cases not handled, or potential runtime errors.
    2.  **Performance Issues:** Suggest optimizations for any inefficient code, such as unnecessary loops, slow algorithms, or memory leaks.
    3.  **Best Practices & Readability:** Check for adherence to common language idioms, naming conventions, and code structure that improves clarity and maintainability.
    4.  **Security Vulnerabilities:** Point out any common security risks (e.g., injection flaws, insecure handling of data).
    5.  **Code Style:** Comment on style consistency and suggest improvements based on established style guides for the language.

    For each point of feedback, please:
    - Clearly explain the issue and why it's a concern.
    - Provide a specific code example of the "before" and "after" to illustrate your suggested improvement.
    - Maintain a positive and helpful tone.

    Format your entire response in Markdown. Use headings, lists, and code blocks to make the review easy to read. If there are no issues, compliment the clean code.

    Here is the code to review:
    \`\`\`${language}
    ${code}
    \`\`\`
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get review from Gemini. Please check your API key and network connection.");
  }
};
