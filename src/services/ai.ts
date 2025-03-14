
// AI service for handling chat functionality

// Deepseek API key
const DEEPSEEK_API_KEY = "sk-e0f52b7d61fc4c62ae0d5030cca5530f";

/**
 * Get AI response from Deepseek API
 * @param message User message
 * @returns AI response
 */
export const getAIResponse = async (message: string): Promise<string> => {
  try {
    // Check if message is related to health, nutrition, or dietitians
    const isRelevantQuery = checkIfRelevantQuery(message);
    
    if (!isRelevantQuery) {
      return "I'm specialized in nutrition and health-related topics. I can help you with questions about diet plans, nutritional advice, health conditions like diabetes or hypertension, or finding a dietitian. How can I assist you with your health or nutrition concerns?";
    }
    
    // Call Deepseek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are a professional nutrition assistant working for NutriCare Pakistan. Your expertise is in providing nutrition advice, diet plans, and information related to managing health conditions like diabetes, hypertension, and weight management.

Focus on these areas:
1. Personalized diet recommendations for different health conditions
2. Pakistani food and cuisine in your examples
3. Answering questions about nutrition science
4. Providing information about dietitians and their specialties
5. General wellness and health advice related to nutrition

Be professional, empathetic, and concise. Provide practical, actionable advice. Do not provide medical diagnoses or treatment. If asked about topics unrelated to nutrition, health, or dietitians, politely redirect the conversation to your areas of expertise.`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling AI API:", error);
    return "I'm sorry, I'm having trouble connecting to my knowledge base right now. Please try again later.";
  }
};

/**
 * Check if the user query is related to health, nutrition, or dietitians
 */
const checkIfRelevantQuery = (message: string): boolean => {
  const message_lower = message.toLowerCase();
  
  // Keywords related to nutrition, health, and dietitians
  const relevantKeywords = [
    "diet", "nutrition", "food", "meal", "eat", "dietitian", "health", 
    "weight", "calories", "carbs", "protein", "fat", "vitamin", 
    "mineral", "diabetes", "hypertension", "blood pressure", "cholesterol",
    "heart", "exercise", "fitness", "healthy", "recipe", "plan", "menu",
    "breakfast", "lunch", "dinner", "snack", "fruit", "vegetable", "meat",
    "dairy", "gluten", "allergy", "supplement", "nutrient", "obese", "obesity",
    "slim", "thin", "overweight", "underweight", "doctor", "medical", "clinic",
    "sugar", "salt", "spice", "cook", "pakistani", "desi", "local", "traditional"
  ];
  
  // Check if the message contains any relevant keywords
  return relevantKeywords.some(keyword => message_lower.includes(keyword));
};
