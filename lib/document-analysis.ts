import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export interface AnalysisResult {
  summary: string;
  keyTopics: string[];
  insights: string[];
}

export async function analyzeDocument(content: string): Promise<AnalysisResult> {
  try {
    if (!content || content.trim() === '') {
      throw new Error('Document content is empty');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the following document and provide:
    1. A concise summary (2-3 sentences)
    2. Key topics (as bullet points)
    3. Important insights (as bullet points)

    Document content:
    ${content}

    Format the response as JSON with the following structure:
    {
      "summary": "...",
      "keyTopics": ["...", "..."],
      "insights": ["...", "..."]
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse AI response:", parseError);
      // Fallback structured response if JSON parsing fails
      return {
        summary: text.split('\n')[0] || "Analysis completed",
        keyTopics: ["Content analyzed"],
        insights: ["See full text for details"]
      };
    }
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to analyze document");
  }
}

export async function generateSummary(
  content: string,
  length: "short" | "medium" | "long"
): Promise<string> {
  try {
    if (!content || content.trim() === '') {
      throw new Error('Document content is empty');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const lengthGuide = {
      short: "1-2 sentences",
      medium: "1 paragraph",
      long: "2-3 paragraphs"
    };

    const prompt = `Summarize the following document in ${lengthGuide[length]}:
    ${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to generate summary");
  }
}

export async function extractKeyPoints(content: string): Promise<string[]> {
  try {
    if (!content || content.trim() === '') {
      throw new Error('Document content is empty');
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Extract the main key points from the following document as a list:
    ${content}

    Format the response as JSON array of strings.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    try {
      return JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse key points response:", parseError);
      // Fallback if JSON parsing fails
      return [text];
    }
  } catch (error) {
    console.error("Error extracting key points:", error);
    throw new Error(error instanceof Error ? error.message : "Failed to extract key points");
  }
}