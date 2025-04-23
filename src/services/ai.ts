
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
    // Define allowed topics and generic triggers with expanded disease and nutrition terms
    const allowedTopics = [
      "health", "diet", "nutrition", "yoga", "gym", "exercise", "fitness", "weight loss", "weight gain", 
      "wellness", "medical", "dietitian", "diabetes", "hypertension", "blood pressure", "cholesterol",
      "heart", "cardiac", "obesity", "thyroid", "meal", "food", "recipe", "breakfast", "lunch", "dinner",
      "snack", "protein", "carbs", "carbohydrates", "fat", "vitamin", "mineral", "fiber", "sugar", "salt",
      "sodium", "potassium", "calcium", "iron", "zinc", "magnesium", "antioxidant"
    ];
    const genericGreetings = [
      "hello", "hi", "hey", "good morning", "good afternoon", "good evening"
    ];
    const identityTriggers = [
      "who are you", "your name", "what do you do", "your role", "what are you", "who is this", "who am i talking to"
    ];
    const dateTriggers = [
      "what is the date", "date today", "today's date"
    ];
    const dayTriggers = [
      "what is the day", "day today", "today's day"
    ];
    const howAreYouTriggers = [
      "how are you", "how's it going", "how do you do"
    ];

    const lowerMsg = message.toLowerCase().trim();

    // Check for specific health condition questions
    const isHealthConditionQuestion = /how can i (manage|treat|handle|control|reduce|lower|help with|improve)\s+(my)?\s*(diabetes|blood pressure|hypertension|cholesterol|obesity|thyroid|heart disease|cardiac|weight)/i.test(message);
    
    // Check for meal recommendation questions
    const isMealQuestion = /recommend|suggest|what (should|can) (i|one) (eat|have|cook|prepare|make)|meal plan|diet plan|food for|recipes for/i.test(message);
    
    // 1. Identity/persona questions
    if (identityTriggers.some(trigger => lowerMsg.includes(trigger))) {
      const identityTemplates = [
        "I'm Dr. Nasreen Ahmed, your dedicated nutrition specialist at Dietitian Bridge Pakistan. I help people achieve their health goals through personalized diet advice. How can I assist you today?",
        "Hello! My name is Dr. Nasreen Ahmed, and I'm a nutrition expert with Dietitian Bridge Pakistan. If you have questions about diet, nutrition, or wellness, I'm here to help.",
        "You're chatting with Dr. Nasreen Ahmed, a specialist in nutrition and dietetics at Dietitian Bridge Pakistan. Let me know how I can support your health journey.",
        "Hi, I'm Dr. Nasreen Ahmed from Dietitian Bridge Pakistan. I provide expert advice on nutrition, diet, and wellness. What would you like to discuss today?",
        "This is Dr. Nasreen Ahmed, your nutrition and wellness advisor at Dietitian Bridge Pakistan. Ask me anything about healthy eating or fitness!"
      ];
      // Pick a random template for variety
      const randomIndex = Math.floor(Math.random() * identityTemplates.length);
      return identityTemplates[randomIndex];
    }

    // 2. Date/day questions
    if (dateTriggers.some(trigger => lowerMsg.includes(trigger))) {
      const today = new Date();
      const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      const dateResponses = [
        `Today is ${dateStr}. Got any health goals for today?`,
        `It's ${dateStr}. A perfect day to focus on your nutrition! How can I help?`,
        `${dateStr} today. Would you like some dietary tips suitable for this time of year?`,
        `The date is ${dateStr}. Many of my patients find seasonal eating beneficial - interested in discussing that?`,
        `Today's date is ${dateStr}. Have you been tracking your meals this month? I'd be happy to provide guidance.`,
        `${dateStr} - a great day to discuss your health journey! What nutrition topics interest you?`,
        `It's ${dateStr}. In my practice, I find setting small daily health goals works well. Would you like some suggestions?`
      ];
      return dateResponses[Math.floor(Math.random() * dateResponses.length)];
    }
    
    if (dayTriggers.some(trigger => lowerMsg.includes(trigger))) {
      const today = new Date();
      const dayStr = today.toLocaleDateString('en-US', { weekday: 'long' });
      const dayResponses = [
        `It's ${dayStr}. Perfect day to talk about your fitness routine—any questions?`,
        `Today is ${dayStr}. Many of my patients use weekdays for structured meal planning. Need help with that?`,
        `${dayStr} today! A good day to discuss your nutritional needs. What's on your mind?`,
        `It's ${dayStr}. Would you like some healthy meal ideas specifically for today?`,
        `${dayStr} - how are your health goals coming along this week?`,
        `Today is ${dayStr}. In my clinic, we often discuss weekly meal prep on this day. Interested?`,
        `It's ${dayStr}! Have you been maintaining your water intake today? Hydration is crucial for health.`,
        `${dayStr} - a wonderful day to focus on your wellness. What aspect of nutrition would you like to explore?`
      ];
      return dayResponses[Math.floor(Math.random() * dayResponses.length)];
    }

    // 3. How are you
    if (howAreYouTriggers.some(trigger => lowerMsg.includes(trigger))) {
      const howAreYouResponses = [
        "I'm doing great, thanks for asking! How about you—any health or diet questions on your mind?",
        "I'm well, thank you! I've been reviewing some interesting research on Pakistani dietary patterns. What nutrition topics interest you?",
        "Alhamdulillah, I'm doing well! I'm excited to help with any nutrition or health questions you might have today.",
        "I'm excellent! Just finished a consultation about managing diabetes through traditional Pakistani cuisine. How can I assist you?",
        "I'm very well! In my practice, I always ask patients how their relationship with food is going. How about you?",
        "I'm doing wonderfully today! Ready to discuss any health concerns or dietary questions you might have.",
        "I'm great! I've been developing some new meal plans for hypertension management. Any specific health topics you'd like to explore?",
        "Feeling energized and ready to help! What nutrition or wellness questions can I answer for you today?",
        "I'm doing well, thank you for asking! I'm particularly interested in helping with any dietary concerns you might have."
      ];
      return howAreYouResponses[Math.floor(Math.random() * howAreYouResponses.length)];
    }

    // 4. Generic greetings
    if (genericGreetings.some(greet => lowerMsg === greet)) {
      const greetingResponses = [
        "Hi there! Ready to dive into some health or nutrition tips?",
        "Assalam o Alaikum! How can I assist with your nutrition or health questions today?",
        "Hello! I'd be happy to discuss any dietary concerns or wellness questions you have.",
        "Greetings! What aspect of nutrition or health would you like to explore today?",
        "Hi! I'm here to provide expert guidance on diet and nutrition. What questions do you have?",
        "Hello there! Would you like to discuss meal planning, specific health conditions, or general wellness?",
        "Assalam o Alaikum! I'm here to help with Pakistani nutrition and dietary advice. What's on your mind?",
        "Hi! Many of my patients start with questions about their daily eating habits. Is there something specific you'd like to know?",
        "Hello! In my practice, I focus on culturally appropriate nutrition advice. How can I help you today?",
        "Greetings! I'd be happy to share some nutrition wisdom from my years of practice in Pakistan. What interests you?"
      ];
      return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }

    // 5. Allowed topics or specific health/meal questions
    const isRelevant = allowedTopics.some(topic => lowerMsg.includes(topic)) || isHealthConditionQuestion || isMealQuestion;
    if (!isRelevant) {
      // Off-topic polite redirect
      const redirectResponses = [
        "I'm here to help with health, nutrition, and fitness questions. Could you share a question about diet, exercise, or wellness?",
        "As a nutrition specialist, I focus on dietary advice and health guidance. What nutrition-related questions can I answer for you?",
        "My expertise is in nutrition and wellness. I'd be happy to discuss topics like healthy eating, managing health conditions through diet, or exercise recommendations.",
        "I specialize in nutrition counseling and dietary advice. Could you ask me something related to food, health, or wellness?",
        "I'm best equipped to answer questions about nutrition, diet plans, and health management. What specific health or diet concerns would you like to discuss?",
        "My area of expertise is nutrition and dietetics. I'd love to help with questions about healthy eating, managing conditions like diabetes or hypertension, or general wellness.",
        "I focus on providing evidence-based nutrition advice. Could you share a question related to diet, health conditions, or wellness goals?",
        "As your nutrition consultant, I can help with dietary questions, meal planning, or health management. What specific nutrition topic interests you?",
        "I'm specialized in Pakistani nutrition and dietary advice. Could you ask me about something related to health, diet, or wellness?"
      ];
      return redirectResponses[Math.floor(Math.random() * redirectResponses.length)];
    }

    // 6. Call Deepseek API for allowed topics
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
            content: `You are Dr. Nasreen Ahmed, a nutrition specialist affiliated with Dietitian Bridge Pakistan. 

Respond in detail to questions related to health conditions, diseases, meal planning, and dietary advice. Focus especially on:
1. Providing specific meal recommendations for different health conditions (diabetes, hypertension, etc.)
2. Suggesting Pakistani foods and recipes that help manage specific health conditions
3. Giving detailed nutritional advice with examples of local Pakistani foods
4. Explaining how traditional Pakistani dishes can be modified to be healthier

When users ask about specific health conditions like diabetes, hypertension, or heart disease, provide detailed, evidence-based dietary recommendations with specific food examples from Pakistani cuisine.

When users ask for meal recommendations, provide specific meal plans or food suggestions, not generic advice.

Keep your tone professional but warm. Include specific Pakistani foods, dishes, and ingredients in your responses. Provide accurate, evidence-based information while acknowledging the cultural context of Pakistani diets.

For serious health concerns, advise users to consult a licensed healthcare professional.`
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.7,
        max_tokens: 800  // Increased to allow for more detailed responses
      })
    });

    if (!response.ok) {
      // Fallback to OpenRouter if DeepSeek direct API fails
      return await getOpenRouterResponse(message);
    }

    const data = await response.json();
    let aiContent = data.choices[0].message.content || getFallbackResponse();

    // Post-process: Remove system message echoes but keep detailed responses
    aiContent = aiContent.replace(/(You are Dr\.|As Dr\. Nasreen Ahmed,|IMPORTANT:|Each time, provide a DIFFERENT response.*)/gi, "").trim();
    
    // Don't limit to 3 sentences for health condition or meal questions to allow detailed responses
    if (!isHealthConditionQuestion && !isMealQuestion) {
      // For other questions, still keep it reasonably concise - but allow up to 5 sentences
      aiContent = aiContent.split(/(?<=[.!?])\s+/).slice(0,5).join(' ');
    }

    // 7. Safety: If user asks for diagnosis or prescription
    if (/diagnos(e|is)|prescrib(e|tion)|medicine|medication|drug/i.test(lowerMsg)) {
      return "For personalized medical advice, please consult a doctor or dietitian. I can provide general guidance on nutrition or exercise—how can I assist?";
    }

    // 8. If response is empty or unclear
    if (!aiContent || aiContent.length < 5) {
      return "Could you clarify your question? I'm here to help with health, nutrition, or fitness topics!";
    }

    return aiContent;
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
      model: "anthropic/claude-3-haiku", // Updated to a different model
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

IMPORTANT: When users ask about specific health conditions like diabetes, hypertension, or heart disease, provide detailed, evidence-based dietary recommendations with specific food examples from Pakistani cuisine.

When users ask for meal recommendations, provide specific meal plans or food suggestions, not generic advice.

Be empathetic but maintain professional boundaries. Provide actionable, practical advice based on established nutritional science. Avoid sounding like an AI - instead, sound like an experienced healthcare professional having a consultation. Use phrases like "Based on my clinical experience" or "From what I've observed with my patients" to make responses feel more authentic and localized.

IMPORTANT: Always provide detailed, helpful responses about Pakistani nutrition and health. Don't apologize for technical issues - just provide good nutrition advice for Pakistani patients.

Each time, provide a DIFFERENT response even if the question is similar to previous ones. Vary your advice and examples to avoid repetitive responses.`
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.8, // Increased for more variation
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
    "Many of my patients in Karachi have had success with weight management by keeping traditional Pakistani foods in their diet but adjusting portion sizes. I recommend smaller portions of rice or roti and larger portions of vegetables and protein.",
    "For hypertension management, I often suggest my Pakistani patients reduce salt in their cooking and increase potassium-rich foods like bananas, oranges, and tomatoes. Traditional Pakistani dishes can be modified by using herbs and spices for flavor instead of salt.",
    "In my clinic in Islamabad, I've had great success helping patients manage cholesterol by recommending oats for breakfast, increasing fiber through whole grains like daliya, and incorporating more plant-based proteins like lentils and beans into their daily meals.",
    "Based on my experience with patients throughout Pakistan, I find that those who maintain traditional meal timings but adjust portion sizes have better success with their nutrition goals. Our cultural eating patterns can be maintained while making healthier choices."
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};
