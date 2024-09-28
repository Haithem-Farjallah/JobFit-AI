import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import promptDetails from "./prompts.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const runGemeni = async (data, cvText) => {
  try {
    const prompt = promptDetails(data, cvText);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Create the request parts
    const requestParts = [prompt, cvText];
    // Pass the request parts to generateContent
    const result = await model.generateContent(requestParts);
    let jsonResponseText = result.response.text();
    jsonResponseText = jsonResponseText.replace(/```json|```/g, ""); // Remove markdown formatting

    const parsedResponse = JSON.parse(jsonResponseText);
    return parsedResponse;
  } catch (error) {
    console.error("Error generating response:", error);
  }
};

//     const prompt = `You will receive the text content of a CV, which may not be in any specific order. Please analyze it and return the percentage match based on the following job description: ${data.description}
//   If the CV contains the information, please return the percentage match based on the information available.
//  Find the best keys to match the CV with the job title and description.
//  if you can not find the information, please return approximate percentage match or 0% if no match is found.
//  return the percentage match with exactness
//  return the result in the following format: "The CV matches the job description by ...%."
//   `;
