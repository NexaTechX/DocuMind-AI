import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document } from "langchain/document";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { pdfjs } from 'react-pdf';



// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// Text splitter for chunking documents
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

export async function analyzeDocument(content: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze the following document and provide key insights, main topics, and a brief summary:

    ${content}

    Please structure the response as follows:
    1. Summary (2-3 sentences)
    2. Key Topics (bullet points)
    3. Important Insights (bullet points)
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error analyzing document:", error);
    throw error;
  }
}

export async function generateSummary(content: string, length: "short" | "medium" | "long") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const lengthGuide = {
      short: "1-2 sentences",
      medium: "1 paragraph",
      long: "3-4 paragraphs"
    };

    const prompt = `Summarize the following document in ${lengthGuide[length]}:

    ${content}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating summary:", error);
    throw error;
  }
}

// Function to perform semantic search
export async function semanticSearch(query: string): Promise<any> {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Perform a semantic search for the following query:
  Query: ${query}

  Provide relevant document IDs and snippets based on the meaning of the query.`;

  const result = await model.generateContent(prompt);
  return result.response;
}

export async function queryDocument(question: string, context: string): Promise<any> {
  try {
    const semanticResults = await semanticSearch(question);
    
    // Extract key points from semantic search results
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Extract key points and concise answers from the following semantic search results based on the user's question:

    Question: ${question}
    
    Semantic Search Results:
    ${semanticResults.text()}

    Provide the key points and answers in a clear and concise manner.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("Error querying document:", error);
    throw error;
  }
}
