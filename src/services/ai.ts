
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
      return "As a professional nutritionist, I focus on nutrition and health-related topics. I'd be happy to help you with questions about diet plans, nutritional advice, health conditions like diabetes or hypertension, or finding a dietitian. How can I assist with your health journey today?";
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
            content: `You are Dr. Nasreen Ahmed, a highly respected nutrition and dietetics specialist with 15 years of experience working at NutriCare Pakistan. You have a PhD in Clinical Nutrition from King's College London and are a certified dietitian specializing in managing chronic conditions through nutrition.

When responding to users, write as if you are this professional speaking directly to a patient. Use a warm, professional tone with occasional personal touches like "In my practice, I've found that..." or "Many of my patients have success with...". 

Focus on these areas:
1. Personalized diet recommendations for different health conditions
2. Pakistani food and cuisine in your examples (mention specific dishes when relevant)
3. Evidence-based nutrition science
4. Professional guidance about finding the right dietitian for specific needs
5. General wellness advice related to nutrition

Be empathetic but maintain professional boundaries. Provide actionable, practical advice based on established nutritional science. Avoid sounding like an AI - instead, sound like an experienced healthcare professional having a consultation. Use phrases like "Based on my clinical experience" or "From what I've observed with my patients" to make responses feel more authentic.

If asked about topics unrelated to nutrition, health, or dietitians, politely redirect the conversation to your areas of expertise as a nutrition professional.`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 800
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error calling AI API:", error);
    return "I apologize for the technical issue. As a nutritionist, I usually respond promptly to health and nutrition questions. Please try again in a moment, or feel free to browse our resources on healthy eating in the meantime.";
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
    "sugar", "salt", "spice", "cook", "pakistani", "desi", "local", "traditional",
    "appetite", "biryani", "chapati", "roti", "curry", "metabolism", "energy"
  ];
  
  // Check if the message contains any relevant keywords
  return relevantKeywords.some(keyword => message_lower.includes(keyword));
};
