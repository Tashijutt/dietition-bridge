
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize, Maximize, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAIResponse } from "@/services/ai";
import { toast } from "@/hooks/use-toast";

const ChatWidget = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([
    {
      type: 'bot',
      content: "Assalam o Alaikum! I'm Dr. Nasreen Ahmed, a nutrition specialist with Dietitian Bridge Pakistan. I can help with personalized diet advice, answer questions about managing health conditions through nutrition, or assist you in finding a dietitian. How can I support your health journey today?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom on new messages but only within the widget container
    if (messagesEndRef.current && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
    
    // Focus input field when widget opens
    inputRef.current?.focus();
  }, [messages]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage = message.trim();
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setMessage("");
    setIsLoading(true);
    
    try {
      // Get AI response
      const response = await getAIResponse(userMessage);
      
      // Add bot response with a slight delay for better UX
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', content: response }]);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add a more varied fallback response
      const fallbackResponses = [
        "As a nutrition specialist in Pakistan, I recommend balancing your meals with proteins like daal (lentils), lean meats, and plant-based options. Include whole grains, plenty of vegetables, and moderate portions of healthy fats.",
        "In my clinical practice in Karachi, I've found that traditional Pakistani dishes can be made healthier by using less oil, more vegetables, and choosing whole grains. Would you like specific recipe modifications?",
        "For weight management with Pakistani cuisine, I suggest focusing on portion control rather than avoiding traditional foods completely. Roti size can be reduced, and half your plate should be vegetables.",
        "Managing diabetes in Pakistan involves choosing whole wheat roti instead of naan, including bitter gourd (karela) regularly, and spacing meals throughout the day to maintain stable blood sugar levels."
      ];
      
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      }]);
      
      toast({
        title: "Connection Issue",
        description: "We're having trouble connecting to our nutrition AI. Please try again shortly.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Container */}
      <div 
        ref={messagesContainerRef}
        className="flex-1 p-4 overflow-y-auto"
      >
        <div className="space-y-4 pb-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "p-4 rounded-lg max-w-[85%] mb-2 animate-fade-in",
                msg.type === 'user' 
                  ? "bg-primary ml-auto text-white rounded-br-none" 
                  : "bg-gray-100 text-black rounded-bl-none"
              )}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="bg-gray-100 text-black rounded-lg rounded-bl-none p-4 max-w-[85%] flex space-x-2">
              <span className="animate-pulse">•</span>
              <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>•</span>
              <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>•</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Form */}
      <form 
        onSubmit={handleSubmit} 
        className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0 left-0 right-0 z-10"
      >
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about nutrition, diets, or health..."
            className="w-full p-3 pr-12 border border-gray-300 rounded-[4px] focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-primary text-white rounded-[4px] hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={!message.trim() || isLoading}
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">Ask me about Pakistani nutrition, diet plans, or health conditions</p>
      </form>
    </div>
  );
};

export default ChatWidget;
