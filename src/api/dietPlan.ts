import axios from 'axios';
import { connectToDatabase } from '@/lib/mongodb';

export async function generateDietPlan(prompt: string, userId: string) {
  try {
    // Get API key from environment variable
    const apiKey = process.env.VITE_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      throw new Error('OpenAI API key is not configured');
    }
    
    // Call your AI API (e.g., OpenAI)
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional nutritionist and dietitian. Create detailed, personalized diet plans based on user information.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating diet plan:', error);
    throw new Error('Failed to generate diet plan');
  }
}

export async function saveDietPlan(userId: string, title: string, content: string, metadata: any) {
  try {
    const { db } = await connectToDatabase();
    
    const result = await db.collection('dietPlans').insertOne({
      userId,
      title,
      content,
      metadata,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return { id: result.insertedId.toString() };
  } catch (error) {
    console.error('Error saving diet plan:', error);
    throw new Error('Failed to save diet plan');
  }
}