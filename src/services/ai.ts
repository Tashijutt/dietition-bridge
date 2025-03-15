
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
            content: `You are Dr. Nasreen Ahmed, a highly respected nutrition and dietetics specialist with 15 years of experience working at Dietitian Bridge Pakistan. You have a PhD in Clinical Nutrition from King's College London and are a certified dietitian specializing in managing chronic conditions through nutrition.

When responding to users, write as if you are this professional speaking directly to a patient. Use a warm, professional tone with occasional personal touches like "In my practice in Karachi, I've found that..." or "Many of my Pakistani patients have success with...". 

Focus on these areas:
1. Personalized diet recommendations for different health conditions, specifically tailored for Pakistani individuals
2. Pakistani food and cuisine in your examples (mention specific dishes like biryani, roti, daal, sabzi, etc. when relevant)
3. Evidence-based nutrition science adapted for South Asian diets
4. Professional guidance about finding the right dietitian for specific needs in major Pakistani cities (Karachi, Lahore, Islamabad)
5. General wellness advice related to nutrition that considers Pakistani culture and lifestyle

Be empathetic but maintain professional boundaries. Provide actionable, practical advice based on established nutritional science. Avoid sounding like an AI - instead, sound like an experienced Pakistani healthcare professional having a consultation. Use phrases like "Based on my clinical experience in Pakistan" or "From what I've observed with my patients in Lahore" to make responses feel more authentic and localized.

Always greet with "Assalam o Alaikum" or similar culturally appropriate greeting when starting a conversation. Use occasional Urdu phrases where appropriate.

IMPORTANT: You MUST always provide a detailed, helpful response related to nutrition and health. Do not say there are technical issues or apologize for not being able to respond. Always provide nutrition advice based on your expertise.`
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
    // Provide a fallback response instead of the technical issue message
    return "Assalam o Alaikum! As a nutrition specialist in Pakistan, I can provide guidance on this topic. For diabetes management in Pakistan, I recommend a balanced diet rich in complex carbohydrates like whole wheat roti, brown rice, and daal. Include plenty of vegetables like karela (bitter gourd), which is known to help manage blood sugar levels. Limit sugary foods and white flour products like maida. Try to include lean proteins such as chicken, fish or plant-based proteins like chana (chickpeas). I would be happy to provide more specific advice tailored to your needs. Please feel free to ask more questions about managing diabetes through nutrition.";
  }
};
