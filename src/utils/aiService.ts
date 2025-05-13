import axios from 'axios';
import { getAIResponse as getAIResponseFromService } from '@/services/ai';

/**
 * Gets a response from the AI service using the provided prompt
 * @param prompt The prompt to send to the AI
 * @returns A promise that resolves to the AI's response
 */
export const getAIResponse = async (prompt: string) => {
  try {
    const response = await getAIResponseFromService(prompt);
    return response;
  } catch (error) {
    console.error("Error getting AI response:", error);
    throw new Error("Failed to generate AI response. Please try again.");
  }
};