
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Minimize, Maximize, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAIResponse } from "@/services/ai";
import { toast } from "@/hooks/use-toast";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
    if (isOpen && !isMinimized) {
      // Scroll to bottom on new messages
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      
      // Focus input field when widget opens
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);
  
  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };
  
  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
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
        content: "Assalam o Alaikum! For diabetes management in Pakistan, I recommend a balanced diet rich in whole grains like whole wheat roti and brown rice, plenty of vegetables, lean proteins, and limited sugary foods. Bitter gourd (karela) is particularly beneficial for blood sugar control. Please feel free to ask more specific questions about managing diabetes through nutrition." 
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
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full shadow-soft hover:bg-primary/90 transition-all duration-300 hover:scale-105 group"
          aria-label="Chat with nutritionist"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-full mr-3 px-3 py-1 bg-white text-primary text-sm font-medium rounded-[4px] shadow-soft opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">Chat with Dr. Nasreen</span>
        </button>
      )}
      
      {/* Chat Widget Panel */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 bottom-6 right-6 w-[380px] bg-white rounded-2xl shadow-soft overflow-hidden transition-all duration-300 border border-gray-200",
            isMinimized ? "h-14" : "h-[550px] max-h-[80vh]",
            isOpen ? "animate-slide-up" : ""
          )}
        >
          {/* Header - Always sticky */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary text-white sticky top-0 z-20 shadow-md">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <h3 className="font-medium">Dr. Nasreen Ahmed, Nutrition Specialist</h3>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleMinimize}
                className="p-1.5 rounded-full hover:bg-primary-dark/20 transition-colors focus:outline-none"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
              >
                {isMinimized ? <Maximize className="w-4 h-4" /> : <Minimize className="w-4 h-4" />}
              </button>
              <button
                onClick={handleToggle}
                className="p-1.5 rounded-full hover:bg-primary-dark/20 transition-colors focus:outline-none"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 p-4 overflow-y-auto h-[calc(550px-130px)]"
                style={{ height: 'calc(100% - 125px)' }} // Fix height calculation
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
              
              {/* Input Form - Always at bottom */}
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
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatWidget;
