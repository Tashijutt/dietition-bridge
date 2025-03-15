
import { useState, useRef, useEffect } from "react";
import { Send, ChevronDown, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getAIResponse } from "@/services/ai";
import { toast } from "@/hooks/use-toast";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([
    {
      type: 'bot',
      content: 'Assalam o Alaikum! I\'m Dr. Nasreen Ahmed, a nutrition specialist with NutriCare Pakistan. I specialize in providing information about Pakistani nutrition, diet plans for specific health conditions, and can help you adapt traditional Pakistani cuisine for conditions like diabetes, hypertension, or weight management. How can I assist you today?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    
    // Focus input field when component mounts
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
      
      // Add bot response
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I apologize for the technical difficulty. As a nutrition specialist in Pakistan, I strive to provide accurate information. Please try again shortly, or visit our resources section for healthy Pakistani meal ideas." 
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

  const suggestedQuestions = [
    "What's a good diet for diabetes in Pakistan?",
    "How can I reduce blood pressure with Pakistani foods?",
    "Recommend meals for hypertension patients",
    "What should I eat to lose weight while enjoying desi food?",
    "Can you suggest a diet plan for Ramadan?"
  ];

  const handleSuggestedQuestion = (question: string) => {
    setMessage(question);
    // Focus the input field
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-gray-600 hover:text-nutrition-600 transition-colors mr-4">
              <ArrowLeft className="w-5 h-5 mr-1" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">AI Nutrition Assistant</h1>
          </div>

          {/* Chat Interface */}
          <div className="bg-white rounded-xl shadow-soft overflow-hidden">
            {/* Chat Messages */}
            <div className="h-[calc(100vh-300px)] overflow-y-auto p-6">
              <div className="space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex",
                      msg.type === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-2xl px-4 py-3",
                        msg.type === 'user' 
                          ? "bg-nutrition-600 text-white rounded-tr-none" 
                          : "bg-gray-100 text-gray-800 rounded-tl-none"
                      )}
                    >
                      <div className="text-sm md:text-base leading-relaxed whitespace-pre-line">
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-6 py-3">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Suggested Questions */}
            <div className="bg-gray-50 border-t border-gray-200 p-4">
              <div className="flex items-center mb-2">
                <ChevronDown className="w-4 h-4 text-gray-500 mr-2" />
                <p className="text-sm text-gray-500">Suggested questions</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-sm bg-white border border-gray-200 rounded-full px-3 py-1.5 text-gray-700 hover:bg-nutrition-50 hover:border-nutrition-200 hover:text-nutrition-700 transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask about Pakistani nutrition, diet plans, health conditions..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-nutrition-500 focus:border-transparent transition-all duration-200 outline-none"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-nutrition-600 hover:text-nutrition-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={!message.trim() || isLoading}
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                This AI assistant is designed to provide general nutrition information based on Pakistani cuisine and lifestyle, and is not a substitute for professional medical advice.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
