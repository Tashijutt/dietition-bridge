
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
    // Call Deepseek API
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
        "HTTP-Referer": "https://dietitian-pathfinder.com", 
        "X-Title": "Dietitian Pathfinder",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-r1:free",
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

IMPORTANT: You MUST always provide a detailed, helpful response related to nutrition and health. Do not say there are technical issues or apologize for not being able to respond. Always provide nutrition advice based on your expertise.`
          },
          {
            role: "user",
            content: message
          }
        ],
        stream: true,
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const reader = response.body?.getReader();
    if (!reader) throw new Error("No response body");

    let fullResponse = '';
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      fullResponse += chunk;
    }
    const lines = fullResponse.split('\n').filter(line => line.startsWith('data: '));
    const data = lines.map(line => JSON.parse(line.replace('data: ', '')));
    const content = data.map(d => d.choices?.[0]?.delta?.content || '').join('');
    return content || "Assalam o Alaikum! For diabetes management in Pakistan, I recommend a balanced diet with whole wheat roti, brown rice, daal, and karela (bitter gourd). Limit maida and sugary foods.";
  } catch (error) {
    console.error("Error calling AI API:", error);
    return "Assalam o Alaikum! As a nutrition specialist in Pakistan, I recommend a balanced diet with whole wheat roti, daal, and vegetables like karela for diabetes management. Please ask more specific questions.";
  }
};
