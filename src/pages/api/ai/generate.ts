import { NextApiRequest, NextApiResponse } from 'next';
import { generateDietPlan } from '@/api/dietPlan';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { prompt, userId } = req.body;
    
    if (!prompt || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const content = await generateDietPlan(prompt, userId);
    
    return res.status(200).json({ content });
  } catch (error) {
    console.error('Error in AI generate endpoint:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return res.status(500).json({ message: errorMessage });
  }
}