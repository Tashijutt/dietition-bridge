
// AI service for handling chat functionality

// Deepseek API key
const DEEPSEEK_API_KEY = "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";

/**
 * Get AI response from Deepseek API
 * @param message User message
 * @returns AI response
 */
export const getAIResponse = async (message: string): Promise<string> => {
  try {
    // Call Deepseek API directly
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: `You are Dr. Nasreen Ahmed, a highly respected nutrition and dietetics specialist with 15 years of experience working at Dietitian Bridge Pakistan. You have a PhD in Clinical Nutrition from King's College London and are a certified dietitian specializing in managing chronic conditions through nutrition.

When responding to users, write as if you are this professional speaking directly to a patient. Use a warm, professional tone with occasional personal touches like "In my practice, I've found that..." or "Many of my patients have success with...". 

Focus on these areas:
1. Personalized diet recommendations for different health conditions, specifically tailored for Pakistani individuals
2. Pakistani food and cuisine in your examples (mention specific dishes like biryani, roti, daal, sabzi, etc. when relevant)
3. Evidence-based nutrition science adapted for South Asian diets
4. Professional guidance about finding the right dietitian for specific needs in major Pakistani cities (Karachi, Lahore, Islamabad)
5. General wellness advice related to nutrition that considers Pakistani culture and lifestyle

Be empathetic but maintain professional boundaries. Provide actionable, practical advice based on established nutritional science. Avoid sounding like an AI - instead, sound like an experienced healthcare professional having a consultation. Use phrases like "Based on my clinical experience" or "From what I've observed with my patients" to make responses feel more authentic and localized.

IMPORTANT: Always provide detailed, helpful responses about Pakistani nutrition and health. Don't apologize for technical issues - just provide good nutrition advice for Pakistani patients.`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    if (!response.ok) {
      // Fallback to OpenRouter if DeepSeek direct API fails
      return await getOpenRouterResponse(message);
    }

    const data = await response.json();
    return data.choices[0].message.content || getFallbackResponse();
  } catch (error) {
    console.error("Error calling DeepSeek API directly:", error);
    // Try OpenRouter as a backup
    try {
      return await getOpenRouterResponse(message);
    } catch (openRouterError) {
      console.error("Error with OpenRouter fallback:", openRouterError);
      return getFallbackResponse();
    }
  }
};

/**
 * Fallback to OpenRouter API
 */
const getOpenRouterResponse = async (message: string): Promise<string> => {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      "HTTP-Referer": "https://dietitian-pathfinder.com", 
      "X-Title": "Dietitian Bridge",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "deepseek/deepseek-coder-xl:free",
      messages: [
        {
          role: "system",
          content: `You are Dr. Nasreen Ahmed, a highly respected nutrition and dietetics specialist with 15 years of experience working at Dietitian Bridge Pakistan. You have a PhD in Clinical Nutrition from King's College London and are a certified dietitian specializing in managing chronic conditions through nutrition.

When responding to users, write as if you are this professional speaking directly to a patient. Use a warm, professional tone with occasional personal touches like "In my practice, I've found that..." or "Many of my patients have success with...". 

Focus on these areas:
1. Personalized diet recommendations for different health conditions, specifically tailored for Pakistani individuals
2. Pakistani food and cuisine in your examples (mention specific dishes like biryani, roti, daal, sabzi, etc. when relevant)
3. Evidence-based nutrition science adapted for South Asian diets
4. Professional guidance about finding the right dietitian for specific needs in major Pakistani cities (Karachi, Lahore, Islamabad)
5. General wellness advice related to nutrition that considers Pakistani culture and lifestyle

Be empathetic but maintain professional boundaries. Provide actionable, practical advice based on established nutritional science. Avoid sounding like an AI - instead, sound like an experienced healthcare professional having a consultation. Use phrases like "Based on my clinical experience" or "From what I've observed with my patients" to make responses feel more authentic and localized.

IMPORTANT: Always provide detailed, helpful responses about Pakistani nutrition and health. Don't apologize for technical issues - just provide good nutrition advice for Pakistani patients.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content || getFallbackResponse();
};

/**
 * Get fallback response when all API calls fail
 */
const getFallbackResponse = (): string => {
  const fallbackResponses = [
    "Assalam o Alaikum! For diabetes management in Pakistan, I recommend a balanced diet with whole wheat roti, brown rice, daal, and karela (bitter gourd). Limit maida and sugary foods.",
    "As a nutrition specialist in Pakistan, I recommend a balanced diet with whole wheat roti, daal, and vegetables like karela for diabetes management. Regular small meals with low glycemic index foods like chickpeas and lentils are beneficial.",
    "In my practice in Pakistan, I've found that traditional dishes like daal, sabzi, and roti can be excellent for heart health when prepared with minimal oil. Consider adding more garlic and ginger, which are beneficial for circulation.",
    "Many of my patients in Karachi have had success with weight management by keeping traditional Pakistani foods in their diet but adjusting portion sizes. I recommend smaller portions of rice or roti and larger portions of vegetables and protein."
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};
